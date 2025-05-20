"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { strCapitalize } from "@/libs/str_functions";
import { ISubject } from "@/models/Subject";

export const columns: ColumnDef<ISubject>[] = [
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
    accessorKey: "name",
    header: "NAME",
    cell: ({
      row: {
        original: { name },
      },
    }) => <>{strCapitalize(name)}</>,
  },
  {
    accessorKey: "category",
    header: "CATEGORY",
  },
  

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
