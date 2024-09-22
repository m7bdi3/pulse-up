"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChromeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { signIn } from "next-auth/react";
import { useUser } from "@/hooks/store/user";
import Link from "next/link";

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
  const { user } = useUser();

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
            className="bg-background text-foreground rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {!user ? (
              <>
                <Card className="flex flex-col items-center justify-center gap-2">
                  <CardHeader>
                    <h2 className="text-3xl font-black tracking-tighter text-center">
                      Sign In
                    </h2>
                    <p className="text-neutral-600">
                      Choose your preferred sign-in method.
                    </p>
                  </CardHeader>
                  <CardContent className="space-x-4 flex  items-center justify-center w-full">
                    <Button
                      variant="outline"
                      className="justify-center gap-3 "
                      onClick={() =>
                        signIn("google", { redirectTo: "/dashboard" })
                      }
                    >
                      <ChromeIcon className="h-6 w-6" />
                      Sign in with Google
                    </Button>
                  </CardContent>
                  <CardFooter className="text-center text-sm text-neutral-500">
                    By continuing, you agree to our Terms of Service and Privacy
                    Policy.
                  </CardFooter>
                </Card>
              </>
            ) : (
              <>
                <Link passHref href={"/pricing"}>
                  <Button className="w-full" variant={"outline"}>
                    See All Pricing
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StartJourney;
