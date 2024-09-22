"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Label,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { useSessionsStore, useUser } from "@/hooks/store/user";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProgressCreateForm } from "../forms/create-Progress-form";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProgressData = {
  id: string;
  date: Date;
  weight: number | null;
  bodyFat: number | null;
  muscleMass: number | null;
  bmi: number | null;
  bmr: number | null;
  chest_weight: number | null;
  back_weight: number | null;
  deadlift_weight: number | null;
  squat_weight: number | null;
  shoulder_weight: number | null;
  bicep_weight: number | null;
  tricep_weight: number | null;
  core_weight: number | null;
  glute_weight: number | null;
  calf_weight: number | null;
  traps_weight: number | null;
  notes: string | null;
  userId: string;
};

export const MyProgressComponent = () => {
  const { user, progress } = useUser();
  const { sessions } = useSessionsStore();
  const [selectedExercise, setSelectedExercise] = useState("chest_weight");

  if (!user) {
    return (
      <div className="text-center p-4">
        Please log in to view your progress.
      </div>
    );
  }

  if (!progress || progress.length === 0) {
    return (
      <div className="text-center p-4">
        No progress data available. Start logging your progress!
      </div>
    );
  }

  const formatChartData = (data: ProgressData[]) => {
    return data.map((entry) => ({
      ...entry,
      date: format(new Date(entry.date), "MMM dd, yyyy"),
    }));
  };

  const chartData = formatChartData(progress);

  const chartConfig: ChartConfig = {
    weight: {
      label: "Weight",
      color: "hsl(var(--chart-3))",
    },
    bodyFat: {
      label: "Body Fat",
      color: "hsl(var(--chart-1))",
    },
    muscleMass: {
      label: "Muscle Mass",
      color: "hsl(var(--chart-2))",
    },
  };

  const latestProgress = progress[progress.length - 1];
  const calculatePercentage = (value: number, total: number) => {
    return total > 0 ? (value / total) * 100 : 0;
  };

  const bodyFatPercentage = calculatePercentage(
    latestProgress.bodyFat!,
    latestProgress.weight!
  );
  const muscleMassPercentage = calculatePercentage(
    latestProgress.muscleMass!,
    latestProgress.weight!
  );
  const otherPercentage = 100 - bodyFatPercentage - muscleMassPercentage;

  const bodyCompositionData = [
    {
      name: "Body Fat %",
      value: bodyFatPercentage,
      fill: "var(--color-bodyFat)",
    },
    {
      name: "Muscle Mass %",
      value: muscleMassPercentage,
      fill: "var(--color-muscleMass)",
    },
    {
      name: "Other",
      value: otherPercentage,
      fill: "var(--color-weight)",
    },
  ];

  const completedSessions = sessions?.filter(
    (session) => session.completed === true
  );

  const exerciseOptions = [
    { value: "chest_weight", label: "Chest" },
    { value: "back_weight", label: "Back" },
    { value: "deadlift_weight", label: "Deadlift" },
    { value: "squat_weight", label: "Squat" },
    { value: "shoulder_weight", label: "Shoulder" },
    { value: "bicep_weight", label: "Bicep" },
    { value: "tricep_weight", label: "Tricep" },
    { value: "core_weight", label: "Core" },
    { value: "glute_weight", label: "Glute" },
    { value: "calf_weight", label: "Calf" },
    { value: "traps_weight", label: "Traps" },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-2 space-y-8 md:space-y-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-full"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Body Composition</CardTitle>
            </CardHeader>
            <CardContent className="h-full my-auto self-center">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={bodyCompositionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                {latestProgress.weight?.toFixed(1)}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy! + 24}
                                className="fill-muted-foreground text-sm"
                              >
                                KG
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>

                  <Legend />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="weight">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="weight">Weight</TabsTrigger>
                  <TabsTrigger value="bodyFat">Body Fat</TabsTrigger>
                  <TabsTrigger value="muscleMass">Muscle Mass</TabsTrigger>
                </TabsList>
                {Object.keys(chartConfig).map((metric) => (
                  <TabsContent key={metric} value={metric}>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey={metric}
                            stroke={chartConfig[metric].color}
                            activeDot={{ r: 8 }}
                            connectNulls
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Workout Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {sessions?.length}
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
                value={(completedSessions?.length! / sessions?.length!) * 100}
                className="w-full sm:w-1/3"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Weight Lifting Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select
                onValueChange={setSelectedExercise}
                defaultValue={selectedExercise}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select exercise" />
                </SelectTrigger>
                <SelectContent>
                  {exerciseOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={selectedExercise}
                    stroke="hsl(var(--chart-3))"
                    activeDot={{ r: 8 }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full h-full"
      >
        <ProgressCreateForm />
      </motion.div>
    </div>
  );
};
