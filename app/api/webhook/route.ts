import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      throw new Error("Stripe signature missing from headers");
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    const session = event.data.object as any;

    const userId = (session as { metadata?: { userId?: string } }).metadata
      ?.userId;
    const planId = (session as { metadata?: { planId?: string } }).metadata
      ?.planId;
    const planDuration = (session as { metadata?: { planDuration?: string } })
      .metadata?.planDuration;

    if (planDuration === "0") {
      await handleLifetimeSubscription(event, userId!, planId!);
    } else {
      await handleRegularSubscription(event, session, userId!, planId!);
    }

    return NextResponse.json({ received: true }, { headers: corsHeaders });
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400, headers: corsHeaders }
    );
  }
}

async function handleLifetimeSubscription(
  event: Stripe.Event,
  userId: string,
  planId: string
) {
  if (event.type === "checkout.session.completed") {
    await db.lifeTimePayment.create({
      data: {
        userId,
        planId,
        price: event.data.object.amount_total!,
        Status: "LIFETIME",
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { isSubscribed: true },
    });
  }
}

async function handleRegularSubscription(
  event: Stripe.Event,
  session: Stripe.Checkout.Session,
  userId: string,
  planId: string
) {
  if (event.type === "invoice.payment_succeeded") {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await db.subscription.create({
        data: {
          userId: subscription.metadata.userId || userId,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          subscriptionPrice: subscription.items.data[0].price.unit_amount!,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          planId: subscription.metadata.planId || planId,
          status: "ACTIVE",
        },
      });

      await db.user.update({
        where: { id: subscription.metadata.userId || userId },
        data: { isSubscribed: true },
      });
    } catch (error: any) {
      console.error(`Error updating subscription: ${error.message}`);
      return NextResponse.json(
        { error: `Webhook Error: ${error.message}` },
        { status: 400, headers: corsHeaders }
      );
    }
  }
}
