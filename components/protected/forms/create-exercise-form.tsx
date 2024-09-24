"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { MultiFileUpload } from "@/components/file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardContent } from "@/components/ui/card";
import { ExerciseSchema } from ".";
import { BodyPart, ExerciseCategory, ExerciseEquipment } from "@prisma/client";
import { CreateExercise } from "@/actions/ExerciseActions";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { Modal } from "@/components/modal";
export const ExerciseCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const { isExerciseFormOpen, closeExerciseForm } = useModalStore();
  const form = useForm<z.infer<typeof ExerciseSchema>>({
    resolver: zodResolver(ExerciseSchema),
    defaultValues: {
      name: undefined,
      images: [],
      duration: undefined,
      repetitions: undefined,
      bodyPart: undefined,
      caloriesBurned: undefined,
      sets: undefined,
      equipments: [],
      category: undefined,
      description: undefined,
    },
  });
  const ExerciseCategoryValues = Object.values(ExerciseCategory);
  const ExerciseEquipmentValues = Object.values(ExerciseEquipment);
  const ExerciseBodyPart = Object.values(BodyPart);

  const onSubmit = async (values: z.infer<typeof ExerciseSchema>) => {
    try {
      setLoading(true);
      const res = await CreateExercise(values);
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
    <Modal
      isOpen={isExerciseFormOpen}
      onClose={closeExerciseForm}
      title="Create Workout Exercise"
      classname="max-w-2xl"
    >
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
                      placeholder="Name your exercise"
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
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose Exercise category</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-2 flex-wrap"
                    >
                      {ExerciseCategoryValues.map((value, i) => (
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

            <Controller
              name="equipments"
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
                            ? field.value.join(", ")
                            : "Select Equipment"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search equipments..." />
                        <CommandList>
                          <CommandEmpty>No Equipment found.</CommandEmpty>
                          <CommandGroup>
                            {ExerciseEquipmentValues.map((equipment) => (
                              <CommandItem
                                value={equipment}
                                key={equipment}
                                onSelect={() => {
                                  const updatedValue = field.value.includes(
                                    equipment as (typeof field.value)[number]
                                  )
                                    ? field.value.filter((v) => v !== equipment)
                                    : [...field.value, equipment];
                                  form.setValue(
                                    "equipments",
                                    updatedValue as any
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value.includes(equipment as any)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {equipment}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((v) => {
                      const equipment = ExerciseEquipmentValues.find(
                        (f) => f === v
                      );
                      return (
                        <Badge key={v} variant="secondary">
                          {equipment}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0"
                            onClick={() =>
                              field.onChange(field.value.filter((t) => t !== v))
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

            <FormField
              control={form.control}
              name="bodyPart"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose Body Part</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-2 flex-wrap"
                    >
                      {ExerciseBodyPart.map((value, i) => (
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
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="caloriesBurned"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Burned Calories"
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
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Duration (S)"
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
                name="repetitions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Repetitions"
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
                name="sets"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Sets"
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
            </div>
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
            name="images"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Exercise Images</FormLabel>
                <FormControl>
                  <MultiFileUpload
                    endPoint="imageUploader"
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
              {loading ? "Creating..." : "Create Exercise"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
