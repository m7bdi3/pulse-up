"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMealsStore, useUser } from "@/hooks/store/user";
import {
  Utensils,
  Calendar,
  ChevronRight,
  Flame,
  XCircle,
  Zap,
  Droplet,
  Wheat,
  Beef,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogMeal } from "@/actions/MealsActions";
import { toast } from "sonner";
import Confetti, { ConfettiRef } from "@/components/ConfettiComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export const MyMealPlansComponent = () => {
  const { nutritionPlan } = useUser();
  const { userMeals, completeMeal, unCompleteMeal } = useMealsStore();
  const [loading, setLoading] = useState(false);
  const confettiRef = React.useRef<ConfettiRef>(null);

  if (!nutritionPlan || !userMeals) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold mb-4">No Nutrition Plan</h2>
            <p className="text-muted-foreground mb-4">
              You don&apos;t have an active nutrition plan.
            </p>
            <Button>Create a Nutrition Plan</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedMeals = userMeals.filter((meal) => meal.isCompleted);
  const nonCompletedMeals = userMeals.filter((meal) => !meal.isCompleted);
  const totalMeals = userMeals.filter((meals) => meals.meal);
  const totalCalories = userMeals.reduce(
    (total, p) => total + (p.calories || 0),
    0
  );
  const totalCompletedCalories = completedMeals.reduce(
    (total, p) => total + (p.calories || 0),
    0
  );
  const completedMealsProtein = completedMeals.reduce(
    (total, p) => total + (p.protein || 0),
    0
  );
  const completedMealsCarbs = completedMeals.reduce(
    (total, p) => total + (p.carbs || 0),
    0
  );
  const completedMealsFats = completedMeals.reduce(
    (total, p) => total + (p.fats || 0),
    0
  );

  const handleSubmit = async (id: string, userMealId: string) => {
    setLoading(true);
    const currentMeal = userMeals.find((meal) => meal.id === userMealId);
    if (!currentMeal) {
      toast.error("Meal not found.");
      setLoading(false);
      return;
    }
    const currentIndex = userMeals.findIndex((meal) => meal.id === userMealId);
    const hasUncompletedBefore = userMeals
      .slice(0, currentIndex)
      .some((meal) => !meal.isCompleted);

    if (hasUncompletedBefore && !currentMeal.isCompleted) {
      toast.error("Please complete previous meals before this one.");
      setLoading(false);
      return;
    }
    try {
      if (currentMeal.isCompleted) {
        unCompleteMeal(currentMeal.id);
        const res = await LogMeal(id, userMealId);
        if (res.error) {
          toast.error(`Error: ${res.error}`);
        } else {
          toast.success(`Meal marked as incomplete`);
        }
      } else {
        completeMeal(currentMeal.id);
        const res = await LogMeal(id, userMealId);
        if (res.error) {
          toast.error(`Error: ${res.error}`);
        } else {
          confettiRef.current?.startConfetti();
          toast.success(`Meal logged successfully`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(`An unexpected error occurred while logging the meal.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background space-y-6"
    >
      <Card className="overflow-hidden">
        <div
          className="bg-cover bg-center aspect-video flex items-center justify-center"
          style={{
            backgroundImage: `url(${nutritionPlan.nutritionPlan.image})`,
          }}
        >
          <div className="w-full h-full backdrop-blur-sm bg-black/30 flex items-center justify-center">
            <h1 className="text-center text-4xl sm:text-6xl xl:text-8xl font-black text-white">
              {nutritionPlan.nutritionPlan.name}
            </h1>
          </div>
        </div>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Utensils className="mr-2 h-5 w-5" />
                      Today&apos;s Meals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {nonCompletedMeals.slice(0, 4).map((meal, index) => (
                      <Drawer key={index}>
                        <DrawerTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-between p-4 hover:bg-accent rounded-lg cursor-pointer transition-colors mb-2"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <Badge variant="secondary">
                                  {meal.meal.mealType}
                                </Badge>
                              </div>
                              <div>
                                <p className="font-medium">{meal.meal.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {meal.calories} cal
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>{meal.meal.name}</DrawerTitle>
                            <DrawerDescription>
                              <Badge variant="outline" className="mr-2">
                                {meal.meal.mealType}
                              </Badge>
                              {meal.meal.description}
                            </DrawerDescription>
                          </DrawerHeader>

                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <Card>
                                <CardContent className="flex flex-col items-center justify-center p-4">
                                  <Flame className="h-8 w-8 text-primary mb-2" />
                                  <p className="text-lg font-semibold">
                                    {meal.calories}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Calories
                                  </p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="flex flex-col items-center justify-center p-4">
                                  <Beef className="h-8 w-8 text-primary mb-2" />
                                  <p className="text-lg font-semibold">
                                    {meal.protein}g
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Protein
                                  </p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="flex flex-col items-center justify-center p-4">
                                  <Wheat className="h-8 w-8 text-primary mb-2" />
                                  <p className="text-lg font-semibold">
                                    {meal.carbs}g
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Carbs
                                  </p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardContent className="flex flex-col items-center justify-center p-4">
                                  <Droplet className="h-8 w-8 text-primary mb-2" />
                                  <p className="text-lg font-semibold">
                                    {meal.fats}g
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Fats
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                            <Card>
                              <CardHeader>
                                <CardTitle>Ingredients</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                  {meal.meal.foods.map((food, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2"
                                    >
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage
                                          src={food.image}
                                          alt={food.name}
                                        />
                                        <AvatarFallback>
                                          {food.name[0]}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm">
                                        {food.name}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          <DrawerFooter>
                            <Button
                              onClick={() =>
                                handleSubmit(meal.meal.id, meal.id)
                              }
                              disabled={loading}
                            >
                              {loading ? "Logging..." : "Log Meal"}
                            </Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Nutritional Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Calories</span>
                        <span className="font-medium">
                          {totalCompletedCalories} / {totalCalories} kcal
                        </span>
                      </div>
                      <Progress
                        value={(totalCompletedCalories / totalCalories) * 100}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Protein</span>
                        <span className="font-medium">
                          {completedMealsProtein}g /{" "}
                          {nutritionPlan.protein! * 30}g
                        </span>
                      </div>
                      <Progress
                        value={
                          (completedMealsProtein /
                            (nutritionPlan.protein! * 30)) *
                          100
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Carbs</span>
                        <span className="font-medium">
                          {completedMealsCarbs}g / {nutritionPlan.carbs! * 30}g
                        </span>
                      </div>
                      <Progress
                        value={
                          (completedMealsCarbs / (nutritionPlan.carbs! * 30)) *
                          100
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Fat</span>
                        <span className="font-medium">
                          {completedMealsFats}g / {nutritionPlan.fats! * 30}g
                        </span>
                      </div>
                      <Progress
                        value={
                          (completedMealsFats / (nutritionPlan.fats! * 30)) *
                          100
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Plan Adherence</span>
                        <span className="font-medium">
                          {Math.round(
                            (completedMeals.length / totalMeals.length) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (completedMeals.length / totalMeals.length) * 100
                        }
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Calorie Goal</span>
                        <span className="font-medium">
                          {Math.round(
                            (totalCompletedCalories / totalCalories) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(totalCompletedCalories / totalCalories) * 100}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </TabsContent>
          <TabsContent value="history">
            <CardContent>
              {completedMeals.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meal Name</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Calories</TableHead>
                      <TableHead>Completed At</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedMeals.map((meal) => (
                      <TableRow key={meal.id}>
                        <TableCell>{meal.meal.name}</TableCell>
                        <TableCell>{meal.day}</TableCell>
                        <TableCell>{meal.mealType}</TableCell>
                        <TableCell>{meal.calories}</TableCell>
                        <TableCell>{format(meal.updatedAt, "Pp")}</TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            onClick={() => {
                              handleSubmit(meal.meal.id, meal.id);
                            }}
                            className="p-0 h-8 w-8 hover:bg-destructive"
                          >
                            <XCircle
                              className="h-4 w-4"
                              key={`XCircle-${meal.id}-${meal.isCompleted}`}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="mx-auto text-center h-[600px] flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Completed meals will be showen here.
                  </p>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      <Confetti ref={confettiRef} />
    </motion.div>
  );
};
