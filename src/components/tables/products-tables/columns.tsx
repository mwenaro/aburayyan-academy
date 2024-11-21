"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IProduct } from "@/models/Product";
import Image from "next/image";

export const columns: ColumnDef<IProduct>[] = [
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
    accessorKey: "imgUrl",
    header: "IMAGE",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Image
          width={100}
          height={100}
          src={row.original.imgUrl}
          alt={row.original.name}
          className="w-16 h-16 object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "PRODUCT",
  },
  {
    accessorKey: "category.name",
    header: "CATEGORY",
  },
  {
    accessorKey: "subCategory.name",
    header: "SUB CATEGORY",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "availability",
    header: "AVAILABILITY",
  },

  {
    accessorKey: "active",
    header: "STATUS",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
