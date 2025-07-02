"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

interface ExcelTemplateGeneratorProps {
  title: string;
  columnNames: string;
  apiUrl?: string;
}

export default function ExcelTemplateGenerator({
  title,
  columnNames,
  apiUrl = "/api/generate-excel",
}: ExcelTemplateGeneratorProps) {
  const [loading, setLoading] = useState(false);

  const generateTemplate = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          columns: columnNames.split(",").map((str) => str.trim()),
        }),
      });

      if (!response.ok) throw new Error("Failed to generate template");

      // Create file download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}-template-${new Date().toTimeString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    //   Swal.fire({
    //     icon: "success",
    //     title: "Success!",
    //     text: "Template generated successfully. Fill the it then upload",
    //   });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to generate template. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Generate Excel Template</h2>
      <p className="text-sm text-gray-600">
        Click below to generate an Excel template.
      </p>
      <Button onClick={generateTemplate} disabled={loading}>
        {loading ? "Generating..." : "Download Template"}
      </Button>
    </div>
  );
}
