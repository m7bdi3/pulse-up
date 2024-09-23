import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const CorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CorsHeaders });
}

export async function POST(req: Request) {
  const body = await req.text();
  let event: Stripe.Event;
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.error("Stripe signature missing from headers");
    return NextResponse.json(
      { error: "Webhook signature missing" },
      { status: 400 }
    );
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.metadata?.planDuration === "0") {
    if (event.type === "checkout.session.completed") {
      if (!session?.metadata?.userId) {
        return NextResponse.json(
          { error: "User ID not found in metadata" },
          { status: 400 }
        );
      }

      try {
        await db.subscription.create({
          data: {
            userId: session.metadata.userId,
            stripeCurrentPeriodEnd: null,
            planId: session.metadata.planId,
            status: "LIFETIME",
          },
        });
      } catch (error) {
        console.error("Failed to create subscription:", error);
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 500 }
        );
      }
    }
  } else {
    if (event.type === "checkout.session.completed") {
      try {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        if (!session?.metadata?.userId) {
          return NextResponse.json(
            { error: "User ID not found in metadata" },
            { status: 400 }
          );
        }

        await db.subscription.create({
          data: {
            userId: session.metadata.userId,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
            planId: session.metadata.planId,
            status: "PENDING",
          },
        });
      } catch (error) {
        console.error("Failed to create subscription:", error);
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 500 }
        );
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      try {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await db.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "ACTIVE" },
        });
      } catch (error) {
        console.error("Failed to update subscription status:", error);
        return NextResponse.json(
          { error: "Failed to update subscription status" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
