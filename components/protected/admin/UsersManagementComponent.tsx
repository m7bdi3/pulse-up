"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminStore } from "@/hooks/store/user";
import { DataTable } from "@/components/DataTable";
import { UsersColumns } from "@/app/(protected)/admin/user-management/_components/columns";
import { motion } from "framer-motion";
import { DeleteUser } from "@/actions/AdminDashboardStats";

export const AdminUsersManagement = () => {
  const { users } = useAdminStore();
  if (!users) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  const adminUsers = users.filter((user) => user.role === "ADMIN");
  const regularUsers = users.filter((user) => user.role === "USER");

  const serializedRegularData = regularUsers?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    workoutPlan: user.workoutPlan?.workoutPlan.name,
    NutritionPlan: user.nutritionPlan?.nutritionPlan.name,
    SubscriptionPlan:
      (user.Subscription?.subscriptionPrice ?? 0) / 100 ||
      (user.LifeTimePayment?.price ?? 0) / 100,
    user: user,
  }));

  const serializedAdminData = adminUsers?.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    workoutPlan: user.workoutPlan?.workoutPlan.name,
    NutritionPlan: user.nutritionPlan?.nutritionPlan.name,
    SubscriptionPlan:
      (user.Subscription?.subscriptionPrice ?? 0) / 100 ||
      (user.LifeTimePayment?.price ?? 0) / 100,
    user: user,
  }));

  const handleDeleteRows = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => DeleteUser(id)));
      toast.success(`Successfully deleted ${ids.length} user(s)`);
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Failed to delete one or more user");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md space-y-12"
    >
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Regular Users</h2>
        <DataTable
          onDeleteRows={handleDeleteRows}
          columns={UsersColumns}
          data={serializedRegularData}
          searchItem="email"
          filterName="Email"
        />
      </div>
      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Admin Users</h2>
        <DataTable
          onDeleteRows={handleDeleteRows}
          columns={UsersColumns}
          data={serializedAdminData}
          searchItem="email"
          filterName="Email"
        />
      </div>
    </motion.div>
  );
};
