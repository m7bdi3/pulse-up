import React from "react";
import { db } from "@/lib/db";
import { ContentLayout } from "@/components/protected/content-layout";
import { SubPlanComponent } from "@/components/protected/admin/SubPlansComponent";

export default async function ExercisePage() {
  const plans = await db.subscriptionPlan.findMany({
    include: {
      _count: {
        select: {
          subscriptions: true,
        },
      },
    },
  });

  return (
    <ContentLayout title="Subscription Plans" isAdmin>
      <SubPlanComponent data={plans} />
    </ContentLayout>
  );
}
