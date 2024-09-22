"use client";

import { MealType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DeleteMeal } from "@/actions/MealsActions";
import { toast } from "sonner";

export interface MealColumn {
  id: string;

  name: string;

  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  calories: number;
  servingSize: number;
  mealType: MealType;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteMeal(id);
    if (res.error) {
      toast.error(`Error: ${res.error}`);
    } else {
      toast.success("Meal deleted successfully.");
    }
  } catch (error) {
    console.error("Failed to delete Meal:", error);
    toast.error("An unexpected error occurred while deleting the Meal.");
  }
};

export const MealColumns: ColumnDef<MealColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all meals"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mealType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("mealType")}</Badge>
    ),
  },
  {
    accessorKey: "calories",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Calories
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("calories")} kcal</span>
    ),
  },
  {
    accessorKey: "servingSize",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Serving Size
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <span>{row.getValue("servingSize")}</span>,
  },
  {
    accessorKey: "macros",
    header: () => (
      <div className="text-center">
        <span>Macros</span>
        <br />
        <span className="text-xs text-muted-foreground">(P/C/F)</span>
      </div>
    ),
    cell: ({ row }) => {
      const { protein, carbs, fats } = row.getValue(
        "macros"
      ) as MealColumn["macros"];
      return (
        <div className="flex justify-between gap-1 text-sm">
          <Badge variant="secondary">{protein}g</Badge>
          <Badge variant="secondary">{carbs}g</Badge>
          <Badge variant="secondary">{fats}g</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu for {row.original.name}</span>
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
