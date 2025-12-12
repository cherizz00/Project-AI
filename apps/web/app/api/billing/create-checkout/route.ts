import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

const returnUrl = process.env.NEXTAUTH_URL + "/dashboard/billing"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.email) {
            return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { 'Content-Type': 'application/json' } })
        }

        const user = await db.user.findUnique({
            where: { email: session.user.email }
        })

        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404, headers: { 'Content-Type': 'application/json' } })
        }

        const stripeSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Pro Plan",
                            description: "Unlimited AI Generations",
                        },
                        unit_amount: 2900, // $29.00
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id,
            },
            success_url: returnUrl + "?success=true",
            cancel_url: returnUrl + "?canceled=true",
            customer_email: user.email || undefined,
        })

        return NextResponse.json({ url: stripeSession.url })

    } catch (error: any) {
        console.log("[STRIPE_ERROR]", error)
        return new NextResponse(JSON.stringify({ error: error.message || "Internal Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}
