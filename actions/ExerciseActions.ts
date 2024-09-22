"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { ExerciseSchema } from "@/components/protected/forms";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function CreateExercise(values: z.infer<typeof ExerciseSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  const validatedValues = ExerciseSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const {
    name,
    images,
    description,
    duration,
    repetitions,
    sets,
    category,
    equipments,
  } = validatedValues.data;
  try {
    await db.exercise.create({
      data: {
        name,
        images,
        description,
        duration,
        repetitions,
        sets,
        category,
        equipment: equipments,
      },
    });
    revalidatePath("/admin/exercise", "layout");
    return { success: "Exercise created successfully" };
  } catch {
    return { error: "Failed to create Exercise" };
  }
}
export async function DeleteExercise(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/");
  }

  try {
    await db.exercise.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/exercise", "layout");
    return { success: "exercise deleted successfully" };
  } catch {
    return { error: "Failed to delete exercise" };
  }
}
