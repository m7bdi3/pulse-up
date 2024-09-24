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
  useNutriotionPlansStore,
  useWorkoutPlansStore,
  useFoodsStore,
} from "@/hooks/store/user";
import { Food, NutritionPlan, Progress, WorkoutPlan } from "@prisma/client";

export default function InitUser({
  user,
  progress,
  workoutPlan,
  nutritionPlan,
  userSessions,
  userMeals,
  nutritionPlans,
  workoutPlans,
  foods,
}: {
  user: UserWithDetails | undefined;
  progress: Progress[] | undefined;
  workoutPlan: userWorkoutPlan | null;
  nutritionPlan: userNutritionPlan | null;
  userSessions: userSessions | null;
  userMeals: UserMealPlan | null;
  nutritionPlans: NutritionPlan[] | null;
  workoutPlans: WorkoutPlan[] | null;
  foods: Food[] | null;
}) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current && user) {
      useUser.setState({ user, progress, workoutPlan, nutritionPlan });
      useSessionsStore.setState({ sessions: userSessions });
      useMealsStore.setState({ userMeals: userMeals });
      useNutriotionPlansStore.setState({ nutritionPlans });
      useWorkoutPlansStore.setState({ WorkoutPlans: workoutPlans });
      useFoodsStore.setState({ foods });
      initState.current = true;
    }
  }, [
    user,
    progress,
    workoutPlan,
    nutritionPlan,
    userSessions,
    userMeals,
    nutritionPlans,
    workoutPlans,
    foods,
  ]);

  return null;
}
