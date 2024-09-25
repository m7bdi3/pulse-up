"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/hooks/store/user";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Settings, CreditCard } from "lucide-react";
import { userSchema } from "../forms";
import UpdateUserSettings from "@/actions/UserSettings";
import { cn } from "@/lib/utils";
import { cancelSubscription } from "@/actions/user_subs";

interface TabButtonProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: (value: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  value,
  icon,
  label,
  isActive,
  onClick,
}) => (
  <Button
    className={cn(
      " md:w-28 w-full transition-all duration-200 md:rotate-90 flex items-center gap-1"
    )}
    variant={isActive ? "default" : "outline"}
    onClick={() => onClick(value)}
    aria-selected={isActive}
    role="tab"
    tabIndex={isActive ? 0 : -1}
  >
    {icon}
    <span
      className={cn(
        "text-xs font-medium text-center line-clamp-2",
        isActive && "font-semibold"
      )}
    >
      {label}
    </span>
  </Button>
);

export const UserSettingComponent: React.FC = () => {
  const { user } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      age: user?.age || 18,
      gender: user?.gender || "Male",
      height: user?.height || 170,
      weight: user?.weight || 70,
      goal: user?.goal || "IMPROVE_OVERALL_HEALTH",
      activityLevel: user?.activityLevel || "MODERATELY_ACTIVE",
    },
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setIsUpdating(true);
    try {
      await UpdateUserSettings(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubscription = async () => {
    setIsUpdating(true);
    try {
      await cancelSubscription();
      toast.success("Subscription Canceled successfully");
    } catch (error) {
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row transition-none duration-200">
        <div className=" md:mr-8 mb-4 md:mb-0 bg-muted md:grid flex md:h-[370px] md:w-[60px] rounded-md items-center justify-center gap-2 md:gap-0 p-2 md:p-0">
          <TabButton
            value="profile"
            icon={<User className="w-4 h-4 inline" />}
            label="Profile"
            isActive={activeTab === "profile"}
            onClick={setActiveTab}
          />
          <TabButton
            value="account"
            icon={<Settings className="w-4 h-4 inline" />}
            label="Account"
            isActive={activeTab === "account"}
            onClick={setActiveTab}
          />
          <TabButton
            value="subscription"
            icon={<CreditCard className="w-4 h-4 inline" />}
            label="Plan"
            isActive={activeTab === "subscription"}
            onClick={setActiveTab}
          />
        </div>
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {activeTab === "profile" && (
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal details here.
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} type="tel" />
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
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
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
                                  <SelectValue placeholder="Select gender" />
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
                    </div>
                  </CardContent>
                </Card>
              )}
              {activeTab === "account" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (cm)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
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
                              <Input {...field} type="number" />
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
                            <FormLabel>Fitness Goal</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="WEIGHT_LOSS">
                                  Weight Loss
                                </SelectItem>
                                <SelectItem value="WEIGHT_GAIN">
                                  Weight Gain
                                </SelectItem>
                                <SelectItem value="MUSCLE_GAIN">
                                  Muscle Gain
                                </SelectItem>
                                <SelectItem value="MAINTAIN_WEIGHT">
                                  Maintain Weight
                                </SelectItem>
                                <SelectItem value="INCREASE_STAMINA">
                                  Increase Stamina
                                </SelectItem>
                                <SelectItem value="INCREASE_FLEXIBILITY">
                                  Increase Flexibility
                                </SelectItem>
                                <SelectItem value="IMPROVE_OVERALL_HEALTH">
                                  Improve Overall Health
                                </SelectItem>
                                <SelectItem value="INCREASE_ENERGY_LEVEL">
                                  Increase Energy Level
                                </SelectItem>
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
                                  <SelectValue placeholder="Select activity level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SEDENTARY">
                                  Sedentary
                                </SelectItem>
                                <SelectItem value="LIGHTLY_ACTIVE">
                                  Lightly Active
                                </SelectItem>
                                <SelectItem value="MODERATELY_ACTIVE">
                                  Moderately Active
                                </SelectItem>
                                <SelectItem value="VERY_ACTIVE">
                                  Very Active
                                </SelectItem>
                                <SelectItem value="EXTRA_ACTIVE">
                                  Extra Active
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your account activity
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications on your device
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {activeTab === "subscription" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Plan</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.isSubscribed ? "Premium Plan" : "Free Plan"}
                        </p>
                      </div>
                      {user?.isSubscribed ? (
                        <Button
                          variant="destructive"
                          onClick={handleSubscription}
                        >
                          Cancel Subscription
                        </Button>
                      ) : (
                        <Button>Upgrade to Premium</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="mt-6">
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
