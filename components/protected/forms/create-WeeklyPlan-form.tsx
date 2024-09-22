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
import { WeeklyMealPlanSchema } from ".";
import { NutritionPlan } from "@prisma/client";
import { Check, ChevronsUpDown, X } from "lucide-react";
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
import { CreateWeeklyPlan } from "@/actions/WeeklyPlanActions";

interface Props {
  nutritionPlans: NutritionPlan[];
}

export const WeeklyPlanCreateForm = ({ nutritionPlans }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof WeeklyMealPlanSchema>>({
    resolver: zodResolver(WeeklyMealPlanSchema),
    defaultValues: {
      name: undefined,
      weekNumber: undefined,
      nutritionPlanId: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof WeeklyMealPlanSchema>) => {
    try {
      setLoading(true);
      const res = await CreateWeeklyPlan(values);
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
                    placeholder="Plan Name"
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
            name="weekNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Week Number"
                    disabled={loading}
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nutritionPlanId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nutrition Plan</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? nutritionPlans.find((np) => np.id === field.value)
                              ?.name
                          : "Select Nutrition Plan"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No Plan found.</CommandEmpty>
                        <CommandGroup>
                          {nutritionPlans.map((wp) => (
                            <CommandItem
                              value={wp.id}
                              key={wp.id}
                              onSelect={() => {
                                form.setValue("nutritionPlanId", wp.id);
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
