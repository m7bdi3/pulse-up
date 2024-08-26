"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "PulseUp helped me lose 20 pounds in 3 months! The personalized plans and community support kept me motivated every step of the way.",
    name: "Sarah Johnson",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "I never thought I could gain so much muscle at my age. PulseUp's tailored programs made it possible.",
    name: "Michael Chen",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The progress tracking feature is amazing. Seeing my improvements week by week keeps me pushing harder.",
    name: "Emily Rodriguez",
    image: "/placeholder.svg?height=80&width=80",
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

const TestimonialCard = ({ quote, name, image }: any) => (
  <motion.div
    className="bg-card text-card-foreground rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
    variants={itemVariants}
  >
    <Quote className="h-8 w-8 text-primary mb-4" />
    <p className="text-lg mb-4">{quote}</p>
    <div className="flex items-center">
      <Image
        src={image}
        alt={name}
        width={40}
        height={40}
        className="rounded-full mr-3"
      />
      <span className="font-semibold">{name}</span>
    </div>
  </motion.div>
);

export const SuccessStories = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Success Stories
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our users who have transformed their lives with PulseUp.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
