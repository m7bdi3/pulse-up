"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { NutritionPlanSchema } from "@/components/protected/forms";
import { revalidatePath } from "next/cache";

export async function CreateNutritionPlan(
  values: z.infer<typeof NutritionPlanSchema>
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = NutritionPlanSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { name, image, description } = validatedValues.data;
  try {
    await db.nutritionPlan.create({
      data: {
        name,
        image,
        description,
      },
    });
    revalidatePath("/admin/nutrition-plan", "layout");
    return { success: "Nutrition Plan created successfully" };
  } catch {
    return { error: "Failed to create Nutrition Plan" };
  }
}

export async function DeleteNutritionPlan(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.nutritionPlan.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/nutrition-plan", "layout");
    return { success: "Nutrition Plan deleted successfully" };
  } catch {
    return { error: "Failed to delete Nutrition Plan" };
  }
}
