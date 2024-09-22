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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md"
    >
      <div className="flex justify-end items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Workout Plan</DialogTitle>
            </DialogHeader>
            <WorkoutPlanCreateForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={WorkoutPlansColumns}
        data={serializedData}
        searchItem="nameData"
        filterName="Plan"
      />
    </motion.div>
  );
};
