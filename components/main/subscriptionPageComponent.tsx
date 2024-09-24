"use client";

import React, { useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ArrowRight, Zap, Shield, Headphones } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
          <Button
            className="w-full"
            size="lg"
            onClick={onCheckOut}
            disabled={pending}
          >
            {pending ? "Processing" : "Get Started"}
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

const FeatureComparison = ({ plans }: { plans: Plan[] }) => {
  const features = [
    "Access to all workouts",
    "Personalized training plans",
    "Nutrition guidance",
    "Progress tracking",
    "Community access",
    "1-on-1 coaching sessions",
    "Exclusive content",
    "Priority support",
  ];

  return (
    <div className="overflow-x-auto mb-12 border">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 bg-muted">Feature</th>
            {plans.map((plan) => (
              <th key={plan.id} className="text-center p-2 bg-muted">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
              <td className="p-2">{feature}</td>
              {plans.map((plan) => (
                <td key={plan.id} className="text-center p-2">
                  {index < 5 || plan.duration === 0 ? (
                    <Check className="inline-block text-green-500" />
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to your plan until the end of your billing period.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "We offer a 7-day free trial for new users. You can explore all features of our Premium plan during this period.",
    },
    {
      question: "How do the personalized training plans work?",
      answer:
        "Our AI-powered system creates a custom plan based on your fitness level, goals, and available equipment. The plan adapts as you progress.",
    },
    {
      question: "Can I switch between plans?",
      answer:
        "You can upgrade or downgrade your plan at any time. The changes will take effect at the start of your next billing cycle.",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const SubscriptionPageComponent: React.FC<Props> = ({ plans }) => {
  if (!Array.isArray(plans)) {
    return <p>No plans available.</p>;
  }

  const sortedPlans = [...plans].sort((a, b) => a.price - b.price);
  const popularPlanIndex = sortedPlans.length > 1 ? 1 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
              Unlock Your Fitness Potential
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan to transform your body and mind
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {plans.map((plan, index) => (
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
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Why Choose PulseUp?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Zap,
                  title: "Personalized Workouts",
                  description: "AI-powered plans tailored to your goals",
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your data is always protected",
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  description: "Expert help whenever you need it",
                },
                {
                  icon: ArrowRight,
                  title: "Continuous Progress",
                  description: "Adaptive plans that grow with you",
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <item.icon className="w-10 h-10 mb-2 text-primary" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <FAQ />
          </motion.div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FeatureComparison plans={sortedPlans} />
            </motion.div>
          </AnimatePresence>

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
    </div>
  );
};
