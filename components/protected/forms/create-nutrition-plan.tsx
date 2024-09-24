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
import { CardContent } from "@/components/ui/card";
import { NutritionPlanSchema } from ".";
import { Textarea } from "@/components/ui/textarea";
import { CreateNutritionPlan } from "@/actions/NutritionPlanAction";
import { Modal } from "@/components/modal";
import { useModalStore } from "@/hooks/store/use-store-modal";

export const NutritionPlanCreateForm = () => {
  const [loading, setLoading] = useState(false);
  const { isNutritionPlanFormOpen, closeNutritionPlanForm } = useModalStore();
  const form = useForm<z.infer<typeof NutritionPlanSchema>>({
    resolver: zodResolver(NutritionPlanSchema),
    defaultValues: {
      name: undefined,
      image: undefined,
      description: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof NutritionPlanSchema>) => {
    try {
      setLoading(true);
      const res = await CreateNutritionPlan(values);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Nutrition Plan created successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "An unexpected error occurred while creating the Nutrition Plan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onClose={closeNutritionPlanForm}
      isOpen={isNutritionPlanFormOpen}
      classname="max-w-2xl "
      title="Create Nutrition Plan"
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
                      placeholder="Name your Plan"
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Descripe the plan..."
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
              {loading ? "Creating..." : "Create Plan"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
