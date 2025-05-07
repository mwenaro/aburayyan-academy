"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IStudent } from "@/models/Student";
import Image from "next/image";

export const columns: ColumnDef<IStudent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "photo",
    header: "PIC",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Image
          width={100}
          height={100}
          src={row.original.photo || ""}
          alt={row.original.name}
          className="w-16 h-16 object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "grade",
    header: "GRADE",
  },
  {
    accessorKey: "phone",
    header: "TEL",
  },
  
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
