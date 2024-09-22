"use server";
import { cache } from "react";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/dashboard");
const DAY_IN_MS = 86_400_000;

const getUserSub = cache(async (planId: string) => {
  const session = await auth();
  if (!session?.user.id) return null;

  const data = await db.subscription.findUnique({
    where: {
      userId_planId: {
        userId: session.user.id,
        planId,
      },
    },
  });

  if (!data) return null;

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

export const createStripeUrl = async (planId: string) => {
  const session = await auth();

  if (!session?.user.id || !session) {
    throw new Error("Unauthorized");
  }

  const userSub = await getUserSub(planId);

  if (userSub && userSub.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSub.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  const subPlans = await db.subscriptionPlan.findMany();

  const filteredPlan = subPlans.find((p) => p.id === planId);

  if (filteredPlan?.duration === 0) {
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: filteredPlan?.name!,
              description: filteredPlan?.description!,
            },
            unit_amount: filteredPlan?.price! * 100,
          },
        },
      ],
      success_url: returnUrl,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL as string}`,
      metadata: {
        userId: session.user.id,
        planId,
      },
    });
    return { data: stripeSession.url };
  } else {
    const interval = filteredPlan?.duration === 30 ? "month" : "year";
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: filteredPlan?.name!,
              description: filteredPlan?.description!,
            },
            unit_amount: filteredPlan?.price! * 100,
            recurring: {
              interval,
            },
          },
        },
      ],
      success_url: returnUrl,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL as string}`,
      metadata: {
        userId: session.user.id,
        planId,
      },
    });
    return { data: stripeSession.url };
  }
};
