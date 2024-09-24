import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { NutritionPlansComponent } from "@/components/protected/admin/NutritionPlansComponent";
import { db } from "@/lib/db";

export default async function NutritionPlanPage() {
  const plans = await db.nutritionPlan.findMany();
  return (
    <ContentLayout title="Nutrition Plan" isAdmin>
      <NutritionPlansComponent data={plans} />
    </ContentLayout>
  );
}
