"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const workoutRoutines = [
  {
    title: "30-Day Fat Burn",
    description: "Intensive cardio and strength training to shed pounds fast.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "30 days",
    difficulty: "Intermediate",
  },
  {
    title: "Muscle Building Mastery",
    description: "Progressive overload program for serious muscle gains.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "12 weeks",
    difficulty: "Advanced",
  },
  {
    title: "Beginner's Total Body",
    description: "Full-body workouts perfect for fitness newcomers.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "8 weeks",
    difficulty: "Beginner",
  },
];

const nutritionPlans = [
  {
    title: "Keto for Beginners",
    description:
      "Low-carb, high-fat meal plans to kickstart your keto journey.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "4 weeks",
    type: "Ketogenic",
  },
  {
    title: "Balanced Diet for Muscle Gain",
    description: "Protein-rich meals to support your muscle-building goals.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "12 weeks",
    type: "High Protein",
  },
  {
    title: "Plant-Based Performance",
    description: "Vegan meal plans optimized for athletic performance.",
    image: "/placeholder.svg?height=200&width=300",
    duration: "8 weeks",
    type: "Vegan",
  },
];

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

const ProgramCard = ({
  title,
  description,
  image,
  duration,
  difficulty,
  type,
}: any) => (
  <motion.div
    className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
    variants={itemVariants}
  >
    <Image
      src={image}
      alt={title}
      width={300}
      height={200}
      className="w-full object-cover h-48"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{duration}</span>
        <span className="text-sm font-medium">{difficulty || type}</span>
      </div>
    </div>
  </motion.div>
);

export const ExplorePrograms = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Explore Our Programs
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of workout routines and nutrition plans
            tailored to your fitness goals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold flex items-center">
                <Dumbbell className="mr-2 h-6 w-6" />
                Popular Workout Routines
              </h3>
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {workoutRoutines.map((routine, index) => (
                <ProgramCard key={index} {...routine} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold flex items-center">
                <Utensils className="mr-2 h-6 w-6" />
                Nutrition Plans
              </h3>
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {nutritionPlans.map((plan, index) => (
                <ProgramCard key={index} {...plan} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExplorePrograms;
