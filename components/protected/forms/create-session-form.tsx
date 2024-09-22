"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { CreateSession } from "@/actions/SessionsActions";
import { toast } from "sonner";
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
import { SessionSchema } from "../forms";

interface Props {
  workout: {
    id: string;
    name: string;
    duration: number | null;
  };
  Exercises: {
    id: string;
    name: string;
  }[];
}

const DynamicSessionSchema = z.object({
  sessions: z.array(SessionSchema),
});

export const SessionCreateForm = ({ workout, Exercises }: Props) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 2;
  const numberOfSessions = Math.round((4 * workout.duration!) / 7);
  const totalPages = Math.ceil(numberOfSessions / sessionsPerPage);

  const form = useForm<z.infer<typeof DynamicSessionSchema>>({
    resolver: zodResolver(DynamicSessionSchema),
    defaultValues: {
      sessions: Array(numberOfSessions).fill({
        name: "",
        duration: undefined,
        day: undefined,
        caloriesBurned: undefined,
        exercises: [],
      }),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "sessions",
  });

  const onSubmit = async (values: z.infer<typeof DynamicSessionSchema>) => {
    try {
      setLoading(true);
      for (const session of values.sessions) {
        const res = await CreateSession({
          ...session,
          workoutPlan: workout.id,
        });
        if (res.error) {
          toast.error(`Error: ${res.error}`);
        } else {
          toast.success("Session created successfully.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the sessions.");
    } finally {
      setLoading(false);
    }
  };

  const paginatedFields = fields.slice(
    (currentPage - 1) * sessionsPerPage,
    currentPage * sessionsPerPage
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Create Training Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            {workout.name} plan ({workout.duration} days)
          </p>
        </div>

        {paginatedFields.map((field, index) => {
          const sessionIndex = (currentPage - 1) * sessionsPerPage + index;
          return (
            <Card key={field.id}>
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">
                  Session {sessionIndex + 1}
                </h3>
                <FormField
                  control={form.control}
                  name={`sessions.${sessionIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Name your session"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`sessions.${sessionIndex}.day`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Day Number"
                            disabled={loading}
                            {...field}
                            type="number"
                            step={1}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sessions.${sessionIndex}.duration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Duration (minutes)"
                            disabled={loading}
                            {...field}
                            type="number"
                            step={1}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sessions.${sessionIndex}.caloriesBurned`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Calories burned"
                            disabled={loading}
                            {...field}
                            type="number"
                            step={1}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Controller
                  name={`sessions.${sessionIndex}.exercises`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value.length && "text-muted-foreground"
                              )}
                            >
                              {field.value.length > 0
                                ? `${field.value.length} exercise${
                                    field.value.length > 1 ? "s" : ""
                                  } selected`
                                : "Select exercises"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search exercises..." />
                            <CommandList>
                              <CommandEmpty>No Exercises found.</CommandEmpty>
                              <CommandGroup>
                                {Exercises.map((exercise) => (
                                  <CommandItem
                                    value={exercise.name}
                                    key={exercise.id}
                                    onSelect={() => {
                                      const updatedValue = field.value.includes(
                                        exercise.id
                                      )
                                        ? field.value.filter(
                                            (v) => v !== exercise.id
                                          )
                                        : [...field.value, exercise.id];
                                      field.onChange(updatedValue);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value.includes(exercise.id)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {exercise.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((v) => {
                          const exercise = Exercises.find((f) => f.id === v);
                          return (
                            <Badge key={v} variant="secondary">
                              {exercise?.name}
                              <Button
                                variant="ghost"
                                type="button"
                                size="sm"
                                className="ml-1 h-auto p-0"
                                onClick={() =>
                                  field.onChange(
                                    field.value.filter((t) => t !== v)
                                  )
                                }
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </Badge>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          );
        })}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              type="button"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <Button disabled={loading} type="submit" size="lg">
            {loading ? "Creating..." : `Create ${numberOfSessions} Sessions`}
          </Button>
        </div>
      </form>
    </Form>
  );
};
