"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Utensils, Timer } from "lucide-react";
import {
  useNutriotionPlansStore,
  useWorkoutPlansStore,
} from "@/hooks/store/user";
import { Badge } from "@/components/ui/badge";
import { NutritionPlan, WorkoutPlan } from "@prisma/client";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

interface ProgramCardProps {
  id: string;
  name: string;
  description: string | null;
  image: string;
  duration?: number | null;
  difficulty?: string;
  type?: string;
  goal?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  name,
  description,
  image,
  duration,
  difficulty,
  type,
  goal,
}) => (
  <motion.div
    className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
    variants={itemVariants}
  >
    <div className="relative h-48">
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="flex flex-wrap gap-2 mt-4 items-center justify-center ">
        {duration && (
          <Badge variant="secondary" className="flex items-center">
            <Timer className="h-4 w-4 mr-1" />
            {duration} days
          </Badge>
        )}
        {difficulty && <Badge variant="outline">{difficulty}</Badge>}
        {type && <Badge variant="outline">{type}</Badge>}
        {goal && <Badge variant="outline">{goal.replaceAll("_", " ")}</Badge>}
      </div>
    </div>
  </motion.div>
);

export const ExplorePrograms: React.FC = () => {
  const { nutritionPlans } = useNutriotionPlansStore();
  const { WorkoutPlans } = useWorkoutPlansStore();

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Explore Our Programs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of workout routines and nutrition plans
            tailored to your fitness goals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold flex items-center">
                <Dumbbell className="mr-2 h-6 w-6" />
                Workout Programs
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {WorkoutPlans?.slice(0, 6).map((routine: WorkoutPlan) => (
                <ProgramCard
                  key={routine.id}
                  id={routine.id}
                  name={routine.name}
                  description={routine.description}
                  image={routine.image}
                  duration={routine.duration}
                  difficulty={routine.difficulty}
                  goal={routine.goal}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold flex items-center">
                <Utensils className="mr-2 h-6 w-6" />
                Nutrition Plans
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {nutritionPlans?.map((plan: NutritionPlan) => (
                <ProgramCard
                  key={plan.id}
                  id={plan.id}
                  name={plan.name}
                  description={plan.description}
                  image={plan.image}
                  type="Nutrition"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExplorePrograms;

// viewport={{ once: false, amount: 0.2 }}
