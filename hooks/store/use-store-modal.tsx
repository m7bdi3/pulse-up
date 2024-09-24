import { create } from "zustand";

interface ModalState {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isDataRegisterOpen: boolean;
  openDateRegister: () => void;
  closeDataRegister: () => void;
  isWorkoutplanFormOpen: boolean;
  openWorkoutplanForm: () => void;
  closeWorkoutplanForm: () => void;
  isExerciseFormOpen: boolean;
  openExerciseForm: () => void;
  closeExerciseForm: () => void;
  isNutritionPlanFormOpen: boolean;
  openNutritionPlanForm: () => void;
  closeNutritionPlanForm: () => void;
  isMealFormOpen: boolean;
  openMealForm: () => void;
  closeMealForm: () => void;
  isFoodFormOpen: boolean;
  openFoodForm: () => void;
  closeFoodForm: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isLoginOpen: false,
  isDataRegisterOpen: false,
  isWorkoutplanFormOpen: false,
  isExerciseFormOpen: false,
  isNutritionPlanFormOpen: false,
  isMealFormOpen: false,
  isFoodFormOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
  openDateRegister: () => set({ isDataRegisterOpen: true }),
  closeDataRegister: () => set({ isDataRegisterOpen: false }),
  openWorkoutplanForm: () => set({ isWorkoutplanFormOpen: true }),
  closeWorkoutplanForm: () => set({ isWorkoutplanFormOpen: false }),
  openExerciseForm: () => set({ isExerciseFormOpen: true }),
  closeExerciseForm: () => set({ isExerciseFormOpen: false }),
  openNutritionPlanForm: () => set({ isNutritionPlanFormOpen: true }),
  closeNutritionPlanForm: () => set({ isNutritionPlanFormOpen: false }),
  openMealForm: () => set({ isMealFormOpen: true }),
  closeMealForm: () => set({ isMealFormOpen: false }),
  openFoodForm: () => set({ isFoodFormOpen: true }),
  closeFoodForm: () => set({ isFoodFormOpen: false }),
}));
