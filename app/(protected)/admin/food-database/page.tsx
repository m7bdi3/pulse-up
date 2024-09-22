import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { FoodDatabaseComponent } from "@/components/protected/admin/FoodComponent";
import { db } from "@/lib/db";

export default async function FoodPage() {
  const food = await db.food.findMany();
  return (
    <ContentLayout title="Food Database" isAdmin>
      <FoodDatabaseComponent data={food} />
    </ContentLayout>
  );
}
