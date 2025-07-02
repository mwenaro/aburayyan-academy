"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IUser } from "@/models/User";
import Image from "next/image";

export const columns: ColumnDef<IUser>[] = [
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
    accessorKey: "image",
    header: "PIC",
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        {!row.original.image ? (
          ""
        ) : (
          <Image
            width={100}
            height={100}
            src={row.original.image || ""}
            alt={row.original.name}
            className="w-16 h-16 object-cover"
          />
        )}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
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
