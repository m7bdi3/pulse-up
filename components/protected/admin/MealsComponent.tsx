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
import { Food, FoodCategory, MealType } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { MealColumns } from "@/app/(protected)/admin/meals/_components/columns";
import { MealCreateForm } from "../forms/create-Meal-form";
import { DeleteMeal } from "@/actions/MealsActions";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-store-modal";

export type MealWithFood = {
  id: string;
  name: string;
  description: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fats: number | null;
  servingSize: number;
  mealType: MealType;
  foods: {
    id: string;
    name: string;
    calories: number | null;
    protein: number | null;
    carbs: number | null;
    fats: number | null;
    image: string;
    category: FoodCategory;
  }[];
};

interface Props {
  data: MealWithFood[];
}

export const MealsComponent = ({ data }: Props) => {
  const { openMealForm } = useModalStore();
  const serializedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    macros: {
      protein: item.protein!,
      carbs: item.carbs!,
      fats: item.fats!,
    },
    calories: item.calories!,
    servingSize: item.servingSize,
    mealType: item.mealType,
  }));
  const handleDeleteRows = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => DeleteMeal(id)));
      toast.success(`Successfully deleted ${ids.length} meal(s)`);
    } catch (error) {
      console.error("Error deleting meals:", error);
      toast.error("Failed to delete one or more meals");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Meals</h2>
        <Button onClick={openMealForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Meal Item
        </Button>
      </div>
      <DataTable
        onDeleteRows={handleDeleteRows}
        columns={MealColumns}
        data={serializedData}
        searchItem="name"
        filterName="Meal"
      />
    </motion.div>
  );
};
