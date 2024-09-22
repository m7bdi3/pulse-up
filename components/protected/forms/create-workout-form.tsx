"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardContent } from "@/components/ui/card";
import { WorkoutPlanSchema } from ".";
import { DifficultyLevel } from "@prisma/client";

import { Textarea } from "@/components/ui/textarea";
import { CreateWorkoutPlan } from "@/actions/WorkoutPlansActions";

export const WorkoutPlanCreateForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof WorkoutPlanSchema>>({
    resolver: zodResolver(WorkoutPlanSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
      duration: undefined,
      image: undefined,
      difficulty: undefined,
      goal: undefined,
    },
  });
  const DifficultyValues = Object.values(DifficultyLevel);

  const onSubmit = async (values: z.infer<typeof WorkoutPlanSchema>) => {
    try {
      setLoading(true);
      const res = await CreateWorkoutPlan(values);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Food created successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="p-2 space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name your plan"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Choose Exercise category</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    {DifficultyValues.map((value, i) => (
                      <FormItem
                        className="flex items-center space-x-3 space-y-0"
                        key={i}
                      >
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{value}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Duration in days"
                    disabled={loading}
                    {...field}
                    type="number"
                    step={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Goal" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Descripe the exercise"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Workout Image</FormLabel>
              <FormControl>
                <FileUpload
                  endPoint="oneImage"
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
