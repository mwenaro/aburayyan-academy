"use client";

import React, { useState } from "react";

export const NewFileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("/api/v1/format-booklet", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to format PDF.");
      }

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "booklet.pdf";
      link.click();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleFileUpload} disabled={!file || loading}>
        {loading ? "Processing..." : "Format as Booklet"}
      </button>
    </div>
  );
};


