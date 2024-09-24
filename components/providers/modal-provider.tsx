"use client";

import React from "react";
import { LoginModal } from "@/components/LoginModal";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { RegisterUserDataModal } from "../RegisterDataModal";
import { WorkoutPlanCreateForm } from "../protected/forms/create-workout-form";
import { ExerciseCreateForm } from "../protected/forms/create-exercise-form";
import { NutritionPlanCreateForm } from "../protected/forms/create-nutrition-plan";
import { MealCreateForm } from "../protected/forms/create-Meal-form";
import { FoodCreateForm } from "../protected/forms/create-food-form";

export const ModalProvider = () => {
  const [mounted, setIsMounted] = React.useState(false);
  const {
    isLoginOpen,
    isDataRegisterOpen,
    isWorkoutplanFormOpen,
    isExerciseFormOpen,
    isNutritionPlanFormOpen,
    isMealFormOpen,
    isFoodFormOpen,
  } = useModalStore();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isLoginOpen && <LoginModal />}
      {isDataRegisterOpen && <RegisterUserDataModal />}
      {isWorkoutplanFormOpen && <WorkoutPlanCreateForm />}
      {isExerciseFormOpen && <ExerciseCreateForm />}
      {isNutritionPlanFormOpen && <NutritionPlanCreateForm />}
      {isMealFormOpen && <MealCreateForm />}
      {isFoodFormOpen && <FoodCreateForm />}
    </>
  );
};
