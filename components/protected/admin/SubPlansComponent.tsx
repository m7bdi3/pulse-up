"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/DataTable";
import { SubPlanCreateForm } from "../forms/create-subPlan-form";
import { PlansColumns } from "@/app/(protected)/admin/subPlans/_components/columns";
import { DeleteSubPlan } from "@/actions/subPlansActions";
import { toast } from "sonner";

interface Props {
  data: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    _count: {
      subscriptions: number;
    };
  }[];
}

export const SubPlanComponent = ({ data }: Props) => {
  const serializedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    duration: item.duration,
    price: item.price,
    subs: item._count.subscriptions,
  }));

  const handleDeleteRows = async (ids: string[]) => {
    try {
      await Promise.all(ids.map((id) => DeleteSubPlan(id)));
      toast.success(`Successfully deleted ${ids.length} meal(s)`);
    } catch (error) {
      console.error("Error deleting meals:", error);
      toast.error("Failed to delete one or more meals");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-background rounded-lg shadow-md"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Plans</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Plan</DialogTitle>
            </DialogHeader>
            <SubPlanCreateForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        columns={PlansColumns}
        data={serializedData}
        onDeleteRows={handleDeleteRows}
        searchItem="name"
        filterName="Plans"
      />
    </motion.div>
  );
};
