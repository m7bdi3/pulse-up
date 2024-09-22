"use server";

import { auth } from "@/auth";
import { userSchema } from "@/components/protected/forms";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import * as z from "zod";
export default async function UpdateUserSettings(
  values: z.infer<typeof userSchema>
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unautorized" };
  }

  const validatedValues = userSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const {
    name,
    email,
    activityLevel,
    age,
    address,
    gender,
    goal,
    weight,
    height,
    phone,
  } = validatedValues.data;
  try {
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        email,
        activityLevel,
        address,
        age,
        weight,
        height,
        gender,
        goal,
        phone,
      },
    });
    revalidatePath("/dashboard/settings", "layout");
    return { success: "Data Updated successfully." };
  } catch {
    return { error: "Failed to update Date." };
  }
}
