"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteNutritionPlan } from "@/actions/NutritionPlanAction";
import { toast } from "sonner";
import { MealType } from "@prisma/client";

export interface NutritionPlanColumn {
  id: string;
  nameData: {
    name: string;
    image: string;
  };
  meals:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteNutritionPlan(id);
    if (res.error) {
      toast.error(`Error: ${res.error}`);
    } else {
      toast.success("Workout Plan deleted successfully.");
    }
  } catch (error) {
    console.error("Failed to delete Workout Plan:", error);
    toast.error(
      "An unexpected error occurred while deleting the Workout Plan."
    );
  }
};

export const NutritionPlanColumns: ColumnDef<NutritionPlanColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all nutrition plans"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.nameData.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nameData",
    header: "Name",
    cell: ({ row }) => {
      const { name, image } = row.getValue(
        "nameData"
      ) as NutritionPlanColumn["nameData"];
      return (
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={`${name} nutrition plan`}
            width={100}
            height={100}
            className="object-cover min-w-12 min-h-12 max-h-12 max-w-12 rounded-md"
          />
          <span className="font-medium">{name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const { name } = row.getValue(id) as NutritionPlanColumn["nameData"];
      return name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "meals",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Meals
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const meals = row.getValue("meals") as NutritionPlanColumn["meals"];
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="sm">
              {meals?.length || 0} meal{meals?.length !== 1 ? "s" : ""}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <h4 className="mb-2 font-semibold">Meals in this plan:</h4>
            {meals?.length ? (
              <ul className="space-y-1">
                {meals.map((meal) => (
                  <li key={meal.id} className="text-sm">
                    {meal.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No meals in this plan
              </p>
            )}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">
              Open menu for {row.original.nameData.name}
            </span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleDelete(row.original.id);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
