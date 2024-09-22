"use client";

import { useEffect, useRef } from "react";
import {
  userNutritionPlan,
  userSessions,
  UserWithDetails,
  userWorkoutPlan,
  useUser,
  useSessionsStore,
  UserMealPlan,
  useMealsStore,
} from "@/hooks/store/user";
import { Progress } from "@prisma/client";

export default function InitUser({
  user,
  progress,
  workoutPlan,
  nutritionPlan,
  userSessions,
  userMeals,
}: {
  user: UserWithDetails | undefined;
  progress: Progress[] | undefined;
  workoutPlan: userWorkoutPlan | null;
  nutritionPlan: userNutritionPlan | null;
  userSessions: userSessions | null;
  userMeals: UserMealPlan | null;
}) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current && user) {
      useUser.setState({ user, progress, workoutPlan, nutritionPlan });
      useSessionsStore.setState({ sessions: userSessions });
      useMealsStore.setState({ userMeals: userMeals });
      initState.current = true;
    }
  }, [user, progress, workoutPlan, nutritionPlan, userSessions, userMeals]);

  return null;
}
