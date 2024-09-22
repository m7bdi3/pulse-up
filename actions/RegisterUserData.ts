"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import * as z from "zod";
import { UserRegisterData } from "@/components/protected/forms";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  BodyPart,
  ExerciseCategory,
  Gender,
  Goal,
  MealType,
  SessionType,
} from "@prisma/client";

const nutritionPlans = {
  highProtein: "2c8e931d-d064-4427-a5df-babe5d7bd50f",
  lowCarb: "58690365-55b6-4b43-9d98-e931d24bc915",
  balanced: "efbaa9f4-ff36-4b39-8a50-2453a5cea515",
  vegan: "eded71c5-42ce-4c10-90da-ea77ad1d111c",
  lowFat: "1c0fc1a4-519e-47e7-9f36-040510bca696",
  mediterranean: "cf25d365-5829-4463-87b7-8ae17214135c",
};

enum ActivityLevel {
  SEDENTARY = 1.2,
  LIGHTLY_ACTIVE = 1.375,
  MODERATELY_ACTIVE = 1.55,
  VERY_ACTIVE = 1.725,
  EXTRA_ACTIVE = 1.9,
}

export async function calculateBMI(
  weight: number,
  height: number
): Promise<number> {
  return weight / ((height / 100) * (height / 100));
}

export async function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: Gender
): Promise<number> {
  if (gender === Gender.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

async function selectWorkoutPlan(
  goal: Goal,
  bmi: number,
  activityLevel: ActivityLevel,
  tdee: number
): Promise<string> {
  const workoutPlans = await db.workoutPlan.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  function selectedPlan(name: string) {
    const plan = workoutPlans.find((plan) => plan.name === name);
    return plan?.id!;
  }

  const workoutPlanMapping = {
    WEIGHT_LOSS: {
      plans: [
        {
          id: selectedPlan("HIIT for Weight Loss and Stamina"),
          conditions: bmi > 25,
        },
        {
          id: selectedPlan("Cardio and Core for Stamina and Weight Management"),
          conditions: activityLevel > ActivityLevel.MODERATELY_ACTIVE,
        },
      ],
    },
    WEIGHT_GAIN: {
      plans: [
        {
          id: selectedPlan("Muscle Building and Weight Gain"),
          conditions: bmi < 18.5,
        },
        {
          id: selectedPlan("Full-Body Strength Training"),
          conditions: tdee > 2500,
        },
      ],
    },
    MUSCLE_GAIN: {
      plans: [
        { id: selectedPlan("Full-Body Strength Training"), conditions: true },
        {
          id: selectedPlan("Muscle Building and Weight Gain"),
          conditions: bmi <= 20,
        },
      ],
    },
    MAINTAIN_WEIGHT: {
      plans: [
        {
          id: selectedPlan("Balanced Wellness Routine"),
          conditions: true,
        },
        {
          id: selectedPlan("Cardio and Core for Stamina and Weight Management"),
          conditions: activityLevel >= ActivityLevel.LIGHTLY_ACTIVE,
        },
      ],
    },
    INCREASE_FLEXIBILITY: {
      plans: [
        {
          id: selectedPlan("Flexibility and Core Stability"),
          conditions: true,
        },
      ],
    },
    INCREASE_STAMINA: {
      plans: [
        {
          id: selectedPlan("Cardio and Core for Stamina and Weight Management"),
          conditions: activityLevel >= ActivityLevel.MODERATELY_ACTIVE,
        },
        {
          id: selectedPlan("Energy Boost and Stamina"),
          conditions: tdee > 2200,
        },
      ],
    },
    IMPROVE_OVERALL_HEALTH: {
      plans: [
        { id: selectedPlan("Balanced Wellness Routine"), conditions: true },
        {
          id: selectedPlan("Full-Body Strength Training"),
          conditions: bmi >= 18.5 && bmi <= 24.9,
        },
      ],
    },
    INCREASE_ENERGY_LEVEL: {
      plans: [
        { id: selectedPlan("Energy Boost and Stamina"), conditions: true },
      ],
    },
  };

  const plans =
    workoutPlanMapping[goal as keyof typeof workoutPlanMapping]?.plans || [];

  for (const plan of plans) {
    if (plan.conditions) {
      return plan.id;
    }
  }

  return "7fb6192d-49dd-495e-8e0d-d771a2e4aac2";
}

export async function calculateTDEE(
  bmr: number,
  activityLevel: ActivityLevel
): Promise<number> {
  return bmr * activityLevel;
}

async function selectNutritionPlan(
  goal: Goal,
  protein: number,
  carbs: number,
  fats: number
): Promise<string> {
  if (goal === Goal.WEIGHT_LOSS && protein > carbs) {
    return nutritionPlans.lowCarb;
  } else if (goal === Goal.WEIGHT_GAIN && protein > 20 && fats > 10) {
    return nutritionPlans.highProtein;
  } else if (goal === Goal.MAINTAIN_WEIGHT) {
    return nutritionPlans.balanced;
  }
  return nutritionPlans.balanced;
}

async function assignMealsToUser(
  userNutritionPlanId: string,
  totalCalories: number
) {
  const meals = await db.meal.findMany();
  const daysInMonth = 30;
  const mealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];

  const userMealPlans = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayMeals = mealTypes.map((mealType) => {
      const meal = meals.find((m) => m.mealType === mealType);

      if (meal) {
        const mealCaloriesSplit: { [key: string]: number } = {
          BREAKFAST: 0.25,
          LUNCH: 0.35,
          DINNER: 0.3,
          SNACK: 0.1,
        };

        const targetMealCalories = totalCalories * mealCaloriesSplit[mealType];

        const caloriesPerServing = meal.calories!;
        const adjustedServingSize = targetMealCalories / caloriesPerServing;

        const protein = +(meal.protein! * adjustedServingSize).toFixed(2);
        const carbs = +(meal.carbs! * adjustedServingSize).toFixed(2);
        const fats = +(meal.fats! * adjustedServingSize).toFixed(2);

        const calories = Math.round(caloriesPerServing * adjustedServingSize);

        return {
          userNutritionPlanId,
          day,
          mealType: mealType as MealType,
          mealId: meal.id,
          calories,
          protein,
          carbs,
          fats,
        };
      }
    });

    userMealPlans.push(...dayMeals);
  }
  return userMealPlans.filter(Boolean);
}

async function assignSessionToUser(workoutId: string) {
  const workoutPlan = await db.workoutPlan.findUnique({
    where: { id: workoutId },
  });

  if (!workoutPlan) {
    throw new Error("Workout plan not found");
  }

  const exercises = await db.exercise.findMany();

  // Define 5 sessions per week
  const sessionsPerWeek = 5;
  const totalSessions = Math.ceil((5 * (workoutPlan.duration || 30)) / 7);

  type SessionTypes = {
    [key: string]: SessionType[];
  };

  const sessionTypes: SessionTypes = {
    "Full-Body Strength Training": [
      SessionType.Upper_Body_Strength,
      SessionType.Lower_Body_Strength,
      SessionType.Full_Body,
    ],
    "HIIT for Weight Loss and Stamina": [
      SessionType.HIIT_Cardio,
      SessionType.Bodyweight_Exercises,
    ],
    "Flexibility and Core Stability": [
      SessionType.Stretching,
      SessionType.Core_Strength,
    ],
    "Cardio and Core for Stamina and Weight Management": [
      SessionType.Cardio,
      SessionType.Core_Strength,
    ],
    "Muscle Building and Weight Gain": [
      SessionType.Upper_Body_Strength,
      SessionType.Lower_Body_Strength,
      SessionType.Full_Body,
    ],
    "Balanced Wellness Routine": [
      SessionType.Cardio,
      SessionType.Strength_Training,
      SessionType.Stretching,
    ],
    "Energy Boost and Stamina": [SessionType.Cardio, SessionType.Full_Body],
  };

  function isBodyPartInList(bodyPart: BodyPart, parts: BodyPart[]): boolean {
    return parts.includes(bodyPart);
  }

  const assignedSessions = [];

  let currentWeek = 1;

  for (let i = 0; i < totalSessions; i++) {
    const sessionType =
      sessionTypes[workoutPlan.name]?.[
        i % (sessionTypes[workoutPlan.name]?.length || 1)
      ];

    let assignedExercises = exercises.filter((exercise) => {
      switch (sessionType) {
        case SessionType.Upper_Body_Strength:
          return isBodyPartInList(exercise.bodyPart, [
            BodyPart.ARMS,
            BodyPart.CHEST,
            BodyPart.BACK,
            BodyPart.SHOULDERS,
            BodyPart.FOREARMS,
          ]);
        case SessionType.Lower_Body_Strength:
          return isBodyPartInList(exercise.bodyPart, [
            BodyPart.CALVES,
            BodyPart.LEGS,
            BodyPart.GLUTES,
          ]);
        case SessionType.Full_Body:
          return true;
        case SessionType.HIIT_Cardio:
          return (
            exercise.category === ExerciseCategory.CARDIO &&
            exercise.equipment.length === 0
          );
        case SessionType.Bodyweight_Exercises:
          return exercise.equipment.length === 0;
        case SessionType.Stretching:
          return exercise.category === ExerciseCategory.FLEXIBILITY;
        case SessionType.Core_Strength:
          return exercise.bodyPart === BodyPart.CORE;
        case SessionType.Cardio:
          return exercise.category === ExerciseCategory.CARDIO;
        case SessionType.Strength_Training:
          return exercise.category === ExerciseCategory.STRENGTH;
        default:
          return true;
      }
    });

    assignedExercises = assignedExercises.sort(() => Math.random() - 0.5);

    if (assignedExercises.length > 7) {
      assignedExercises = assignedExercises.slice(0, 7);
    } else {
      while (assignedExercises.length < 7) {
        assignedExercises.push(
          assignedExercises[
            Math.floor(Math.random() * assignedExercises.length)
          ]
        );
      }
    }

    const totalDuration = assignedExercises.reduce(
      (sum, exercise) => sum + (exercise.duration || 0),
      0
    );

    assignedSessions.push({
      name: `Session ${i + 1}: ${sessionType.replace(/_/g, " ")}`,
      day: i + 1,
      type: sessionType,
      duration: totalDuration,
      caloriesBurned: Math.ceil(
        assignedExercises.reduce(
          (sum, exercise) => sum + exercise.caloriesBurned,
          0
        )
      ),
      feedback: [],
      week: currentWeek, // Assign the correct week
      workoutPlanId: workoutPlan.id,
      exercises: assignedExercises.map((exercise) => ({
        exerciseId: exercise.id,
      })),
    });

    // Move to the next week after every 5 sessions
    if ((i + 1) % sessionsPerWeek === 0) {
      currentWeek++;
    }
  }

  return assignedSessions;
}

export async function calculateBodyFat(
  age: number,
  gender: string,
  bmi: number
): Promise<number> {
  if (gender === "male") {
    return 1.2 * bmi + 0.23 * age - 16.2;
  } else {
    return 1.2 * bmi + 0.23 * age - 5.4;
  }
}

export async function calculateMuscleMass(
  weight: number,
  height: number,
  age: number
): Promise<number> {
  return 0.244 * weight + (7.8 * height) / 100 - 0.098 * age + 6.6;
}

export async function RegisterUserData(
  values: z.infer<typeof UserRegisterData>,
  userId: string
) {
  const session = await auth();
  if (!session?.user?.id || userId !== session.user.id) {
    return redirect("/");
  }

  const validatedValues = UserRegisterData.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid fields" };
  }
  const { address, age, phone, weight, height, gender, goal, activityLevel } =
    validatedValues.data;

  const bmi = await calculateBMI(weight, height);
  const bmr = await calculateBMR(weight, height, age, gender);

  const activityLevelEnum =
    ActivityLevel[activityLevel as keyof typeof ActivityLevel];

  const tdee = await calculateTDEE(bmr, activityLevelEnum);

  const protein = (0.3 * tdee) / 4;
  const carbs = (0.4 * tdee) / 4;
  const fats = (0.3 * tdee) / 9;

  const totalCalories = Math.round(tdee);

  const assignedWorkoutPlan = await selectWorkoutPlan(
    goal,
    bmi,
    activityLevelEnum,
    tdee
  );

  const assignedNutritionPlan = await selectNutritionPlan(
    goal,
    protein,
    carbs,
    fats
  );

  const userBodyFat = await calculateBodyFat(age, gender, bmi);
  const userMuscleMass = await calculateMuscleMass(weight, height, age);

  const userMeals = await assignMealsToUser(assignedNutritionPlan, tdee);

  const userSessions = await assignSessionToUser(assignedWorkoutPlan);
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        address,
        age,
        phone,
        weight,
        height,
        gender,
        goal,
        bmi,
        bmr,
        bodyFat: userBodyFat,
        muscleMass: userMuscleMass,
        activityLevel,
        nutritionPlan: {
          create: {
            nutritionPlanId: assignedNutritionPlan,
            caloriesPerDay: totalCalories,
            carbs,
            fats,
            protein,
            UserMealPlan: {
              create: userMeals.map((meal) => ({
                day: meal?.day!,
                mealType: meal?.mealType!,
                mealId: meal?.mealId!,
                calories: meal?.calories!,
                protein: meal?.protein!,
                carbs: meal?.carbs!,
                fats: meal?.fats!,
              })),
            },
          },
        },
        workoutPlan: {
          create: {
            workoutPlanId: assignedWorkoutPlan,
            sessions: {
              create: userSessions.map((session) => ({
                name: session.name,
                day: session.day,
                type: session.type,
                week: session.week,
                duration: session.duration,
                caloriesBurned: session.caloriesBurned,
                feedback: session.feedback,
                exercises: {
                  create: session.exercises.map((exercise) => ({
                    exerciseId: exercise.exerciseId,
                  })),
                },
              })),
            },
          },
        },
      },
    });
    revalidatePath("/dashboard", "layout");

    return { success: "Data submitted successfully" };
  } catch (e) {
    console.error(e);
    return { error: "Failed to submit data" };
  }
}
