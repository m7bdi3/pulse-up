"use client";

import React from "react";
import { motion } from "framer-motion";
import { NutritionPlanColumns } from "@/app/(protected)/admin/nutrition-plans/_components/columns";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/DataTable";
import { DeleteNutritionPlan } from "@/actions/NutritionPlanAction";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-store-modal";

export type NutritionPlanWithMeals = {
  id: string;
  name: string;
  description: string | null;
  image: string;
};

interface Props {
  data: NutritionPlanWithMeals[];
}

export const NutritionPlansComponent = ({ data }: Props) => {
  const { openNutritionPlanForm } = useModalStore();

  const serializedData = data.map((plan) => ({
    id: plan.id,
    nameData: {
      name: plan.name,
      image: plan.image,
    },
  }));

  const handleDeleteRows = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => DeleteNutritionPlan(id)));
      toast.success(`Successfully deleted ${ids.length} plan(s)`);
    } catch (error) {
      console.error("Error deleting plans:", error);
      toast.error("Failed to delete one or more plan");
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
        <h2 className="text-2xl font-bold">Nutrition Plans</h2>
        <Button onClick={openNutritionPlanForm}>
          <Plus className="mr-2 h-4 w-4" /> New Plan
        </Button>
      </div>
      <DataTable
        onDeleteRows={handleDeleteRows}
        columns={NutritionPlanColumns}
        data={serializedData}
        searchItem="nameData"
        filterName="Nutrition Plan"
      />
    </motion.div>
  );
};
