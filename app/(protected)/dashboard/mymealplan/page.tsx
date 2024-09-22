import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { MyMealPlansComponent } from "@/components/protected/dashboard/MealPlans";

export default function MealPlansPage() {
  return (
    <ContentLayout title="My meal plans" isAdmin={false}>
      <MyMealPlansComponent/>
    </ContentLayout>
  );
}
