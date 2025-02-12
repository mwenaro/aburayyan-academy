"use client";

import ExcelTemplateGenerator from "@/components/bulky-insert/ExcelTemplateGenerator";
import ExcelUploadForm from "@/components/bulky-insert/ExcelUploadForm";

export default function Home() {
  

 

  return (
    <div className="p-6">
      <ExcelTemplateGenerator
      title="Grade 6 Maths"
      columnNames="name,age,gender"

      />
      

      <div className="mt-4">
      <ExcelUploadForm apiUrl="/api/upload-excel" />

      </div>
    </div>
  );
}
