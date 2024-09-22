"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { DailyMealPlanSchema } from "@/components/protected/forms";
import { revalidatePath } from "next/cache";
export async function CreateDailyPlan(
  values: z.infer<typeof DailyMealPlanSchema>
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = DailyMealPlanSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { dayOfWeek, weeklyPlanTemplateId, meals, name } = validatedValues.data;
  try {
    await db.dailyMealPlanTemplate.create({
      data: {
        name,
        dayOfWeek,
        weeklyPlanTemplateId,
        meals: {
          connect: meals.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/admin/mealsPlan", "layout");
    return { success: "Plan created successfully" };
  } catch (e) {
    console.error(e);
    return { error: "Failed to create plan" };
  }
}

export async function DeleteDailyPlan(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.dailyMealPlanTemplate.delete({
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
