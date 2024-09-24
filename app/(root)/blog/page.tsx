"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

const dummyPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Essential Exercises for Building Core Strength",
    excerpt:
      "Discover the key exercises that will help you develop a strong and stable core...",
    author: "Jane Doe",
    date: "2023-05-15",
    category: "Fitness",
    imageUrl: "/hero.jpg",
    readTime: 5,
  },
  {
    id: "2",
    title: "The Ultimate Guide to Meal Prepping for Busy Professionals",
    excerpt:
      "Learn how to efficiently plan and prepare your meals for the week ahead...",
    author: "John Smith",
    date: "2023-05-10",
    category: "Nutrition",
    imageUrl: "/hero.jpg",
    readTime: 8,
  },
  {
    id: "3",
    title: "How to Stay Motivated on Your Fitness Journey",
    excerpt:
      "Discover proven strategies to keep yourself motivated and committed to your fitness goals...",
    author: "Emily Johnson",
    date: "2023-05-05",
    category: "Motivation",
    imageUrl: "/hero.jpg",
    readTime: 6,
  },
  {
    id: "4",
    title: "The Benefits of High-Intensity Interval Training (HIIT)",
    excerpt:
      "Explore the numerous advantages of incorporating HIIT workouts into your fitness routine...",
    author: "Michael Brown",
    date: "2023-04-30",
    category: "Workouts",
    imageUrl: "/hero.jpg",
    readTime: 7,
  },
  {
    id: "5",
    title: "Understanding Macronutrients: A Beginner's Guide",
    excerpt:
      "Learn the basics of macronutrients and how to balance them for optimal health and fitness...",
    author: "Sarah Wilson",
    date: "2023-04-25",
    category: "Nutrition",
    imageUrl: "/hero.jpg",
    readTime: 10,
  },
];

const itemsPerPage = 4;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = dummyPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const featuredPost = dummyPosts[0];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <h1 className="text-6xl font-bold mb-8 text-center">PulseUp Blog</h1>

      <div className="mb-8 mx-auto">
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {currentPage === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <div className="md:flex">
              <div className="md:w-2/3 relative h-64 md:h-auto">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              <div className="md:w-1/3 p-6">
                <Badge>{featuredPost.category}</Badge>
                <CardTitle className="mt-2 mb-2">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription>{featuredPost.excerpt}</CardDescription>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    By {featuredPost.author} | {featuredPost.date}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {featuredPost.readTime} min read
                  </p>
                </div>
                <Button asChild className="mt-4">
                  <Link href={`/blog/${featuredPost.id}`}>Read More</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge>{post.category}</Badge>
                  <p className="text-sm text-muted-foreground">
                    {post.readTime} min read
                  </p>
                </div>
                <CardTitle className="mt-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm text-muted-foreground">
                    By {post.author} | {post.date}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center my-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="mx-4 flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
