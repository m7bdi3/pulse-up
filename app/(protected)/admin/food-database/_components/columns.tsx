"use client";

import { FoodCategory } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
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
import { toast } from "sonner";
import { DeleteFood } from "@/actions/FoodActions";

export interface FoodColumn {
  id: string;
  nameData: {
    name: string;
    image: string;
  };
  category: FoodCategory;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  calories: number;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteFood(id);
    if (res.error) {
      toast.error(`Error: ${res.error}`);
    } else {
      toast.success("Food deleted successfully.");
    }
  } catch (error) {
    console.error("Failed to delete Food:", error);
    toast.error("An unexpected error occurred while deleting the Food.");
  }
};

export const FoodColumns: ColumnDef<FoodColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all foods"
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
      ) as FoodColumn["nameData"];
      return (
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={`${name} food item`}
            width={50}
            height={50}
            className="object-cover w-12 h-12 rounded-md"
          />
          <span className="font-medium">{name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const { name } = row.getValue(id) as FoodColumn["nameData"];
      return name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("category")}</Badge>
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
    accessorKey: "macros",
    header: "Macros (P/C/F)",
    cell: ({ row }) => {
      const { protein, carbs, fats } = row.getValue(
        "macros"
      ) as FoodColumn["macros"];
      return (
        <div className="flex gap-2">
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
