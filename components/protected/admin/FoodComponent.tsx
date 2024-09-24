"use client";
import { motion } from "framer-motion";
import { Loader2Icon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Food } from "@prisma/client";
import { DataTable } from "@/components/DataTable";
import { FoodColumns } from "@/app/(protected)/admin/food-database/_components/columns";
import { DeleteFood } from "@/actions/FoodActions";
import { toast } from "sonner";
import { useState } from "react";
import { useModalStore } from "@/hooks/store/use-store-modal";

interface Props {
  data: Food[];
}

export const FoodDatabaseComponent = ({ data }: Props) => {
  const [loading, setLoading] = useState(false);
  const { openFoodForm } = useModalStore();
  const serializedData = data.map((item) => ({
    id: item.id,
    nameData: {
      name: item.name,
      image: item.image,
    },
    category: item.category,
    macros: {
      protein: item.protein!,
      carbs: item.carbs!,
      fats: item.fats!,
    },
    calories: item.calories!,
  }));

  const handleDeleteRows = async (ids: string[]) => {
    setLoading(true);
    try {
      await Promise.all(ids.map((id) => DeleteFood(id)));
      toast.success(`Successfully deleted ${ids.length} meal(s)`);
    } catch (error) {
      console.error("Error deleting meals:", error);
      toast.error("Failed to delete one or more meals");
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold">Food Database</h2>
        <Button onClick={openFoodForm}>
          <Plus className="mr-2 h-4 w-4" /> Add Food Item
        </Button>
      </div>
      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Loader2Icon className="h-16 w-16 animate-spin" />
          deleting...
        </div>
      ) : (
        <DataTable
          onDeleteRows={handleDeleteRows}
          columns={FoodColumns}
          data={serializedData}
          searchItem="nameData"
          filterName="Food"
        />
      )}
    </motion.div>
  );
};
