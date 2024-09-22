"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Dumbbell, Scale, Trophy, Camera } from "lucide-react";

const socialProof = [
  { icon: Users, label: "Active Users", value: "500K+" },
  { icon: Dumbbell, label: "Workouts Completed", value: "10M+" },
  { icon: Scale, label: "Pounds Lost", value: "2M+" },
];

const userContent = [
  {
    image: "/placeholder.svg?height=300&width=300",
    alt: "User progress photo 1",
  },
  {
    image: "/placeholder.svg?height=300&width=300",
    alt: "User progress photo 2",
  },
  {
    image: "/placeholder.svg?height=300&width=300",
    alt: "User progress photo 3",
  },
];

const achievements = [
  {
    icon: Trophy,
    title: "Monthly Challenges",
    description: "Compete in our themed monthly fitness challenges",
  },
  {
    icon: Users,
    title: "Leaderboards",
    description: "See how you stack up against other community members",
  },
  {
    icon: Camera,
    title: "Community Events",
    description: "Join virtual and local meetups with fellow PulseUp users",
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

const SocialProofItem = ({ icon: Icon, label, value }: any) => (
  <motion.div className="flex flex-col items-center" variants={itemVariants}>
    <Icon className="h-8 w-8 text-primary mb-2" />
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </motion.div>
);

const UserContentItem = ({ image, alt }: any) => (
  <motion.div className="relative h-40 w-40" variants={itemVariants}>
    <Image src={image} alt={alt} fill className="object-cover rounded-lg" />
  </motion.div>
);

const AchievementItem = ({ icon: Icon, title, description }: any) => (
  <motion.div className="flex items-start space-x-4" variants={itemVariants}>
    <div className="bg-primary/10 p-3 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export const JoinCommunity = () => {
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
            Join the PulseUp Community
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of a thriving community that supports and motivates each
            other to achieve fitness goals.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {socialProof.map((item, index) => (
            <SocialProofItem key={index} {...item} />
          ))}
        </motion.div>

        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            User-Generated Content
          </h3>
          <div className="flex justify-center space-x-4">
            {userContent.map((item, index) => (
              <UserContentItem key={index} {...item} />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Community Achievements
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {achievements.map((item, index) => (
              <AchievementItem key={index} {...item} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinCommunity;
