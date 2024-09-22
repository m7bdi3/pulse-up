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
import { Exercise } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ExerciseColumns } from "@/app/(protected)/admin/exercise/_components/columns";
import { ExerciseCreateForm } from "../forms/create-exercise-form";

interface Props {
  data: Exercise[];
}

export const ExercisesComponent = ({ data }: Props) => {
  const serializedData = data.map((item) => ({
    id: item.id,
    nameData: {
      name: item.name,
      images: item.images,
    },
    category: item.category,
    amount: {
      duration: item.duration,
      repetitions: item.repetitions,
      sets: item.sets,
    },
    equipment: item.equipment,
  }));
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Exercises</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Exercise
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Exercise</DialogTitle>
            </DialogHeader>
            <ExerciseCreateForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={ExerciseColumns}
        data={serializedData}
        searchItem="nameData"
        filterName="Exercise"
      />
    </motion.div>
  );
};
