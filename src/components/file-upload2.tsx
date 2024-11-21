"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { Trash } from "lucide-react";
import Image from "next/image";
// import { UploadFileResponse } from 'uploadthing/client';
import { IMG_MAX_LIMIT } from "./forms/product-form";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
interface FileItem {
  key: string;
  url: string;
}

interface ImageUploadProps {
  onChange?: (files: FileItem[]) => void;
  onRemove: (files: FileItem[]) => void;
  value: FileItem[];
}

export default function FileUpload2({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const { toast } = useToast();

  const onDeleteFile = (key: string) => {
    const filteredFiles = value.filter((item) => item.key !== key);
    onRemove(filteredFiles);
  };

  const onUpdateFile = (newFiles: FileItem[]) => {
    onChange && onChange([...value, ...newFiles]);
  };

  return (
    <div>
      {/* Display Uploaded Images */}
      <div className="mb-4 flex items-center gap-4">
        {value.length > 0 &&
          value.map((item) => (
            <div
              key={item.key}
              className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
            >
              <div className="absolute right-2 top-2 z-10">
                <Button
                  type="button"
                  onClick={() => onDeleteFile(item.key)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                className="object-cover"
                alt="Uploaded Image"
                src={item.url}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // You can adjust this according to your layout
              />
            </div>
          ))}
      </div>

      {/* Upload Dropzone */}
      <div>
        {value.length < IMG_MAX_LIMIT && (
          <UploadDropzone<OurFileRouter, any>
            className="ut-label:text-sm py-2 dark:bg-zinc-800"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const data: FileItem[] | undefined = res;
              if (data) {
                onUpdateFile(data);
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Error",
                variant: "destructive",
                description: error.message,
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
