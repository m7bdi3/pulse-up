"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { FoodSchema } from "@/components/protected/forms";
import { revalidatePath } from "next/cache";

export async function CreateFood(values: z.infer<typeof FoodSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = FoodSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { name, image, calories, protein, carbs, fats, category } =
    validatedValues.data;
  try {
    await db.food.create({
      data: {
        name,
        image,
        calories,
        protein,
        carbs,
        fats,
        category,
      },
    });
    revalidatePath("/admin/food-database", "layout");
    return { success: "Food created successfully" };
  } catch {
    return { error: "Failed to create Food" };
  }
}

export async function DeleteFood(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.food.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/food-database", "layout");
    return { success: "Food deleted successfully" };
  } catch {
    return { error: "Failed to delete Food" };
  }
}
