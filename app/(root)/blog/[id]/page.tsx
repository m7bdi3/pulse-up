"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

const blogPost: BlogPost = {
  id: "1",
  title: "10 Essential Exercises for Building Core Strength",
  content: `
    <p>A strong core is the foundation of a fit and healthy body. It not only helps improve your posture and balance but also enhances your overall athletic performance. In this blog post, we'll explore 10 essential exercises that will help you build a rock-solid core.</p>

    <h2>1. Plank</h2>
    <p>The plank is a fundamental exercise that engages multiple muscle groups in your core. To perform a plank:</p>
    <ul>
      <li>Start in a push-up position with your forearms on the ground</li>
      <li>Keep your body in a straight line from head to heels</li>
      <li>Hold this position for 30-60 seconds</li>
    </ul>

    <h2>2. Russian Twists</h2>
    <p>Russian twists target your obliques and help improve rotational strength. Here's how to do them:</p>
    <ul>
      <li>Sit on the floor with your knees bent and feet lifted slightly off the ground</li>
      <li>Lean back slightly, keeping your back straight</li>
      <li>Clasp your hands together and twist your torso from side to side</li>
    </ul>

    <h2>3. Dead Bug</h2>
    <p>The dead bug exercise is excellent for improving core stability and coordination. To perform this exercise:</p>
    <ul>
      <li>Lie on your back with your arms extended towards the ceiling</li>
      <li>Lift your legs so that your knees are directly over your hips</li>
      <li>Slowly lower your right arm behind your head while extending your left leg</li>
      <li>Return to the starting position and repeat on the opposite side</li>
    </ul>

    <p>Incorporate these exercises into your routine 2-3 times a week, and you'll be on your way to developing a stronger, more stable core. Remember to maintain proper form and breathe steadily throughout each exercise.</p>
  `,
  author: {
    name: "Jane Doe",
    avatar: "/hero.jpg",
  },
  date: "2023-05-15",
  category: "Fitness",
  imageUrl: "/hero.jpg",
  readTime: 5,
};

export default function BlogPostPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Badge className="mb-2">{blogPost.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{blogPost.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{blogPost.date}</span>
              </div>
            </div>
          </header>

          <div className="relative h-[400px] mb-8">
            <Image
              src={blogPost.imageUrl}
              alt={blogPost.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <footer className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={blogPost.author.avatar}
                      alt={blogPost.author.name}
                    />
                    <AvatarFallback>
                      {blogPost.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">About the Author</CardTitle>
                    <CardDescription>{blogPost.author.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  Jane Doe is a certified fitness instructor with over 10 years
                  of experience in personal training and nutrition coaching.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  <User className="mr-2 h-4 w-4" />
                  Follow
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </footer>
        </article>
      </motion.div>
    </div>
  );
}
