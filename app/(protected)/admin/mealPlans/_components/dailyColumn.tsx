"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import { toast } from "sonner";
import { DeleteDailyPlan } from "@/actions/DailyPlanActions";

export interface DailyColumn {
  id: string;
  name: string;
  meals: {
    id: string;
    name: string;
  }[];
  dayOfWeek: number;
  weeklyPlan: string;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteDailyPlan(id);
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

export const DailyColumns: ColumnDef<DailyColumn>[] = [
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
        aria-label={`Select ${row.original.id}`}
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
    accessorKey: "dayOfWeek",
    header: "Day of week",
  },
  {
    accessorKey: "weeklyPlan",
    header: "Weekly plan",
  },
  {
    accessorKey: "meals",
    header: () => (
      <div className="text-center">
        <span>Meals</span>
        <br />
        <span className="text-xs text-muted-foreground">(Count)</span>
      </div>
    ),
    cell: ({ row }) => {
      const meals = row.original.meals;
      return (
        <div className="flex justify-center">
          <Badge variant="secondary">{meals.length}</Badge>
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
            <span className="sr-only">Open menu for {row.original.id}</span>
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
