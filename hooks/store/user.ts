import {
  activityLevel,
  BodyPart,
  DifficultyLevel,
  ExerciseCategory,
  ExerciseEquipment,
  Food,
  FoodCategory,
  Gender,
  Goal,
  Meal,
  MealType,
  NutritionPlan,
  Progress,
  SessionType,
  Subscription,
  SubscriptionStatus,
  UserRole,
  WorkoutPlan,
} from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserWithDetails = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  phone?: string | null;
  address?: string | null;
  age?: number | null;
  gender: Gender;
  height?: number | null;
  goal?: Goal | null;
  weight?: number | null;
  bmi?: number | null;
  bmr?: number | null;
  bodyFat?: number | null;
  muscleMass?: number | null;
  activityLevel?: activityLevel | null;
  createdAt: Date;
  updatedAt: Date;
  isSubscribed: boolean;
  role: UserRole;
};

export type userWorkoutPlan = {
  id: string;
  userId: string;
  workoutPlanId: string;
  createdAt: Date;
  updatedAt: Date;
  workoutPlan: {
    id: string;
    name: string;
    description: string | null;
    goal: Goal;
    difficulty: DifficultyLevel;
    duration: number | null;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type userSessions = {
  id: string;
  name: string;
  day: number;
  week: number;
  type: SessionType;
  duration: number;
  completed: boolean;
  caloriesBurned?: number | null;
  feedback: string[];
  workoutPlanId: string;
  createdAt: Date;
  updatedAt: Date;
  exercises: {
    sessionId: string;
    exerciseId: string;
    exercise: {
      id: string;
      name: string;
      description?: string | null;
      duration: number;
      repetitions?: number | null;
      bodyPart: BodyPart;
      caloriesBurned: number;
      sets?: number | null;
      images: string[];
      equipment: ExerciseEquipment[];
      category: ExerciseCategory;
    };
  }[];
}[];

export type userNutritionPlan = {
  id: string;
  userId: string;
  nutritionPlanId: string;
  subscriptionDate: Date;
  caloriesPerDay?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fats?: number | null;
  nutritionPlan: {
    id: string;
    name: string;
    description?: string | null;
    image: string;
  };
};

export type UserMealPlan = {
  id: string;
  day: number;
  mealType: MealType;
  mealId: string;
  isCompleted: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  userNutritionPlanId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  meal: {
    id: string;
    name: string;
    description?: string | null;
    calories?: number | null;
    protein?: number | null;
    carbs?: number | null;
    fats?: number | null;
    servingSize: number;
    mealType: MealType;
    foods: {
      id: string;
      name: string;
      calories?: number | null;
      protein?: number | null;
      carbs?: number | null;
      fats?: number | null;
      image: string;
      category: FoodCategory;
    }[];
  };
}[];

export type PostsWithData = {
  id: string;
  userId: string;
  content: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  comments: {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
  }[];
  likes: {
    id: string;
    postId: string;
    userId: string;
    createdAt: Date;
  }[];
  _count: {
    likes: number;
    comments: number;
  };
};

interface userState {
  user: UserWithDetails | undefined;
  progress: Progress[] | undefined;
  addNewProgress: (newProgress: Progress) => void;
  workoutPlan: userWorkoutPlan | null;
  nutritionPlan: userNutritionPlan | null;
  logout: () => void;
}

export const useUser = create<userState>((set) => {
  return {
    user: undefined,
    progress: undefined,
    addNewProgress: (newProgress) =>
      set((state) => ({
        progress: state.progress
          ? [...state.progress, newProgress]
          : [newProgress],
      })),
    workoutPlan: null,
    nutritionPlan: null,
    logout: () => set({ user: undefined }),
  };
});

interface SessionsStore {
  sessions: userSessions | null;
  completeSession: (id: string) => void;
  unCompleteSession: (id: string) => void;
}

export const useSessionsStore = create(
  persist<SessionsStore>(
    (set) => ({
      sessions: [],
      completeSession: (id: string) => {
        set((state) => ({
          sessions: state.sessions
            ? state.sessions.map((session) =>
                session.id === id ? { ...session, completed: true } : session
              )
            : null,
        }));
      },
      unCompleteSession: (id: string) => {
        set((state) => ({
          sessions: state.sessions
            ? state.sessions.map((session) =>
                session.id === id ? { ...session, completed: false } : session
              )
            : null,
        }));
      },
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface MealsStore {
  userMeals: UserMealPlan | null;
  completeMeal: (id: string) => void;
  unCompleteMeal: (id: string) => void;
}

export const useMealsStore = create(
  persist<MealsStore>(
    (set) => ({
      userMeals: [],
      completeMeal: (id: string) => {
        set((state) => ({
          userMeals: state.userMeals
            ? state.userMeals.map((meal) =>
                meal.id === id ? { ...meal, isCompleted: true } : meal
              )
            : null,
        }));
      },
      unCompleteMeal: (id: string) => {
        set((state) => ({
          userMeals: state.userMeals
            ? state.userMeals.map((meal) =>
                meal.id === id ? { ...meal, isCompleted: false } : meal
              )
            : null,
        }));
      },
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useChallengesStore = create(
  persist<MealsStore>(
    (set) => ({
      userMeals: [],
      completeMeal: (id: string) => {
        set((state) => ({
          userMeals: state.userMeals
            ? state.userMeals.map((meal) =>
                meal.id === id ? { ...meal, isCompleted: true } : meal
              )
            : null,
        }));
      },
      unCompleteMeal: (id: string) => {
        set((state) => ({
          userMeals: state.userMeals
            ? state.userMeals.map((meal) =>
                meal.id === id ? { ...meal, isCompleted: false } : meal
              )
            : null,
        }));
      },
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface NutritionPlans {
  nutritionPlans: NutritionPlan[] | null;
}

export const useNutriotionPlansStore = create(
  persist<NutritionPlans>(
    () => ({
      nutritionPlans: [],
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface WorkoutPlans {
  WorkoutPlans: WorkoutPlan[] | null;
}

export const useWorkoutPlansStore = create(
  persist<WorkoutPlans>(
    () => ({
      WorkoutPlans: [],
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface FoodsStore {
  foods: Food[] | null;
}

export const useFoodsStore = create(
  persist<FoodsStore>(
    () => ({
      foods: [],
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export type UserWithData = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  address: string | null;
  age: number | null;
  gender: Gender;
  height: number | null;
  goal: Goal | null;
  weight: number | null;
  bmi: number | null;
  bmr: number | null;
  bodyFat: number | null;
  muscleMass: number | null;
  activityLevel: activityLevel | null;
  createdAt: Date;
  updatedAt: Date;
  isSubscribed: boolean;
  role: UserRole;
  workoutPlan: {
    id: string;
    userId: string;
    workoutPlanId: string;
    createdAt: Date;
    updatedAt: Date;
    workoutPlan: {
      name: string;
    };
    sessions: {
      id: string;
      name: string;
      day: number;
      week: number;
      type: SessionType;
      duration: number;
      completed: boolean;
      caloriesBurned: number | null;
      feedback: string[];
      workoutPlanId: string;
      createdAt: Date;
      updatedAt: Date;
      exercises: {
        exerciseId: string;
        exercise: {
          id: string;
          name: string;
          description: string | null;
          duration: number;
          repetitions: number | null;
          bodyPart: BodyPart;
          caloriesBurned: number;
          sets: number | null;
          images: string[];
          equipment: ExerciseEquipment[];
          category: ExerciseCategory;
        };
      }[];
    }[];
  } | null;
  nutritionPlan: {
    id: string;
    userId: string;
    nutritionPlanId: string;
    subscriptionDate: Date;
    caloriesPerDay: number | null;
    protein: number | null;
    carbs: number | null;
    fats: number | null;
    nutritionPlan: {
      name: string;
    };
    UserMealPlan: {
      id: string;
      day: number;
      mealType: MealType;
      mealId: string;
      isCompleted: boolean;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
      userNutritionPlanId: string | null;
      createdAt: Date;
      updatedAt: Date;
      meal: Meal;
    }[];
  } | null;
  Subscription: Subscription | null;
  Post: {
    id: string;
    userId: string;
    content: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
  }[];
  Comment: {
    id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  LifeTimePayment: {
    id: string;
    userId: string;
    planId: string;
    price: number;
    Status: SubscriptionStatus;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  UserChallenge: {
    id: string;
    userId: string;
    challengeId: string;
    challenge: {
      name: string;
    };
  }[];
  UserEvent: {
    id: string;
    userId: string;
    eventId: string;
    event: {
      name: string;
    };
  }[];
  progress: Progress[];
};

interface AdminUsers {
  users: UserWithData[] | null;
}

export const useAdminStore = create(
  persist<AdminUsers>(
    () => ({
      users: [],
    }),
    {
      name: "Sessions-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
