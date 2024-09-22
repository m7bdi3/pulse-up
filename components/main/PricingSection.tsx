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
        className={`h-full flex flex-col ${isPopular ? "border-primary" : ""}`}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
            {isPopular && (
              <Badge variant="secondary">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </Badge>
            )}
          </div>
          <CardDescription>
            {plan.duration === 0 ? "Lifetime access" : `${plan.duration} days`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-4xl font-bold mb-6">${plan.price}</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <Check className="text-green-500 mr-2 flex-shrink-0" />
              <span>Access to all workouts</span>
            </li>
            <li className="flex items-center">
              <Check className="text-green-500 mr-2 flex-shrink-0" />
              <span>Personalized training plans</span>
            </li>
            {plan.duration >= 360 && (
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 flex-shrink-0" />
                <span>Nutrition guidance</span>
              </li>
            )}
            {plan.duration === 0 && (
              <li className="flex items-center">
                <Check className="text-green-500 mr-2 flex-shrink-0" />
                <span>Lifetime updates</span>
              </li>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" onClick={onCheckOut}>
            Get Started
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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing to fit your fitness journey
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedPlans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isPopular={index === popularPlanIndex}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center mb-12"
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
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
