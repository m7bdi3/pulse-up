"use client";

import React from "react";
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
import { DifficultyLevel } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { WorkoutPlansColumns } from "@/app/(protected)/admin/workout-plans/_components/columns";
import { WorkoutPlanCreateForm } from "../forms/create-workout-form";
import { toast } from "sonner";
import { DeleteWorkoutPlan } from "@/actions/WorkoutPlansActions";
import { useModalStore } from "@/hooks/store/use-store-modal";

interface Props {
  data: {
    id: string;
    name: string;
    description: string | null;
    goal: string | null;
    difficulty: DifficultyLevel;
    duration: number | null;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export const WorkOutPlansComponent = ({ data }: Props) => {
  const { openWorkoutplanForm } = useModalStore();
  const serializedData = data.map((item) => ({
    id: item.id,
    nameData: {
      name: item.name,
      image: item.image,
    },
    difficulty: item.difficulty,
    goal: item.goal,
    duration: item.duration,
  }));
  const handleDeleteRows = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => DeleteWorkoutPlan(id)));
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
      <div className="flex justify-end items-center mb-6">
        <Button onClick={openWorkoutplanForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Plan
        </Button>
      </div>
      <DataTable
        onDeleteRows={handleDeleteRows}
        columns={WorkoutPlansColumns}
        data={serializedData}
        searchItem="nameData"
        filterName="Plan"
      />
    </motion.div>
  );
};
