"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ClockIcon,
  ActivityIcon,
  CheckCircleIcon,
  InfoIcon,
  Repeat,
  Dumbbell,
  Flame,
  XCircleIcon,
} from "lucide-react";
import { useSessionsStore, useUser } from "@/hooks/store/user";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import CompleteSession from "@/actions/SessionsActioin";
import { toast } from "sonner";
import { ConfettiRef } from "@/components/ConfettiComponent";

export const WorkoutsComponent = () => {
  const { user, workoutPlan } = useUser();
  const { sessions, completeSession, unCompleteSession } = useSessionsStore();
  const [loading, setLoading] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const completedSessions = sessions?.filter(
    (session) => session.completed === true
  );

  const weekOneSessions =
    sessions?.filter((session) => session.week === 1) || [];
  const weekTwoSessions =
    sessions?.filter((session) => session.week === 2) || [];
  const weekThreeSessions =
    sessions?.filter((session) => session.week === 3) || [];
  const weekFourSessions =
    sessions?.filter((session) => session.week === 4) || [];

  const categorizedSessions = [
    weekOneSessions,
    weekTwoSessions,
    weekThreeSessions,
    weekFourSessions,
  ];

  if (!user || !workoutPlan || !sessions) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold mb-4">No Workout Plan</h2>
            <p className="text-muted-foreground mb-4">
              You don&apos;t have an active workout plan.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  const handleSubmit = async (id: string, name: string) => {
    setLoading(true);
    const givenSession = sessions.find((session) => session.id === id);

    const currentIndex = sessions.findIndex((session) => session.id === id);
    const hasUncompletedBefore = sessions
      .slice(0, currentIndex)
      .some((session) => !session.completed);

    if (hasUncompletedBefore) {
      toast.error("Please complete previous sessions before this one.");
      setLoading(false);
      return;
    }

    try {
      if (givenSession?.completed) {
        await unCompleteSession(givenSession.id);
        const res = await CompleteSession(id);
        if (res.error) {
          toast.error(`Error: ${res.error}`);
        } else {
          toast.success(`${name} marked as incomplete`);
        }
      } else {
        await completeSession(givenSession?.id!);
        const res = await CompleteSession(id);
        if (res.error) {
          toast.error(`Error: ${res.error}`);
        } else {
          confettiRef.current?.startConfetti();
          toast.success(`${name} updated successfully`);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(`An unexpected error occurred while updating the session.`);
    } finally {
      setLoading(false);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="container mx-auto p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card
          style={{
            backgroundImage: `url(${workoutPlan.workoutPlan.image})`,
          }}
          className="bg-cover bg-center rounded-lg"
        >
          <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 p-4">
            <CardHeader>
              <CardTitle>{workoutPlan.workoutPlan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {workoutPlan.workoutPlan.description}
              </p>
              <div className="grid grid-cols-3 items-center w-full  gap-4 mt-12">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Goal:</span>{" "}
                  <p className="text-muted-foreground">
                    {workoutPlan.workoutPlan.goal.replace("_", " ")}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-center mx-auto">
                  <span className="font-semibold">Difficulty:</span>{" "}
                  <p className="text-muted-foreground">
                    {workoutPlan.workoutPlan.difficulty}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-semibold">Duration:</span>{" "}
                  <p className="text-muted-foreground">
                    {workoutPlan.workoutPlan.duration} days
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {sessions.length}
                </Badge>
                <span className="text-muted-foreground">Total Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {completedSessions?.length}
                </Badge>
                <span className="text-muted-foreground">
                  Completed Sessions
                </span>
              </div>
              <Progress
                value={(completedSessions?.length! / sessions.length) * 100}
                className="w-full sm:w-1/3"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week1">
              <TabsList className="grid w-full grid-cols-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <TabsTrigger key={index} value={`week${index + 1}`}>
                    Week {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categorizedSessions.map((week, weekIndex) => (
                <TabsContent key={weekIndex} value={`week${weekIndex + 1}`}>
                  <>
                    <AnimatePresence>
                      {week.map((session, dayIndex) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: dayIndex * 0.1 }}
                        >
                          <Card className="mb-4 overflow-hidden">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex justify-between items-center">
                                <span>Day {weekIndex * 7 + dayIndex + 1}</span>
                                <Badge
                                  variant={
                                    session.completed ? "default" : "secondary"
                                  }
                                >
                                  {session.completed ? "Completed" : "Pending"}
                                </Badge>
                              </CardTitle>
                              <CardDescription>{session.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <ClockIcon className="mr-2 h-4 w-4" />
                                  <span>{session.duration} minutes</span>
                                </div>
                                <div className="flex items-center">
                                  <ActivityIcon className="mr-2 h-4 w-4" />
                                  <span>{session.type.replace(/_/g, " ")}</span>
                                </div>
                              </div>
                              <Progress
                                value={session.completed ? 100 : 0}
                                className="mb-4"
                              />
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {session.exercises.map((exercise) => (
                                  <Drawer key={exercise.exerciseId}>
                                    <DrawerTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full text-left justify-start hover:bg-primary/10 transition-colors"
                                      >
                                        <span className="truncate flex-1">
                                          {exercise.exercise.name}
                                        </span>
                                        <InfoIcon className="ml-2 h-4 w-4 flex-shrink-0" />
                                      </Button>
                                    </DrawerTrigger>
                                    <DrawerContent className="max-h-[90vh]">
                                      <DrawerHeader>
                                        <DrawerTitle className="text-2xl font-bold">
                                          {exercise.exercise.name}
                                        </DrawerTitle>
                                        <DrawerDescription className="flex items-center gap-2">
                                          <Badge variant="secondary">
                                            {exercise.exercise.bodyPart}
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="flex items-center gap-1"
                                          >
                                            <Flame className="h-3 w-3" />
                                            {
                                              exercise.exercise.caloriesBurned
                                            }{" "}
                                            kcal
                                          </Badge>
                                        </DrawerDescription>
                                      </DrawerHeader>
                                      <div className="px-4 py-2 overflow-y-auto">
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ duration: 0.5 }}
                                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                        >
                                          <div className="space-y-4 flex flex-col h-full items-center justify-center w-full">
                                            {exercise.exercise.images.map(
                                              (image, index) => (
                                                <motion.div
                                                  key={index}
                                                  initial={{
                                                    opacity: 0,
                                                    y: 20,
                                                  }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{
                                                    delay: index * 0.1,
                                                  }}
                                                >
                                                  <Image
                                                    src={image}
                                                    alt={`${
                                                      exercise.exercise.name
                                                    } - Image ${index + 1}`}
                                                    width={600}
                                                    height={300}
                                                    className="rounded-lg object-cover w-full h-full"
                                                  />
                                                </motion.div>
                                              )
                                            )}
                                          </div>
                                          <div className="space-y-4">
                                            <Card>
                                              <CardContent className="p-4">
                                                <h3 className="font-semibold mb-2">
                                                  Exercise Details
                                                </h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                  <div className="flex items-center gap-2">
                                                    <Dumbbell className="h-4 w-4 text-primary" />
                                                    <span>
                                                      {exercise.exercise.sets}{" "}
                                                      sets
                                                    </span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <Repeat className="h-4 w-4 text-primary" />
                                                    <span>
                                                      {
                                                        exercise.exercise
                                                          .repetitions
                                                      }{" "}
                                                      reps
                                                    </span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                    <ClockIcon className="h-4 w-4 text-primary" />
                                                    <span>
                                                      {
                                                        exercise.exercise
                                                          .duration
                                                      }{" "}
                                                      min
                                                    </span>
                                                  </div>
                                                </div>
                                              </CardContent>
                                            </Card>
                                            <Card>
                                              <CardContent className="p-4">
                                                <h3 className="font-semibold mb-2">
                                                  Equipment
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                  {exercise.exercise.equipment.map(
                                                    (item, index) => (
                                                      <Badge
                                                        key={index}
                                                        variant="secondary"
                                                      >
                                                        {item}
                                                      </Badge>
                                                    )
                                                  )}
                                                </div>
                                              </CardContent>
                                            </Card>
                                            <Card>
                                              <CardContent className="p-4">
                                                <h3 className="font-semibold mb-2">
                                                  Description
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                  {
                                                    exercise.exercise
                                                      .description
                                                  }
                                                </p>
                                              </CardContent>
                                            </Card>
                                          </div>
                                        </motion.div>
                                      </div>
                                      <DrawerFooter>
                                        <DrawerClose asChild>
                                          <Button
                                            variant="outline"
                                            className="w-full"
                                          >
                                            Close
                                          </Button>
                                        </DrawerClose>
                                      </DrawerFooter>
                                    </DrawerContent>
                                  </Drawer>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button
                                className="w-full"
                                variant={
                                  session.completed ? "secondary" : "default"
                                }
                                onClick={() => {
                                  handleSubmit(session.id, session.name);
                                }}
                                key={session.id}
                                disabled={loading}
                              >
                                <div
                                  className="flex items-center gap-2"
                                  key={`icon-${session.id}-${session.completed}`}
                                >
                                  {session.completed ? (
                                    <>
                                      <XCircleIcon
                                        className="mr-1 h-4 w-4"
                                        key={`XCircleIcon-${session.id}-${session.completed}`}
                                      />
                                      Mark as Incomplete
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircleIcon
                                        className="mr-1 h-4 w-4"
                                        key={`CheckCircleIcon-${session.id}-${session.completed}`}
                                      />
                                      Mark as Completed
                                    </>
                                  )}
                                </div>
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <Card className="mb-4 bg-muted">
                      <CardContent className="p-4">
                        <p className="text-center text-muted-foreground">
                          {7 - week.length} days break for recovery
                        </p>
                      </CardContent>
                    </Card>
                  </>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
