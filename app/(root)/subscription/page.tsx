import { SubscriptionPageComponent } from "@/components/main/subscriptionPageComponent";
import { db } from "@/lib/db";
import React from "react";

export default async function SubscriptionPage() {
  const plans = await db.subscriptionPlan.findMany();
  return <SubscriptionPageComponent plans={plans} />;
}
