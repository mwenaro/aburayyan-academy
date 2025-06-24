import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ExamCellAction } from "./cell-action";
// import { IExam } from "@/models/Exam";

export interface IExam {
  _id: string;
  name: string;
  term: number;
  year: number;
  school: any;
  createdAt?: string;
  updatedAt?: string;
}

export const columns: ColumnDef<IExam>[] = [
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
    header: "Exam Name",
  },
  {
    accessorKey: "term",
    header: "Term",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "school.name",
    header: "School",
    cell: ({ row }) => row.original.school?.name || "-",
  },
  {
    id: "actions",
    cell: ({ row }) => <ExamCellAction id={row.original._id} />,
  },
];
