"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ActivityIcon,
  UtensilsIcon,
  Loader2Icon,
} from "lucide-react";
import { Goal } from "@prisma/client";
import { useMealsStore, useSessionsStore, useUser } from "@/hooks/store/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const goalEmoji: { [key in Goal]: string } = {
  WEIGHT_LOSS: "🏋️",
  WEIGHT_GAIN: "💪",
  MUSCLE_GAIN: "🦾",
  MAINTAIN_WEIGHT: "⚖️",
  INCREASE_STAMINA: "🏃",
  INCREASE_FLEXIBILITY: "🧘",
  IMPROVE_OVERALL_HEALTH: "🌟",
  INCREASE_ENERGY_LEVEL: "⚡",
};

interface StatCardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  isPositive,
}) => (
  <div className="flex justify-between items-center mb-2">
    <span>{title}:</span>
    <span className="font-semibold">
      {value} {unit}
      {change !== undefined && (
        <span
          className={isPositive ? "text-green-500 ml-2" : "text-red-500 ml-2"}
        >
          {isPositive ? (
            <ArrowUpIcon className="inline w-4 h-4" />
          ) : (
            <ArrowDownIcon className="inline w-4 h-4" />
          )}
          {Math.abs(change).toFixed(1)} {unit}
        </span>
      )}
    </span>
  </div>
);

const ProgressCard: React.FC<{
  title: string;
  value: number;
  max: number;
  change: number;
}> = ({ title, value, max, change }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span>{title}</span>
      <span className={change > 0 ? "text-green-500" : "text-red-500"}>
        {change < 0 ? (
          <ArrowDownIcon className="inline" />
        ) : (
          <ArrowUpIcon className="inline" />
        )}
        {Math.abs(change).toFixed(1)}{" "}
        {title === "Body Fat" || "Muscle Mass" ? "%" : "kg"}
      </span>
    </div>
    <Progress value={(Math.abs(change) / max) * 100} />
  </div>
);

export const OverviewComponent: React.FC = () => {
  const { user, progress, workoutPlan, nutritionPlan } = useUser();
  const { sessions } = useSessionsStore();
  const { userMeals } = useMealsStore();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2Icon className="animate-spin h-12 w-12" />
      </div>
    );
  }

  const latestProgress = progress![0];
  const weightChange = latestProgress.weight! - user.weight!;
  const bodyFatChange = user.bodyFat! - latestProgress.bodyFat!!;
  const muscleMassChange = latestProgress.muscleMass! - user.muscleMass!;

  const unCompletedSessions = sessions?.filter((session) => !session.completed);
  const unCompletedMeals = userMeals?.filter((meal) => !meal.isCompleted);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          key="current-stats"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 w-full"
        >
          <Card className="h-full w-full">
            <CardHeader>
              <CardTitle>Current Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <StatCard
                title="Weight"
                value={latestProgress.weight!}
                unit="kg"
                change={weightChange}
                isPositive={weightChange > 0}
              />
              <StatCard title="Height" value={user.height!} unit="cm" />
              <StatCard title="BMI" value={latestProgress.bmi!.toFixed(1)} />
              <StatCard
                title="BMR"
                value={latestProgress.bmr!.toFixed(0)}
                unit="kcal"
              />
              <StatCard
                title="Activity Level"
                value={user.activityLevel?.replace(/_/g, " ") || "N/A"}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key="progress"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-1 w-full"
        >
          <Card className="h-full w-full ">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressCard
                title="Weight"
                value={Math.abs(weightChange)}
                max={user.weight || 1}
                change={weightChange}
              />
              <ProgressCard
                title="Body Fat"
                value={Math.abs(bodyFatChange)}
                max={latestProgress.bodyFat || 1}
                change={bodyFatChange}
              />
              <ProgressCard
                title="Muscle Mass"
                value={Math.abs(muscleMassChange)}
                max={latestProgress.muscleMass || 1}
                change={muscleMassChange}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key="goal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card className="relative h-full overflow-hidden col-span-2 w-full">
            {workoutPlan?.workoutPlan?.image && (
              <Image
                src={workoutPlan.workoutPlan.image}
                alt={`Workout plan image for ${
                  user.goal?.replace(/_/g, " ") || "Improved Health"
                }`}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 z-0"
              />
            )}
            <div className="relative z-10 h-full backdrop-blur-sm bg-background/60">
              <CardHeader>
                <CardTitle>Goal</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <p className="text-4xl mb-2">
                  {goalEmoji[user.goal ?? "IMPROVE_OVERALL_HEALTH"]}
                </p>
                <p className="text-2xl font-bold mb-2">
                  {user.goal?.replace(/_/g, " ") || "Improve Overall Health"}
                </p>
                <p className="text-muted-foreground">
                  Keep pushing towards your goal!
                </p>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Workout Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {workoutPlan ? (
                <div className="space-y-4">
                  <div className="space-y-2 h-32">
                    <StatCard
                      title="Goal"
                      value={workoutPlan.workoutPlan.goal}
                    />
                    <StatCard
                      title="Difficulty"
                      value={workoutPlan.workoutPlan.difficulty}
                    />
                    <StatCard
                      title="Duration"
                      value={workoutPlan.workoutPlan.duration!}
                      unit="weeks"
                    />
                  </div>
                  <div className="space-y-4 h-80">
                    {unCompletedSessions?.slice(0, 3).map((session) => (
                      <div key={session.id} className=" space-y-1">
                        <Separator className="w-full mb-2" />
                        <h4 className="font-semibold">{session.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Day {session.day} - {session.type}
                        </p>
                        <p className="text-sm">
                          Duration: {session.duration} minutes
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full row-span-1 place-self-end"
                    onClick={() => router.push("/dashboard/workouts")}
                  >
                    <ActivityIcon className="mr-2 h-4 w-4" /> View Workout Plan
                  </Button>
                </div>
              ) : (
                <p>You don&apos;t have an active workout plan.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Nutrition Plan</CardTitle>
            </CardHeader>
            <CardContent>
              {nutritionPlan ? (
                <div className="space-y-4">
                  <div className="space-y-2 row-span-1 h-32">
                    <StatCard
                      title="Daily Calories"
                      value={nutritionPlan.caloriesPerDay!}
                      unit="kcal"
                    />
                    <StatCard
                      title="Protein"
                      value={nutritionPlan.protein!.toFixed(2)}
                      unit="g"
                    />
                    <StatCard
                      title="Carbs"
                      value={nutritionPlan.carbs!.toFixed(2)}
                      unit="g"
                    />
                    <StatCard
                      title="Fats"
                      value={nutritionPlan.fats!.toFixed(2)}
                      unit="g"
                    />
                  </div>
                  <div className="space-y-2 h-80 ">
                    {unCompletedMeals?.slice(0, 4).map((meal) => (
                      <div key={meal.id} className="">
                        <Separator className="w-full mb-2" />

                        <h4 className="font-semibold">{meal.mealType}</h4>
                        <p className="text-sm">{meal.meal.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Calories: {meal.calories} | P: {meal.protein}g | C:{" "}
                          {meal.carbs}g | F: {meal.fats}g
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full row-span-1 place-self-end"
                    onClick={() => router.push("/dashboard/mymealplan")}
                  >
                    <UtensilsIcon className="mr-2 h-4 w-4" /> View Nutrition
                    Plan
                  </Button>
                </div>
              ) : (
                <p>You don&apos;t have an active nutrition plan.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
