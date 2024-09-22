import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { WorkOutPlansComponent } from "@/components/protected/admin/workout-plans";
import { db } from "@/lib/db";

export default async function WorkoutPage() {
  const plans = await db.workoutPlan.findMany();
  return (
    <ContentLayout title="Workout Plans" isAdmin>
      <WorkOutPlansComponent data={plans} />
    </ContentLayout>
  );
}
