"use client";
import React from "react";
import * as z from "zod";
import { Modal } from "@/components/modal";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRegisterData } from "./protected/forms";
import { toast } from "sonner";
import { Goal } from "@prisma/client";
import { RegisterUserData } from "@/actions/RegisterUserData";
import { useUser } from "@/hooks/store/user";

export const RegisterUserDataModal = () => {
  const StoreModal = useModalStore();
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof UserRegisterData>>({
    resolver: zodResolver(UserRegisterData),
    defaultValues: {
      phone: user?.phone || undefined,
      address: user?.address || undefined,
      age: user?.age || undefined,
      height: user?.height || undefined,
      weight: user?.weight || undefined,
      gender: user?.gender || undefined,
      activityLevel: user?.activityLevel || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof UserRegisterData>) => {
    try {
      setLoading(true);
      if (!user?.id) {
        throw new Error("User ID is not available");
      }
      const res = await RegisterUserData(values, user.id);
      if (res.error) {
        toast.error(`Error: ${res.error}`);
      } else {
        toast.success("Data Created successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred while creating the data.");
    } finally {
      setLoading(false);
      StoreModal.closeDataRegister();
    }
  };
  return (
    <Modal
      isOpen={StoreModal.isDataRegisterOpen}
      onClose={StoreModal.closeDataRegister}
      classname="max-w-2xl min-w-fit"
      title="Complete Your Fitness Profile"
      description="Complete the form to personalize your experience. Your details will help us tailor the best fitness plan to achieve your health and fitness goals."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 py-6 px-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        user?.phone ? user.phone : "Your phone number"
                      }
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        user?.address ? user.address : "Your address"
                      }
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={user?.age ? `${user.age}` : "Your Age"}
                      type="number"
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            user?.gender ? user.gender : "Select your gender"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={user?.height ? `${user.height}` : "Height"}
                      type="number"
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
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={user?.weight ? `${user.weight}` : "Weight"}
                      type="number"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Goal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          user?.goal ? user.goal : "Select Your Goal"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Goal).map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SEDENTARY">Sedentary</SelectItem>
                    <SelectItem value="LIGHTLY_ACTIVE">
                      Lightly Active
                    </SelectItem>
                    <SelectItem value="MODERATELY_ACTIVE">
                      Moderately Active
                    </SelectItem>
                    <SelectItem value="VERY_ACTIVE">Very Active</SelectItem>
                    <SelectItem value="EXTRA_ACTIVE">Extra Active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
