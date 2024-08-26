"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, LineChart, Utensils, Target, Users } from "lucide-react";

const features = [
  {
    title: "Personalized Workout Plans",
    description:
      "Tailored workout routines designed to fit your specific goals, whether it's weight loss, muscle gain, or overall fitness.",
    icon: Dumbbell,
  },
  {
    title: "Real-Time Progress Tracking",
    description:
      "Monitor your progress with detailed metrics on your workouts, body measurements, and overall performance.",
    icon: LineChart,
  },
  {
    title: "Tailored Nutrition Plans",
    description:
      "Custom meal plans aligned with your fitness goals, helping you achieve better results faster.",
    icon: Utensils,
  },
  {
    title: "Goal-Oriented Programs",
    description:
      "Structured programs that guide you step-by-step towards achieving your fitness milestones.",
    icon: Target,
  },
  {
    title: "Community Support",
    description:
      "Connect with a supportive community of like-minded individuals to stay motivated and accountable.",
    icon: Users,
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

const FeatureCard = ({ title, description, icon: Icon }: any) => (
  <motion.div
    className="bg-card text-card-foreground rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
    variants={itemVariants}
  >
    <div className="bg-primary/10 p-3 rounded-full mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export const WhyPulseUp = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why PulseUp?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how PulseUp can transform your fitness journey with
            personalized plans and cutting-edge features.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
