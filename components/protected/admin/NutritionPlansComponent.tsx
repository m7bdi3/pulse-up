"use client";

import React from "react";
import { motion } from "framer-motion";
import { NutritionPlanColumns } from "@/app/(protected)/admin/nutrition-plans/_components/columns";
import { NutritionPlanCreateForm } from "../forms/create-nutrition-plan";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/DataTable";

export type NutritionPlanWithMeals = {
  id: string;
  name: string;
  description: string | null;
  image: string;
  meals: {
    id: string;
    name: string;
  }[];
};

interface Props {
  data: NutritionPlanWithMeals[];
}

export const NutritionPlansComponent = ({ data }: Props) => {
  const serializedData = data.map((plan) => ({
    id: plan.id,
    nameData: {
      name: plan.name,
      image: plan.image,
    },
    meals: plan.meals.map((meal) => ({
      id: meal.id,
      name: meal.name,
    })),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Nutrition Plans</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Nutrition Plan</DialogTitle>
            </DialogHeader>
            <NutritionPlanCreateForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={NutritionPlanColumns}
        data={serializedData}
        searchItem="nameData"
        filterName="Nutrition Plan"
      />
    </motion.div>
  );
};
