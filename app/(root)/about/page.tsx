"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Zap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Sarah is a certified personal trainer with over 15 years of experience in the fitness industry. She founded PulseUp with the vision of making personalized fitness accessible to everyone.",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Michael brings his expertise in AI and machine learning to PulseUp, developing cutting-edge algorithms for personalized workout and nutrition plans.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Nutrition",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Emily is a registered dietitian with a passion for helping people achieve their health goals through balanced nutrition and sustainable eating habits.",
  },
  {
    name: "David Kim",
    role: "Lead Fitness Trainer",
    image: "/placeholder.svg?height=300&width=300",
    bio: "David is an experienced fitness trainer specializing in strength training and HIIT workouts. He oversees the development of PulseUp's diverse workout library.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        className="space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="text-center" variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-4">About PulseUp</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            PulseUp is on a mission to revolutionize personal fitness by making
            expert-level training and nutrition guidance accessible to everyone,
            anywhere, anytime.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 text-primary" />
                  Empower Individuals
                </CardTitle>
              </CardHeader>
              <CardContent>
                We believe that everyone deserves access to high-quality fitness
                guidance. Our platform empowers individuals to take control of
                their health and achieve their fitness goals.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 text-primary" />
                  Innovate Fitness Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                By leveraging cutting-edge AI and machine learning, we&apos;re
                constantly innovating to provide the most effective and
                personalized fitness experience possible.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 text-primary" />
                  Foster Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                We&apos;re building a supportive community of fitness
                enthusiasts who motivate and inspire each other on their
                wellness journeys.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 text-primary" />
                  Promote Sustainable Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                Our approach focuses on long-term, sustainable health
                improvements rather than quick fixes, ensuring lasting results
                for our users.
              </CardContent>
            </Card>
          </div>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div key={member.name} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="relative w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                      <Image
                        src={"/hero.jpg"}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="text-center" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you&apos;re just starting your fitness journey or
            you&apos;re a seasoned athlete, PulseUp is here to support you every
            step of the way. Join our community today and experience the future
            of personalized fitness.
          </p>
          <Button size="lg" asChild>
            <a href="/signup">Get Started with PulseUp</a>
          </Button>
        </motion.section>
      </motion.div>
    </div>
  );
}
