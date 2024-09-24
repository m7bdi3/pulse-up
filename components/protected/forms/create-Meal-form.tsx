"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MealSchema } from ".";
import { MealType } from "@prisma/client";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CreateMeal } from "@/actions/MealsActions";
import { Textarea } from "@/components/ui/textarea";
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
import { useFoodsStore } from "@/hooks/store/user";
import { Modal } from "@/components/modal";
import { useModalStore } from "@/hooks/store/use-store-modal";

export const MealCreateForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { foods } = useFoodsStore();
  const { isMealFormOpen, closeMealForm } = useModalStore();

  const form = useForm<z.infer<typeof MealSchema>>({
    resolver: zodResolver(MealSchema),
    defaultValues: {
      name: "",
      description: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      mealType: undefined,
      servingSize: 0,
      foodId: [],
    },
  });

  const MealTypeValues = Object.values(MealType);

  const onSubmit = async (values: z.infer<typeof MealSchema>) => {
    try {
      setLoading(true);
      const res = await CreateMeal(values);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Meal created successfully.");
        form.reset();
        closeMealForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the meal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      classname="max-w-4xl"
      isOpen={isMealFormOpen}
      onClose={closeMealForm}
      title="Create Meal"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name your Meal"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="foodId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Items</FormLabel>
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
                          {field.value.length
                            ? `${field.value.length} selected`
                            : "Select Food items"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search food items..." />
                        <CommandList>
                          <CommandEmpty>No food found.</CommandEmpty>
                          <CommandGroup>
                            {foods?.map((food) => (
                              <CommandItem
                                value={food.name}
                                key={food.id}
                                onSelect={() => {
                                  const updatedValue = field.value.includes(
                                    food.id
                                  )
                                    ? field.value.filter((id) => id !== food.id)
                                    : [...field.value, food.id];
                                  form.setValue("foodId", updatedValue);
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
                  <div className="flex flex-wrap gap-2 mt-2">
                    {field.value.map((id) => {
                      const foodItem = foods?.find((f) => f.id === id);
                      return (
                        <Badge key={id} variant="secondary">
                          {foodItem?.name}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 h-auto p-0"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((itemId) => itemId !== id)
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
          </div>

          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-4"
                  >
                    {MealTypeValues.map((value) => (
                      <FormItem
                        key={value}
                        className="flex items-center space-x-3 space-y-0"
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="calories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Calories"
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
              name="protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proteins (g)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Proteins (g)"
                      disabled={loading}
                      {...field}
                      type="number"
                      step={0.1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carbs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carbs (g)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Carbs (g)"
                      disabled={loading}
                      {...field}
                      type="number"
                      step={0.1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fats (g)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fats (g)"
                      disabled={loading}
                      {...field}
                      type="number"
                      step={0.1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="servingSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serving Size</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Serving Size"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the meal"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Meal"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
