import React from "react";
import { ContentLayout } from "@/components/protected/content-layout";
import { ExercisesComponent } from "@/components/protected/admin/ExercisesComponent";
import { db } from "@/lib/db";

export default async function ExercisePage() {
  const Exercises = await db.exercise.findMany();

  return (
    <ContentLayout title="Exercises Library" isAdmin>
      <ExercisesComponent data={Exercises} />
    </ContentLayout>
  );
}
