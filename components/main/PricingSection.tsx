"use client";

import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createStripeUrl } from "@/actions/user_subs";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface Props {
  plans: Plan[];
}

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

const PlanFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-center">
    <Check className="text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
    <span>{children}</span>
  </li>
);

const PlanCard = ({ plan, isPopular }: { plan: Plan; isPopular: boolean }) => {
  const [pending, startTransition] = useTransition();

  const onCheckOut = async () => {
    if (pending) return;

    startTransition(() => {
      createStripeUrl(plan.id)
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() =>
          toast.error("Something went wrong, please try again later!")
        );
    });
  };

  return (
    <motion.div variants={itemVariants}>
      <Card
        className={`h-full flex flex-col relative w-full ${
          isPopular ? "border-primary" : ""
        }`}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
            {isPopular && (
              <Badge
                variant="secondary"
                className="absolute -top-4 right-4 h-8"
              >
                <Star className="w-4 h-4 mr-1" aria-hidden="true" />
                Most Popular
              </Badge>
            )}
          </div>
          <CardDescription>
            {plan.duration === 0 ? "Lifetime access" : `${plan.duration} days`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-4xl font-bold mb-6">
            ${plan.price.toFixed(2)}
            <span className="text-base font-normal text-muted-foreground">
              {plan.duration !== 0 && "/m"}
            </span>
          </p>
          <ul className="space-y-2 mb-6">
            <PlanFeature>Access to all workouts</PlanFeature>
            <PlanFeature>Personalized training plans</PlanFeature>
            {plan.duration >= 360 && (
              <PlanFeature>Nutrition guidance</PlanFeature>
            )}
            {plan.duration === 0 && <PlanFeature>Lifetime updates</PlanFeature>}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={onCheckOut}
            disabled={pending}
          >
            {pending ? "Processing..." : "Get Started"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Testimonial = ({ quote, author }: { quote: string; author: string }) => (
  <motion.div variants={itemVariants}>
    <Card>
      <CardContent className="pt-6">
        <p className="italic mb-4">&ldquo;{quote}&rdquo;</p>
        <p className="font-semibold text-right">- {author}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export const PricingSection: React.FC<Props> = ({ plans }) => {
  if (!Array.isArray(plans)) {
    return <p>No plans available.</p>;
  }
  const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
  const popularPlanIndex = sortedPlans.length > 1 ? 1 : 0;

  return (
    <section className="py-16 md:py-24 bg-background min-h-screen flex items-center justify-center">
      <div className="w-full">
        <motion.div
          className="text-center pb-16 md:pb-24 container mx-auto "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing to fit your fitness journey
          </p>
        </motion.div>

        <motion.div
          className=" mb-12 bg-muted w-full py-12 px-4 lg:px-12 bg-gradient-to-bl from-yellow-200 via-neutral-800 to-black "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container grid gap-8 md:grid-cols-3 ">
            {sortedPlans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isPopular={index === popularPlanIndex}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-12 container mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            All plans come with a 7-day money-back guarantee. No questions
            asked.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 container mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Testimonial
            quote="PulseUp's Pro plan has transformed my fitness routine. The personalized training plans are a game-changer!"
            author="Sarah J., Pro User"
          />
          <Testimonial
            quote="I started with the Basic plan and saw great results. Upgrading to Premium took my fitness to the next level."
            author="Mike T., Premium User"
          />
          <Testimonial
            quote="The nutrition guidance in the Premium plan has helped me achieve my weight loss goals faster than I ever thought possible."
            author="Emily R., Premium User"
          />
        </motion.div>
      </div>
    </section>
  );
};
