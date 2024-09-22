"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MealTemplate, NutritionPlan } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { DailyPlanCreateForm } from "../forms/create-DailyPlan-form";
import { WeeklyPlanCreateForm } from "../forms/create-WeeklyPlan-form";
import { WeeklyColumns } from "@/app/(protected)/admin/mealPlans/_components/WeeklyColumns";
import { DailyColumns } from "@/app/(protected)/admin/mealPlans/_components/dailyColumn";

interface Props {
  data: MealTemplate[];
  weeklyPlans: {
    id: string;
    name: string;
    weekNumber: number;
    nutritionPlanId: string;
    nutritionPlan: {
      name: string;
    };
    dailyMealTemplates: {
      id: string;
      name: String;
      dayOfWeek: number;
      weeklyPlanTemplateId: string;
    }[];
  }[];
  dailyPlans: {
    id: string;
    name: string;
    dayOfWeek: number;
    weeklyPlanTemplateId: string;
    meals: {
      id: string;
      name: string;
    }[];
  }[];
  nutritionPlans: NutritionPlan[];
}

export const MealPlansComponent = ({
  data,
  weeklyPlans,
  dailyPlans,
  nutritionPlans,
}: Props) => {
  const WeeklyserializedData = weeklyPlans.map((item) => ({
    id: item.id,
    name: item.name,
    weekNumber: item.weekNumber,
    nutritonPlan: item.nutritionPlan.name,
    meals: item.dailyMealTemplates.length,
  }));

  const DailyserializedData = dailyPlans.map((item) => ({
    id: item.id,
    name: item.name,
    dayOfWeek: item.dayOfWeek,
    weeklyPlan: item.weeklyPlanTemplateId,
    meals: item.meals,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md space-y-8"
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Weekly Plans</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Weekly plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Weekly Plan</DialogTitle>
              </DialogHeader>
              <WeeklyPlanCreateForm nutritionPlans={nutritionPlans} />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable
          columns={WeeklyColumns}
          data={WeeklyserializedData}
          searchItem="name"
          filterName="Name"
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Daily Plans</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Daily plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Daily plan</DialogTitle>
              </DialogHeader>
              <DailyPlanCreateForm meals={data} weeklyPlans={weeklyPlans} />
            </DialogContent>
          </Dialog>
        </div>
        <DataTable
          columns={DailyColumns}
          data={DailyserializedData}
          searchItem="name"
          filterName="Name"
        />
      </div>
    </motion.div>
  );
};
