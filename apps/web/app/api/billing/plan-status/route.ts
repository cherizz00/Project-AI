import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { checkSubscription } from "@/lib/subscription"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email },
        select: {
            plan: true,
            planExpiry: true,
        }
    })

    // Verify expiry logic
    const isPro = await checkSubscription()

    return NextResponse.json({
        plan: isPro ? "PRO" : "FREE",
        expiry: user?.planExpiry,
        isPro,
    })
}
