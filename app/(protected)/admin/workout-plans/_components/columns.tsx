"use client";

import { DifficultyLevel } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown, Dumbbell } from "lucide-react";
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
import { DeleteWorkoutPlan } from "@/actions/WorkoutPlansActions";
import { toast } from "sonner";

export interface WorkoutPlansColumn {
  id: string;
  nameData: {
    name: string;
    image: string;
  };
  difficulty: DifficultyLevel;
  goal: string | null;
  duration: number | null;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteWorkoutPlan(id);
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

export const WorkoutPlansColumns: ColumnDef<WorkoutPlansColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all workout plans"
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
    header: () => <div className="mr-32">Name</div>,
    cell: ({ row }) => {
      const { name, image } = row.getValue(
        "nameData"
      ) as WorkoutPlansColumn["nameData"];
      return (
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={`${name} workout plan`}
            width={50}
            height={50}
            className="object-cover w-12 h-12 rounded-md"
          />
          <span className="font-medium">{name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const { name } = row.getValue(id) as WorkoutPlansColumn["nameData"];
      return name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Difficulty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as DifficultyLevel;
      return (
        <Badge
          variant={
            difficulty === "BEGINNER"
              ? "secondary"
              : difficulty === "INTERMEDIATE"
              ? "default"
              : "destructive"
          }
        >
          {difficulty.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "goal",
    header: "Goal",
    cell: ({ row }) => {
      const goal = row.getValue("goal") as string | null;
      return goal ? (
        <span className="capitalize">{goal.toLowerCase()}</span>
      ) : (
        <span className="text-muted-foreground">Not specified</span>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex flex-col items-start justify-center w-30"
      >
        <span className="flex items-center gap-2">
          Duration
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
        <span className="text-xs text-muted-foreground">(days)</span>
      </Button>
    ),
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number | null;
      return duration ? (
        `${duration} days`
      ) : (
        <span className="text-muted-foreground">Not specified</span>
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
