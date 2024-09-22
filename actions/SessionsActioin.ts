"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function CompleteSession(id: string) {
  const session = await auth();
  if (!session?.user.id) return { error: "Unauthorized" };

  const getSession = await db.userSessions.findUnique({
    where: {
      id,
    },
  });

  if (!getSession) return { error: "Unauthorized" };

  if (getSession.completed) {
    try {
      const res = await db.userSessions.update({
        where: {
          id,
        },
        data: {
          completed: false,
        },
      });

      revalidatePath("/dashboard/workouts", "layout");
      return {
        success: "Session updated successfully",
        completed: res.completed,
      };
    } catch (e) {
      console.error(e);
      return { error: "Failed to update session!" };
    }
  } else {
    try {
      const res = await db.userSessions.update({
        where: {
          id,
        },
        data: {
          completed: true,
        },
      });

      revalidatePath("/dashboard/workouts", "layout");
      return {
        success: "Session updated successfully",
        completed: res.completed,
      };
    } catch (e) {
      console.error(e);
      return { error: "Failed to update session!" };
    }
  }
}
