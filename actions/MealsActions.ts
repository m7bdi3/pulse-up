"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { MealSchema } from "@/components/protected/forms";
import { revalidatePath } from "next/cache";

export async function CreateMeal(values: z.infer<typeof MealSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = MealSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const {
    name,
    calories,
    protein,
    carbs,
    fats,
    servingSize,
    foodId,
    description,
    mealType,
  } = validatedValues.data;
  try {
    await db.meal.create({
      data: {
        name,
        calories,
        protein,
        carbs,
        fats,
        description,
        mealType,
        servingSize,
        foods: {
          connect: foodId.map((id: string) => ({ id })),
        },
      },
    });

    revalidatePath("/admin/meals", "layout");
    return { success: "Meal created successfully" };
  } catch {
    return { error: "Failed to create Meal" };
  }
}

export async function DeleteMeal(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.meal.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/meals", "layout");
    return { success: "Meal deleted successfully" };
  } catch (e) {
    console.error(e);
    return { error: "Failed to delete Meal" };
  }
}

export async function LogMeal(id: string, userMealId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const findMeal = await db.meal.findUnique({
    where: {
      id,
    },
  });

  if (!findMeal) return { error: "No meal found!" };

  const userMealPlan = await db.userMealPlan.findUnique({
    where: {
      id: userMealId,
    },
  });

  if (!userMealPlan) return { error: "No Plan Found" };

  if (userMealPlan.isCompleted === false) {
    try {
      const res = await db.userMealPlan.update({
        where: {
          id: userMealId,
        },
        data: {
          isCompleted: true,
        },
      });

      revalidatePath("/dashboard/mymealplan", "layout");
      return {
        success: "Meal Logged successfully",
        completed: res.isCompleted,
      };
    } catch (error) {
      console.error(error);
      return { error: "Error Logging the meal!" };
    }
  } else {
    try {
      const res = await db.userMealPlan.update({
        where: {
          id: userMealId,
        },
        data: {
          isCompleted: false,
        },
      });

      revalidatePath("/dashboard/mymealplan", "layout");
      return {
        success: "Meal Unlogged successfully",
        completed: res.isCompleted,
      };
    } catch (error) {
      console.error(error);
      return { error: "Error unlogging the meal!" };
    }
  }
}
