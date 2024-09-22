"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DataTable } from "@/components/DataTable";
import { SessionsColumns } from "@/app/(protected)/admin/training-sessions/_components/columns";
import { SessionCreateForm } from "../forms/create-session-form";
import {
  BodyPart,
  DifficultyLevel,
  ExerciseCategory,
  ExerciseEquipment,
  Goal,
} from "@prisma/client";

interface Props {
  data: {
    id: string;
    name: string;
    description: string | null;
    goal: Goal;
    difficulty: DifficultyLevel;
    duration: number | null;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    sessions: {
      id: string;
      name: string;
      startDate: Date | null;
      duration: number;
      caloriesBurned: number | null;
      feedback: string[];
      workoutPlanId: string | null;
      exercises: {
        sessionId: string;
        exerciseId: string;
        exercise: {
          id: string;
          name: string;
          description: string | null;
          duration: number | null;
          repetitions: number | null;
          bodyPart: BodyPart;
          sets: number | null;
          images: string[];
          equipment: ExerciseEquipment[];
          category: ExerciseCategory;
        };
      }[];
    }[];
  }[];

  Exercises: {
    id: string;
    name: string;
  }[];
}

export const SessionsComponent = ({ data, Exercises }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md"
    >
      <div className="space-y-20">
        {data.map((plan) => {
          const serializedData = plan.sessions.map((item) => ({
            id: item.id,
            name: item.name,
            caloriesBurned: item.caloriesBurned,
            duration: item.duration,
            feedback: item.feedback,
            exercises: item.exercises,
          }));
          return (
            <div className="flex flex-col gap-4" key={plan.id}>
              <div className="flex w-full items-center justify-between">
                <h2 className="text-2xl font-bold">{plan.name}</h2>{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Sessions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <SessionCreateForm
                      workout={{
                        id: plan.id,
                        name: plan.name,
                        duration: plan.duration,
                      }}
                      Exercises={Exercises}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable
                columns={SessionsColumns}
                data={serializedData}
                searchItem="name"
                filterName="Session"
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
