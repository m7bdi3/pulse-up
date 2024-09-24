"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Exercise } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { ExerciseColumns } from "@/app/(protected)/admin/exercise/_components/columns";
import { DeleteExercise } from "@/actions/ExerciseActions";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-store-modal";

interface Props {
  data: Exercise[];
}

export const ExercisesComponent = ({ data }: Props) => {
  const { openExerciseForm } = useModalStore();
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
  const handleDeleteRows = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => DeleteExercise(id)));
      toast.success(`Successfully deleted ${ids.length} exercise(s)`);
    } catch (error) {
      console.error("Error deleting exercises:", error);
      toast.error("Failed to delete one or more exercise");
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
        <h2 className="text-2xl font-bold">Exercises</h2>
        <Button onClick={openExerciseForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Exercise
        </Button>
      </div>
      <DataTable
        onDeleteRows={handleDeleteRows}
        columns={ExerciseColumns}
        data={serializedData}
        searchItem="nameData"
        filterName="Exercise"
      />
    </motion.div>
  );
};
