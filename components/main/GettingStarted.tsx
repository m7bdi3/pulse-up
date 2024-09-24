"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Target, Dumbbell, LineChart } from "lucide-react";

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    title: "Sign Up and Create Your Profile",
    description:
      "Provide basic information to help us tailor your experience, including your fitness goals and preferences.",
    icon: UserPlus,
  },
  {
    title: "Set Your Fitness Goals",
    description:
      "Choose your primary objectives, such as losing weight, building muscle, or improving endurance.",
    icon: Target,
  },
  {
    title: "Get Personalized Workout and Nutrition Plans",
    description:
      "Receive customized workout routines and nutrition plans designed specifically for your goals.",
    icon: Dumbbell,
  },
  {
    title: "Track Your Progress and Adjust as Needed",
    description:
      "Use our real-time tracking tools to monitor your progress and make adjustments to your plan.",
    icon: LineChart,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -50 },
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

interface StepCardProps extends Step {
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({
  title,
  description,
  icon: Icon,
  index,
}) => (
  <motion.div
    className="flex flex-col items-center space-y-6 bg-card text-card-foreground p-6 rounded-lg shadow-md hover:scale-110"
    variants={itemVariants}
  >
    <div className="flex-shrink-0">
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">
        Step {index + 1}: {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export const GettingStarted: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Getting Started is Easy
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to begin your fitness journey with
            PulseUp.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GettingStarted;
