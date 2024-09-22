"use client";

import React, { useState, useRef } from "react";
import CompleteSession from "@/actions/SessionsActioin";
import { motion } from "framer-motion";
import { useSessionsStore, useUser } from "@/hooks/store/user";
import Image from "next/image";
import { toast } from "sonner";

import {
  ActivityIcon,
  CheckCircleIcon,
  Clock,
  ClockIcon,
  Dumbbell,
  ArrowUp,
  Flame,
  Zap,
  Shield,
  Footprints,
  Shirt,
  InfoIcon,
  Repeat,
  XCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Confetti, { ConfettiRef } from "@/components/ConfettiComponent";

const exerciseIcons = {
  squat: Flame,
  deadlift: Zap,
  chest: Shield,
  back: ArrowUp,
  shoulder: Dumbbell,
  biceps: Dumbbell,
  triceps: Dumbbell,
  core: Shirt,
  glutes: Footprints,
  calf: Footprints,
  traps: Shirt,
};
export const SessionsComponent = () => {
  const { progress } = useUser();
  const { sessions, completeSession, unCompleteSession } = useSessionsStore();
  const [loading, setLoading] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  if (!sessions || !progress) {
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

  const upcomingSessions = sessions
    .filter((session) => session.completed === false)
    .slice(0, 5);

  const recordProgress = {
    chest_weight: Math.max(...progress.map((p) => p.chest_weight ?? 0)),
    back_weight: Math.max(...progress.map((p) => p.back_weight ?? 0)),
    deadlift_weight: Math.max(...progress.map((p) => p.deadlift_weight ?? 0)),
    squat_weight: Math.max(...progress.map((p) => p.squat_weight ?? 0)),
    shoulder_weight: Math.max(...progress.map((p) => p.shoulder_weight ?? 0)),
    bicep_weight: Math.max(...progress.map((p) => p.bicep_weight ?? 0)),
    tricep_weight: Math.max(...progress.map((p) => p.tricep_weight ?? 0)),
    core_weight: Math.max(...progress.map((p) => p.core_weight ?? 0)),
    glute_weight: Math.max(...progress.map((p) => p.glute_weight ?? 0)),
    calf_weight: Math.max(...progress.map((p) => p.calf_weight ?? 0)),
    traps_weight: Math.max(...progress.map((p) => p.traps_weight ?? 0)),
  };

  const maxWeight = Math.max(...Object.values(recordProgress));

  const totalWeight = progress.reduce((total, p) => {
    return (
      total +
      (p.squat_weight ?? 0) +
      (p.deadlift_weight ?? 0) +
      (p.chest_weight ?? 0) +
      (p.back_weight ?? 0) +
      (p.shoulder_weight ?? 0) +
      (p.bicep_weight ?? 0) +
      (p.tricep_weight ?? 0) +
      (p.core_weight ?? 0) +
      (p.glute_weight ?? 0) +
      (p.calf_weight ?? 0) +
      (p.traps_weight ?? 0)
    );
  }, 0);

  const renderExerciseItem = (
    name: string,
    weight: number,
    Icon: React.ElementType
  ) => (
    <motion.li
      className="flex flex-col space-y-2 p-4 rounded-lg bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-primary" />
          <span className="font-medium">{name}</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="secondary">{weight} kg</Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Personal Record for {name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Progress value={(weight / maxWeight) * 100} className="h-2" />
    </motion.li>
  );

  const latestSession = sessions.filter(
    (session) => session.completed === false
  )[0];

  const completedSessions = sessions.filter(
    (session) => session.completed === true
  );

  const handleSubmit = async (id: string, name: string) => {
    setLoading(true);
    const givenSession = sessions.find((session) => session.id === id);
    if (!givenSession) {
      toast.error("Session not found.");
      setLoading(false);
      return;
    }

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
      if (givenSession.completed === true) {
        unCompleteSession(givenSession.id);
        const res = await CompleteSession(id);
        if (res.error) {
          toast.error(`Error: ${res.error}`);
        } else {
          toast.success(`${name} marked as incomplete`);
        }
      } else {
        completeSession(givenSession.id);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background"
    >
      <Tabs defaultValue={"overview"} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-col justify-between p-2 bg-secondary rounded-md">
                  <div className="w-full flex items-center justify-between py-4 px-2">
                    <p className="font-semibold">{latestSession.name}</p>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <ClockIcon className="mr-2 h-4 w-4" />
                      <span>{latestSession.duration} minutes</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Flame className="h-4 w-4" />
                      {latestSession.caloriesBurned} kcal
                    </Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {latestSession.exercises.map((exercise) => (
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
                        <DrawerContent>
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
                                {exercise.exercise.caloriesBurned} kcal
                              </Badge>
                            </DrawerDescription>
                          </DrawerHeader>

                          <div
                            className="h-full max-h-[calc(90vh-4rem)] overflow-auto p-2"
                            data-vaul-no-drag
                          >
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
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
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
                                          {exercise.exercise.sets} sets
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Repeat className="h-4 w-4 text-primary" />
                                        <span>
                                          {exercise.exercise.repetitions} reps
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>
                                          {exercise.exercise.duration} min
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
                                            {item.replaceAll("_", " ")}
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
                                      {exercise.exercise.description}
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            </motion.div>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button className="w-full" variant={"outline"}>
                                Close
                              </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {upcomingSessions.map((session, index) => (
                    <motion.li
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {session.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <ClockIcon className="h-3 w-3" />
                            <span>{session.duration} minutes</span>
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <ActivityIcon className="h-3 w-3" />
                            <span>{session.type.replace(/_/g, " ")}</span>
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant={session.completed ? "secondary" : "default"}
                        onClick={() => handleSubmit(session.id, session.name)}
                        disabled={loading}
                        className="w-full sm:w-auto"
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

                      <Confetti ref={confettiRef} />
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Name</TableHead>
                    <TableHead>Exercises</TableHead>
                    <TableHead>Duration (min)</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Completed At</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.name}</TableCell>
                      <TableCell>{session.exercises.length}</TableCell>
                      <TableCell>{session.duration}</TableCell>
                      <TableCell>{session.caloriesBurned}</TableCell>
                      <TableCell>{format(session.updatedAt, "Pp")}</TableCell>
                      <TableCell>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="h-8 w-8"
                          onClick={() => handleSubmit(session.id, session.name)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center space-x-2">
                <Dumbbell className="w-6 h-6" />
                <span>Personal Records</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderExerciseItem(
                  "Squat",
                  recordProgress.squat_weight,
                  exerciseIcons.squat
                )}
                {renderExerciseItem(
                  "Deadlift",
                  recordProgress.deadlift_weight,
                  exerciseIcons.deadlift
                )}
                {renderExerciseItem(
                  "Chest",
                  recordProgress.chest_weight,
                  exerciseIcons.chest
                )}
                {renderExerciseItem(
                  "Back",
                  recordProgress.back_weight,
                  exerciseIcons.back
                )}
                {renderExerciseItem(
                  "Shoulder",
                  recordProgress.shoulder_weight,
                  exerciseIcons.shoulder
                )}
                {renderExerciseItem(
                  "Biceps",
                  recordProgress.bicep_weight,
                  exerciseIcons.biceps
                )}
                {renderExerciseItem(
                  "Triceps",
                  recordProgress.tricep_weight,
                  exerciseIcons.triceps
                )}
                {renderExerciseItem(
                  "Core",
                  recordProgress.core_weight,
                  exerciseIcons.core
                )}
                {renderExerciseItem(
                  "Glutes",
                  recordProgress.glute_weight,
                  exerciseIcons.glutes
                )}
                {renderExerciseItem(
                  "Calf",
                  recordProgress.calf_weight,
                  exerciseIcons.calf
                )}
                {renderExerciseItem(
                  "Traps",
                  recordProgress.traps_weight,
                  exerciseIcons.traps
                )}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Total Volume Lifted</span>
                    <span>{totalWeight} kg</span>
                  </div>
                  <Progress value={(totalWeight / 1000) * 100} />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Session Completion Rate</span>
                    <span>
                      {(
                        (completedSessions.length / sessions.length) *
                        100
                      ).toPrecision(3)}{" "}
                      %
                    </span>
                  </div>
                  <Progress
                    value={(completedSessions.length / sessions.length) * 100}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
