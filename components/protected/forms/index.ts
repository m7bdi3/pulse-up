import { z } from "zod";

const MealType = z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACK"]);

const FoodCategory = z.enum([
  "PROTEIN",
  "CARBS",
  "VEGETABLES",
  "FRUITS",
  "DAIRY",
  "FATS",
]);

const ExerciseCategory = z.enum([
  "STRENGTH",
  "CARDIO",
  "FLEXIBILITY",
  "BALANCE",
]);

const DifficultyLevel = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);

const EquipmentCategory = z.enum([
  "DUMBBELLS",
  "BARBELL",
  "KETTLEBELL",
  "WEIGHT_PLATES",
  "RESISTANCE_BAND",
  "MEDICINE_BALL",
  "EXERCISE_BALL",
  "FOAM_ROLLER",
  "TREADMILL",
  "ELLIPTICAL",
  "STATIONARY_BIKE",
  "ROWING_MACHINE",
  "CABLE_MACHINE",
  "LEG_PRESS_MACHINE",
  "SMITH_MACHINE",
  "PEC_DECK_MACHINE",
  "LEG_EXTENSION_MACHINE",
  "LEG_CURL_MACHINE",
  "LAT_PULLDOWN_MACHINE",
  "CHEST_PRESS_MACHINE",
  "SHOULDER_PRESS_MACHINE",
  "LEG_ADDUCTOR_MACHINE",
  "LEG_ABDUCTOR_MACHINE",
  "SEATED_ROW_MACHINE",
  "BENCH",
  "PULLUP_BAR",
  "DIP_BARS",
  "SQUAT_RACK",
  "TRX_SUSPENSION",
  "YOGA_MAT",
  "STEP_PLATFORM",
  "BOSU_BALL",
  "ANKLE_WEIGHTS",
  "BATTLE_ROPE",
  "PLYOMETRIC_BOX",
  "SAND_BAG",
  "SLAM_BALL",
  "SLIDING_DISCS",
  "PARALLETTES",
  "HIP_THRUST_MACHINE",
  "ABDOMINAL_CRUNCH_MACHINE",
  "HACK_SQUAT_MACHINE",
  "JUMP_ROPE",
  "NONE",
]);

export const UserRegisterData = z.object({
  phone: z
    .string()
    .regex(/^\d{9,15}$/, "Phone number must be between 9 and 15 digits"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address should not exceed 100 characters"),
  age: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(13, "Age must be at least 13")
      .max(100, "Age must be realistic and less than 100")
  ),

  gender: z.enum(["Male", "Female"], {
    required_error: "Gender is required",
  }),
  goal: z.enum(
    [
      "WEIGHT_LOSS",
      "WEIGHT_GAIN",
      "MUSCLE_GAIN",
      "MAINTAIN_WEIGHT",
      "INCREASE_STAMINA",
      "INCREASE_FLEXIBILITY",
      "IMPROVE_OVERALL_HEALTH",
      "INCREASE_ENERGY_LEVEL",
    ],
    { required_error: "Goal is required" }
  ),
  height: z.preprocess((val) => Number(val), z.number().min(0)),
  weight: z.preprocess((val) => Number(val), z.number().min(0)),
  activityLevel: z.enum([
    "SEDENTARY",
    "LIGHTLY_ACTIVE",
    "MODERATELY_ACTIVE",
    "VERY_ACTIVE",
    "EXTRA_ACTIVE",
  ]),
});

export const MealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  calories: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  protein: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  carbs: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  fats: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  servingSize: z.preprocess((val) => Number(val), z.number().min(0)),
  mealType: MealType,
  foodId: z.array(z.string()),
});

export const DailyMealPlanSchema = z.object({
  dayOfWeek: z.preprocess((val) => Number(val), z.number()),
  weeklyPlanTemplateId: z.string(),
  meals: z.array(z.string()),
  name: z.string(),
});

export const WeeklyMealPlanSchema = z.object({
  name: z.string(),
  weekNumber: z.preprocess((val) => Number(val), z.number()),
  nutritionPlanId: z.string(),
});

export const NutritionPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().url("Invalid image URL"),
  description: z.string().optional(),
});

export const FoodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  calories: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  protein: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  carbs: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  fats: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  image: z.string().url("Invalid image URL"),
  category: FoodCategory.default("PROTEIN"),
});

export const ExerciseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  repetitions: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  sets: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  images: z.array(z.string().url("Invalid image URL")),
  equipments: z.array(z.enum(EquipmentCategory.options)).default(["NONE"]),
  category: ExerciseCategory.default("STRENGTH"),
});

export const WorkoutPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
  image: z.string().url("Invalid image URL"),
  goal: z.enum(
    [
      "WEIGHT_LOSS",
      "WEIGHT_GAIN",
      "MUSCLE_GAIN",
      "MAINTAIN_WEIGHT",
      "INCREASE_STAMINA",
      "INCREASE_FLEXIBILITY",
      "IMPROVE_OVERALL_HEALTH",
      "INCREASE_ENERGY_LEVEL",
    ],
    { required_error: "Goal is required" }
  ),
  difficulty: DifficultyLevel.default("BEGINNER"),
});

export const SessionSchema = z.object({
  data: z.string().min(1, "Name is required"),
  duration: z.preprocess((val) => Number(val), z.number().min(0)),
  caloriesBurned: z
    .preprocess((val) => Number(val), z.number().min(0))
    .optional(),
  workoutPlan: z.string(),
  exercises: z.array(z.string()),
  day: z.preprocess((val) => Number(val), z.number().min(1).max(60)),
});

export const ProgressSchema = z.object({
  weight: z.preprocess((val) => Number(val), z.number().min(0)),
  chest_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  back_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  deadlift_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  squat_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  shoulder_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  bicep_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  tricep_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  core_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  glute_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  calf_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  traps_weight: z.preprocess((val) => Number(val), z.number().min(0)),
  notes: z.string().nullable(),
});

export const PostSchema = z.object({
  content: z.string().min(2).max(500),
  images: z.array(z.string()),
});

export const CommentSchema = z.object({
  content: z.string().min(2).max(500),
  postId: z.string(),
});

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  age: z
    .number()
    .min(18, "Must be at least 18 years old")
    .max(120, "Invalid age"),
  gender: z.enum(["Male", "Female"]),
  height: z
    .number()
    .min(100, "Height must be at least 100 cm")
    .max(300, "Height must be less than 300 cm"),
  weight: z
    .number()
    .min(30, "Weight must be at least 30 kg")
    .max(500, "Weight must be less than 500 kg"),
  goal: z.enum([
    "WEIGHT_LOSS",
    "WEIGHT_GAIN",
    "MUSCLE_GAIN",
    "MAINTAIN_WEIGHT",
    "INCREASE_STAMINA",
    "INCREASE_FLEXIBILITY",
    "IMPROVE_OVERALL_HEALTH",
    "INCREASE_ENERGY_LEVEL",
  ]),
  activityLevel: z.enum([
    "SEDENTARY",
    "LIGHTLY_ACTIVE",
    "MODERATELY_ACTIVE",
    "VERY_ACTIVE",
    "EXTRA_ACTIVE",
  ]),
});

export const SubPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess((val) => Number(val), z.number().min(0)),
  duration: z.preprocess((val) => Number(val), z.number().min(0)),
});
