import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "checkout.session.completed") {
        const subscriptionId = session.subscription as string;

        if (!subscriptionId) {
            console.error("[WEBHOOK_ERROR] No subscription ID in session", session.id);
            return new NextResponse("Subscription ID missing", { status: 400 });
        }

        console.log("[WEBHOOK] Processing subscription:", subscriptionId);

        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

        if (!session?.metadata?.userId) {
            console.error("[WEBHOOK_ERROR] No user ID in metadata");
            return new NextResponse("User id is required", { status: 400 });
        }

        await db.user.update({
            where: {
                id: session.metadata.userId,
            },
            data: {
                plan: "PRO",
                // @ts-ignore
                planExpiry: new Date(subscription.current_period_end * 1000),
            },
        })
        console.log("[WEBHOOK] User upgraded:", session.metadata.userId);
    }

    if (event.type === "invoice.payment_succeeded") {
        // const subscription = await stripe.subscriptions.retrieve(
        //     session.subscription as string
        //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // ) as any

        // Find user by email or some other way if metadata is missing in invoice event
        // Ideally we store stripeCustomerId on user but for now we look up by email from subscription customer?
        // Simplified: Assuming we can find user or relying on checkout session for initial upgrade and this for renew
        // For this MVP, let's skip complex renewal logic if metadata isn't guaranteed, 
        // but usually metadata persists to subscription.

        // For now, checkout.session.completed is enough to activate.
    }

    // Handle failure case to downgrade?
    if (event.type === "invoice.payment_failed") {
        // Logic to downgrade user
        // Need metadata or customer id map
    }

    return new NextResponse(null, { status: 200 })
}
