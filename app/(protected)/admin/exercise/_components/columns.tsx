"use client";

import { ExerciseCategory } from "@prisma/client";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { DeleteExercise } from "@/actions/ExerciseActions";
import { toast } from "sonner";

export interface ExerciseColumn {
  id: string;
  nameData: {
    name: string;
    images: string[];
  };
  category: ExerciseCategory;
  amount: {
    duration: number;
    repetitions: number | null;
    sets: number | null;
  };
  equipment: string[] | null;
}

const handleDelete = async (id: string) => {
  try {
    const res = await DeleteExercise(id);
    if (res.error) {
      toast.error(`Error: ${res.error}`);
    } else {
      toast.success("Exercise deleted successfully.");
    }
  } catch (error) {
    console.error("Failed to delete Exercise:", error);
    toast.error("An unexpected error occurred while deleting the Exercise.");
  }
};

export const ExerciseColumns: ColumnDef<ExerciseColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all exercises"
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
      const { name, images } = row.getValue(
        "nameData"
      ) as ExerciseColumn["nameData"];
      return (
        <div className="flex items-center gap-2">
          <Image
            src={images[0]}
            alt={`${name} exercise`}
            width={50}
            height={50}
            className="object-cover w-10 h-10 rounded-md"
          />
          <span className="font-medium">{name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const { name } = row.getValue(id) as ExerciseColumn["nameData"];
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
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const { duration, repetitions, sets } = row.getValue(
        "amount"
      ) as ExerciseColumn["amount"];
      return (
        <div className="flex h-5 items-center space-x-4 text-sm">
          {duration && duration !== 0 ? (
            <>
              <span>{duration}m </span>
              <Separator orientation="vertical" className="" />
            </>
          ) : (
            <></>
          )}
          {repetitions ? (
            <>
              <span>
                {repetitions} rep{repetitions > 1 ? "s" : ""}
              </span>
              <Separator orientation="vertical" />
            </>
          ) : (
            <></>
          )}

          {sets && (
            <span>
              {sets} set{sets > 1 ? "s" : ""}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "equipment",
    header: "Equipment",
    cell: ({ row }) => {
      const equipment = row.getValue(
        "equipment"
      ) as ExerciseColumn["equipment"];
      if (!equipment?.length) return <span>None</span>;
      return (
        <>
          {equipment.length > 0 && equipment[0] !== "NONE" && (
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="sm">
                  {equipment.length} item{equipment.length > 1 ? "s" : ""}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit">
                <ul className="list-disc pl-4">
                  {equipment.map((item) => (
                    <li key={item} className="capitalize">
                      {item.toLowerCase()}
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
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
