"use client";

import React, { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useUser } from "@/hooks/store/user";
import Link from "next/link";

export const Hero = () => {
  const { user } = useUser();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const scrollToNextSection = useCallback(() => {
    const nextSection = ref.current?.nextElementSibling as HTMLElement;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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

  const wordsVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    }),
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden min-h-screen flex items-center justify-center bg-[url(/hero.jpg)] bg-cover bg-center"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-yellow-100 dark:from-zinc-600 to-transparent" />
      <div className="container px-4 md:px-6 z-10">
        <motion.div
          className="grid gap-6 md:grid-cols-3 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="flex flex-col justify-center space-y-4 w-full col-span-2"
            style={{ y: textY }}
          >
            <motion.div className="space-y-12 w-full" variants={itemVariants}>
              <h1 className="text-7xl lg:text-[7rem] xl:text-[8rem] font-bold tracking-tighter text-center md:text-start w-full">
                {[
                  "Elevate",
                  "Your",
                  "Fitness",
                  "Journey",
                  "with",
                  "PulseUp",
                ].map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2 md:mr-4"
                    variants={wordsVariants}
                    custom={index}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="max-w-[600px] text-neutral-700 dark:text-neutral-300/80 text-base sm:text-lg md:text-xl font-semibold text-center md:text-start"
                variants={itemVariants}
              >
                Personalized Workouts, Real-Time Progress Tracking, and
                Nutrition Plans to Help You Reach Your Peak Performance. Start
                Your Transformation Today.
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 sm:flex-row"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto transition-all hover:shadow-lg text-base sm:text-lg md:text-base font-semibold"
              >
                <Link
                  href={user?.isSubscribed ? "/dashboard" : "/subscription"}
                >
                  {user?.isSubscribed ? "Continue" : "Start Now"}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-0 right-0 mx-auto w-10 h-10 flex items-center justify-center z-10 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </motion.section>
  );
};
