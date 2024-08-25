import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;

  const addressString = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ]
    .filter((c) => !!c)
    .join(", ");

  if (event.type === "checkout.session.completed") {
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
    } catch (error: any) {
      console.error("Order update failed", error);
      return new NextResponse("Order update failed", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
