"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { ProgressSchema } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { SaveIcon, Calendar as CalendarIcon } from "lucide-react";
import CreateProgress from "@/actions/ProgressActions";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/hooks/store/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ProgressCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const [bodyFat, setBodyFat] = useState(0);
  const [muscleMass, setMuscleMass] = useState(0);

  const { user, addNewProgress } = useUser();

  const form = useForm<z.infer<typeof ProgressSchema>>({
    resolver: zodResolver(ProgressSchema),
    defaultValues: {
      weight: undefined,
      chest_weight: undefined,
      back_weight: undefined,
      deadlift_weight: undefined,
      squat_weight: undefined,
      shoulder_weight: undefined,
      bicep_weight: undefined,
      tricep_weight: undefined,
      traps_weight: undefined,
      core_weight: undefined,
      calf_weight: undefined,
      glute_weight: undefined,
      notes: "",
    },
  });

  const weight = form.watch("weight");

  function calculateBodyFat(
    weight: number,
    height: number,
    age: number,
    gender: string
  ): number {
    const bmi = weight / ((height / 100) * (height / 100));
    return gender === "Male"
      ? 1.2 * bmi + 0.23 * age - 16.2
      : 1.2 * bmi + 0.23 * age - 5.4;
  }

  function calculateMuscleMass(
    weight: number,
    height: number,
    age: number
  ): number {
    return 0.244 * weight + (7.8 * height) / 100 - 0.098 * age + 6.6;
  }

  useEffect(() => {
    if (weight && user?.height && user?.age && user?.gender) {
      const bodyFat = calculateBodyFat(
        weight,
        user.height,
        user.age,
        user.gender
      );
      const muscleMass = calculateMuscleMass(weight, user.height, user.age);
      setBodyFat(bodyFat);
      setMuscleMass(muscleMass);
    }
  }, [weight, user]);

  const onSubmit = async (values: z.infer<typeof ProgressSchema>) => {
    try {
      setLoading(true);
      const res = await CreateProgress(values);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else if (!res) {
        toast.error("Failed to update progress. Please try again.");
      } else {
        addNewProgress(res.progress!);
        toast.success("Progress updated successfully.");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while updating your progress.");
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (
    name: keyof z.infer<typeof ProgressSchema>,
    label: string
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              disabled={loading}
              type="number"
              step={0.1}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Log New Body Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderFormField("weight", "Weight")}

            <div className="grid grid-cols-2 gap-6">
              <FormItem>
                <FormLabel>Body Fat %</FormLabel>
                <Input
                  placeholder="Body Fat %"
                  disabled
                  value={bodyFat !== 0 ? bodyFat.toPrecision(4) : "Body Fat %"}
                />
              </FormItem>
              <FormItem>
                <FormLabel>Muscle Mass</FormLabel>
                <Input
                  placeholder="Muscle Mass"
                  disabled
                  value={
                    muscleMass !== 0
                      ? muscleMass.toPrecision(4)
                      : "Muscle Mass %"
                  }
                />
              </FormItem>
            </div>

            <Tabs defaultValue="upper">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upper">Upper Body</TabsTrigger>
                <TabsTrigger value="lower">Lower Body</TabsTrigger>
                <TabsTrigger value="core">Core</TabsTrigger>
              </TabsList>
              <TabsContent value="upper">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderFormField("chest_weight", "Chest Weight kg")}
                    {renderFormField("back_weight", "Back Weight kg")}
                    {renderFormField("shoulder_weight", "Shoulder Weight kg")}
                    {renderFormField("bicep_weight", "Biceps Weight kg")}
                    {renderFormField("tricep_weight", "Triceps Weight kg")}
                    {renderFormField("traps_weight", "Traps Weight kg")}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="lower">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderFormField("squat_weight", "Squat Weight kg")}
                    {renderFormField("deadlift_weight", "Deadlift Weight kg")}
                    {renderFormField("glute_weight", "Glutes Weight kg")}
                    {renderFormField("calf_weight", "Calfs Weight kg")}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="core">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderFormField("core_weight", "Core Weight kg")}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes here..."
                      disabled={loading}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              <SaveIcon className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Progress"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
