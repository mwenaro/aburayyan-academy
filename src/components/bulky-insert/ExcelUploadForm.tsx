"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// const schema = z.object({
//   file: z
//     .instanceof(FileList)
//     .refine((files) => files.length > 0, { message: "File is required" })
//     .refine(
//       (files) =>
//         files[0]?.type ===
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       {
//         message: "Only Excel files (.xlsx) are allowed",
//       }
//     ),
// });

const schema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList, { message: "Invalid file" })
    .refine((files) => files.length > 0, { message: "File is required" })
    .refine(
      (files) =>
        files[0]?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Only Excel files (.xlsx) are allowed",
      }
    ),
});


interface ExcelUploadFormProps {
  apiUrl?: string;
}

export default function ExcelUploadForm({
  apiUrl = "/api/upload-excel",
}: ExcelUploadFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  //   interface MyFormValues extends FieldValues {
  //     file: FileList;
  //   }

  const onSubmit: any = async (data: { file: FileList }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.file[0]);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "File uploaded successfully.",
      });
      console.log(await res.json());
      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "An error occurred while uploading the file.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Upload Excel File</h2>
      <p className="text-sm text-gray-600">
        Select an Excel file and upload it for processing.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <Input type="file" accept=".xlsx" {...register("file")} />
        {errors.file && (
          <p className="text-red-500 text-sm">
            {errors.file?.message as string}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
}
