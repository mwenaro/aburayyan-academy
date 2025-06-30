"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IStudent } from "@/models/Student";
import { Edit, MoreHorizontal, Trash, User } from "lucide-react";
import {  useRouter } from "next/navigation";
import { useState } from "react";

interface CellActionProps {
  data: IStudent;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // console.log("In cell Action ", data);
  const onConfirm = async () => {
    setLoading(true);
    const res = await fetch(`/api/v1/student/${data._id}`, {method:'DELETE'});
    router.refresh()
    await res.json();
    setLoading(false);
    setOpen(false)
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/students/${data._id}/profile`)}
          >
            <User className="mr-2 h-4 w-4" /> View Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/students/${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
