import React from "react";
import { db } from "@/lib/db";

import { ContentLayout } from "@/components/protected/content-layout";
import { MealsComponent } from "@/components/protected/admin/MealsComponent";

export default async function MealsPage() {
  const meal = await db.meal.findMany({
    include: {
      foods: true,
    },
  });

  return (
    <ContentLayout title="Meals" isAdmin>
      <MealsComponent data={meal} />
    </ContentLayout>
  );
}
