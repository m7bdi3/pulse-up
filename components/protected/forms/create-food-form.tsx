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
import { FoodSchema } from ".";
import { FoodCategory } from "@prisma/client";
import { CreateFood } from "@/actions/FoodActions";

export const FoodCreateForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FoodSchema>>({
    resolver: zodResolver(FoodSchema),
    defaultValues: {
      name: undefined,
      image: undefined,
      calories: undefined,
      protein: undefined,
      carbs: undefined,
      fats: undefined,
      category: undefined,
    },
  });
  const FoodCategoryValues = Object.values(FoodCategory);

  const onSubmit = async (values: z.infer<typeof FoodSchema>) => {
    try {
      setLoading(true);
      const res = await CreateFood(values);
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
                    placeholder="Name your Food"
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
                <FormLabel>Choose food category</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    {FoodCategoryValues.map((value, i) => (
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
            name="calories"
            render={({ field }) => (
              <FormItem>
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
                <FormControl>
                  <Input
                    placeholder="fats (g)"
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
        </CardContent>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Food Image</FormLabel>
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
            {loading ? "Creating..." : "Create Food"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
