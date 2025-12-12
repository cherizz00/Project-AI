import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return false
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) return false

    const validUntil = user.planExpiry?.getTime()

    // Is PRO and expiry is in future (with 1 day buffer maybe? no, standard check)
    const isValid =
        user.plan === "PRO" &&
        validUntil &&
        validUntil + DAY_IN_MS > Date.now()

    return !!isValid
}
