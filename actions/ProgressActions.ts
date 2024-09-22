"use server";

import { auth } from "@/auth";
import { ProgressSchema } from "@/components/protected/forms";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import {
  calculateBMI,
  calculateBMR,
  calculateBodyFat,
  calculateMuscleMass,
} from "./RegisterUserData";

export default async function CreateProgress(
  values: z.infer<typeof ProgressSchema>
) {
  const session = await auth();
  if (!session?.user.id) return { error: "Unauthorized" };
  const validatedValues = ProgressSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  const {
    weight,
    notes,
    back_weight,
    calf_weight,
    core_weight,
    bicep_weight,
    chest_weight,
    glute_weight,
    squat_weight,
    traps_weight,
    tricep_weight,
    deadlift_weight,
    shoulder_weight,
  } = validatedValues.data;
  const bmi = await calculateBMI(weight, user?.height!);
  const bmr = await calculateBMR(
    weight,
    user?.height!,
    user?.age!,
    user?.gender!
  );
  const bodyFat = await calculateBodyFat(user?.age!, user?.gender!, bmi);
  const muscleMass = await calculateMuscleMass(
    weight,
    user?.height!,
    user?.age!
  );
  try {
    const res = await db.progress.create({
      data: {
        userId: session.user.id,
        bmi: Number(bmi.toPrecision(4)),
        bmr: Number(bmr.toPrecision(4)),
        weight,
        bodyFat: Number(bodyFat.toPrecision(4)),
        muscleMass,
        back_weight,
        calf_weight,
        core_weight,
        bicep_weight,
        chest_weight,
        glute_weight,
        squat_weight,
        traps_weight,
        tricep_weight,
        deadlift_weight,
        shoulder_weight,
        notes,
      },
    });
    revalidatePath("/dashboard/my-progress", "layout");
    return { success: "Progress updated successfully", progress: res };
  } catch (e) {
    console.error(e);
    return { error: "Failed to update progress!" };
  }
}
