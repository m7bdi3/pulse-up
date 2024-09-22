"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { WeeklyMealPlanSchema } from "@/components/protected/forms";
import { revalidatePath } from "next/cache";
export async function CreateWeeklyPlan(
  values: z.infer<typeof WeeklyMealPlanSchema>
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = WeeklyMealPlanSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { weekNumber, nutritionPlanId, name } = validatedValues.data;
  try {
    await db.weeklyMealPlanTemplate.create({
      data: {
        name,
        weekNumber,
        nutritionPlanId,
      },
    });
    revalidatePath("/admin/mealsPlan", "layout");
    return { success: "Plan created successfully" };
  } catch {
    return { error: "Failed to create plan" };
  }
}

export async function DeleteWeeklyPlan(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.weeklyMealPlanTemplate.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/mealsPlan", "layout");
    return { success: "Plan deleted successfully" };
  } catch {
    return { error: "Failed to delete plan" };
  }
}
