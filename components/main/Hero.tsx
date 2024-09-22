"use client";

import React, { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TransitionLink } from "@/components/LinkTransition";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDownCircleIcon } from "lucide-react";

export const Hero = () => {
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
      className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden h-screen flex items-center justify-center bg-[url(/hero.jpg)] bg-cover"
    >
      <div className="absolute bottom-8 left-0 right-0 mx-auto w-full flex flex-col items-center justify-center gap-4 z-10">
        <ChevronDownCircleIcon
          className="h-10 w-10 cursor-pointer text-primary animate-bounce"
          onClick={scrollToNextSection}
        />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-r from-yellow-100 dark:from-zinc-600 to-transparent " />
      <div className="container px-4 md:px-6 z-10">
        <motion.div
          className="grid gap-6 md:grid-cols-3 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            className="flex flex-col justify-center space-y-4 w-full col-span-2"
            style={{ y: textY }}
          >
            <motion.div
              className="space-y-12 w-full"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.h1
                className="text-7xl font-bold tracking-tighter lg:text-8xl text-center md:text-start w-full"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
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
                    className="inline-block mr-4"
                    variants={wordsVariants}
                    custom={index}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-neutral-700 dark:text-neutral-300/80 text-lg font-semibold md:text-xl text-center md:text-start"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                Personalized Workouts, Real-Time Progress Tracking, and
                Nutrition Plans to Help You Reach Your Peak Performance. Start
                Your Transformation Today.
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-2 sm:flex-row"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto transition-all hover:shadow-lg text-lg md:text-base font-semibold"
              >
                <TransitionLink href="/shop">
                  Start Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </TransitionLink>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
