"use client"
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const FileUploadTest: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }

      const data = await response.json();
      setUploadResult(`File uploaded successfully: ${data.filename}`);
    } catch (error: any) {
      setUploadResult(`Error: ${error.message || "File upload failed"}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>File Upload Test</h1>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload File"}
     </Button>
      {uploadResult && <p>{uploadResult}</p>}
    </div>
  );
};

export default FileUploadTest;
