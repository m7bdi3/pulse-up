"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { WorkoutPlanSchema } from "@/components/protected/forms";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function CreateWorkoutPlan(
  values: z.infer<typeof WorkoutPlanSchema>
) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  const validatedValues = WorkoutPlanSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { name, image, description, duration, goal, difficulty } =
    validatedValues.data;
  try {
    await db.workoutPlan.create({
      data: {
        name,
        image,
        description,
        duration,
        goal,
        difficulty,
      },
    });
    revalidatePath("/admin/workout-plans", "layout");
    return { success: "Workout plan created successfully" };
  } catch {
    return { error: "Failed to create Workout plan" };
  }
}

export async function DeleteWorkoutPlan(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  try {
    await db.workoutPlan.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/workout-plans", "layout");
    return { success: "Workout plan deleted successfully" };
  } catch {
    return { error: "Failed to delete Workout plan" };
  }
}
