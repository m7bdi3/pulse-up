"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  "Personalized workout plans",
  "Custom nutrition guidance",
  "Progress tracking tools",
  "Community support",
  "Expert coaching",
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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export const StartJourney = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-xl mb-8">
              Join PulseUp and transform your fitness journey with personalized
              plans, expert guidance, and a supportive community.
            </p>
            <motion.ul
              className="space-y-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  variants={itemVariants}
                >
                  <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="bg-background text-foreground rounded-lg shadow-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Sign Up Now</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <Input id="name" name="name" type="text" required />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
