"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { IStudent } from "@/models/Student";
import Image from "next/image";
import { IClass } from "@/models/Class";
import { strCapitalize } from "@/libs/str_functions";

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
    cell: ({
      row: {
        original: { photo, gen },
      },
    }) => (
      <div className="flex justify-center items-center">
        <Image
          width={100}
          height={100}
          src={
            photo ||
            `/school/avatars/${gen
              .toLocaleLowerCase()
              .trim()}-student-avatar.png`
          }
          alt={"student photo"}
          className="w-16 h-16 object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "regno",
    header: "REGNO",
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
    accessorKey: "gen",
    header: "GENDER",
  },
  {
    accessorKey: "class",
    header: "GRADE",
    cell: ({
      row: {
        original: { class: cls },
      },
    }) => <>{strCapitalize((cls as unknown as IClass).name)}</>,
  },
  {
    accessorKey: "phone",
    header: "TEL",

    cell: ({ row }) => <>{row.original.contactDetails.phone || ""}</>,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
