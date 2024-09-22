"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { SubPlanSchema } from "@/components/protected/forms";
import { revalidatePath } from "next/cache";

export async function CreateSubPlan(values: z.infer<typeof SubPlanSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const validatedValues = SubPlanSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { name, description, duration, price } = validatedValues.data;
  try {
    await db.subscriptionPlan.create({
      data: {
        name,
        description,
        duration,
        price,
      },
    });
    revalidatePath("/admin/subPlans", "layout");
    return { success: "Plan created successfully" };
  } catch {
    return { error: "Failed to create Plan" };
  }
}

export async function DeleteSubPlan(planId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    await db.subscriptionPlan.delete({
      where: {
        id: planId,
      },
    });
    revalidatePath("/admin/subPlans", "layout");
    return { success: "Plan deleted successfully" };
  } catch {
    return { error: "Failed to delete Plan" };
  }
}
