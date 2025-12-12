import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"

import { MAX_FREE_COUNTS } from "@/lib/constants"
export { MAX_FREE_COUNTS }

export const increaseApiLimit = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) return

    // Check if logs exist for today
    // Simpler approach: Just add a UsageLog entry
    // Or update a daily counter? User prompt said: "Daily Limit 10 AI calls"
    // UsageLog model: userId, date, count.

    const today = new Date()
    today.setHours(0, 0, 0, 0) // Start of day

    const usageLog = await db.usageLog.findFirst({
        where: {
            userId: user.id,
            date: {
                gte: today
            }
        }
    })

    if (usageLog) {
        await db.usageLog.update({
            where: { id: usageLog.id },
            data: { count: usageLog.count + 1 }
        })
    } else {
        await db.usageLog.create({
            data: {
                userId: user.id,
                count: 1,
                date: today
            }
        })
    }
}

export const checkApiLimit = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return false
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) return false

    // If PRO, always allow
    // @ts-ignore
    if (user.plan === "PRO" && user.planExpiry && user.planExpiry > new Date()) {
        return true
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const usageLog = await db.usageLog.findFirst({
        where: {
            userId: user.id,
            date: {
                gte: today
            }
        }
    })

    if (!usageLog || usageLog.count < MAX_FREE_COUNTS) {
        return true
    }

    return false
}

export const getApiLimitCount = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return 0
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    })
    if (!user) return 0

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const usageLog = await db.usageLog.findFirst({
        where: {
            userId: user.id,
            date: {
                gte: today
            }
        }
    })

    if (!usageLog) return 0
    return usageLog.count
}
