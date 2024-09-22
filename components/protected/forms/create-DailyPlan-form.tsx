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
import { CardContent } from "@/components/ui/card";
import { DailyMealPlanSchema } from ".";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CreateDailyPlan } from "@/actions/DailyPlanActions";

interface Props {
  meals: MealTemplate[];
  weeklyPlans: WeeklyMealPlanTemplate[];
}

export const DailyPlanCreateForm = ({ meals, weeklyPlans }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof DailyMealPlanSchema>>({
    resolver: zodResolver(DailyMealPlanSchema),
    defaultValues: {
      dayOfWeek: undefined,
      weeklyPlanTemplateId: undefined,
      meals: [],
      name: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof DailyMealPlanSchema>) => {
    try {
      setLoading(true);
      const res = await CreateDailyPlan(values);
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

  const categorizeMeals = (type: string) =>
    meals.filter((m) => m.mealType === type);

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
                    placeholder="Name the daily plan"
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
            name="dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Day of Week"
                    disabled={loading}
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {["BREAKFAST", "LUNCH", "DINNER", "SNACK"].map((mealType) => (
            <FormField
              key={mealType}
              control={form.control}
              name="meals"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{mealType} Meal</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value.some(
                              (id) =>
                                meals.find((m) => m.id === id)?.mealType ===
                                mealType
                            ) && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            .filter(
                              (id) =>
                                meals.find((m) => m.id === id)?.mealType ===
                                mealType
                            )
                            .map((id) => meals.find((m) => m.id === id)?.name)
                            .join(", ") || `Select ${mealType} meal`}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder={`Search ${mealType} meals...`}
                          />
                          <CommandList>
                            <CommandEmpty>No meal found.</CommandEmpty>
                            <CommandGroup>
                              {categorizeMeals(mealType).map((food) => (
                                <CommandItem
                                  value={food.id}
                                  key={food.id}
                                  onSelect={() => {
                                    const updatedValue = field.value.includes(
                                      food.id
                                    )
                                      ? field.value.filter(
                                          (id) => id !== food.id
                                        )
                                      : [...field.value, food.id];
                                    form.setValue("meals", updatedValue);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value.includes(food.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {food.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <FormField
            control={form.control}
            name="weeklyPlanTemplateId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Weekly Plan</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? weeklyPlans.find((wp) => wp.id === field.value)
                              ?.name
                          : "Select Plan"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No plan found.</CommandEmpty>
                        <CommandGroup>
                          {weeklyPlans.map((wp) => (
                            <CommandItem
                              value={wp.id}
                              key={wp.id}
                              onSelect={() => {
                                form.setValue("weeklyPlanTemplateId", wp.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  wp.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {wp.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <div className="flex justify-end">
          <Button disabled={loading} type="submit">
            {loading ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
