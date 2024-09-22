import React from "react";
import { db } from "@/lib/db";
import { ContentLayout } from "@/components/protected/content-layout";
import { MealPlansComponent } from "@/components/protected/admin/MealPlansComponent";

export default async function MealsPage() {
  const meal = await db.mealTemplate.findMany({
    include: {
      foods: true,
    },
  });

  const weeklyPlans = await db.weeklyMealPlanTemplate.findMany({
    include: {
      dailyMealTemplates: true,
      nutritionPlan: {
        select: {
          name: true,
        },
      },
    },
  });

  const dailyPlans = await db.dailyMealPlanTemplate.findMany({
    include: {
      meals: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const nutritionPlans = await db.nutritionPlan.findMany();

  return (
    <ContentLayout title="Meal Plans" isAdmin>
      <MealPlansComponent
        data={meal}
        weeklyPlans={weeklyPlans}
        dailyPlans={dailyPlans}
        nutritionPlans={nutritionPlans}
      />
    </ContentLayout>
  );
}
