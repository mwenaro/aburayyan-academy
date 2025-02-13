"use client";

import ExcelTemplateGenerator from "@/components/bulky-insert/ExcelTemplateGenerator";
import ExcelUploadForm from "@/components/bulky-insert/ExcelUploadForm";

export default function Home() {
  return (
    <div className="p-6">
      <ExcelTemplateGenerator
        // apiUrl="/api/generate-excel?table=TextMark"
        title="Grade 2 students"
        columnNames="name, score"
        defaultData={{ grade: 2, amd: [101, 102, 103, 104, 105, 106] }}
      />

      <div className="mt-4">
        <ExcelUploadForm apiUrl="/api/upload-excel/?table2=TestMark" />
      </div>
    </div>
  );
}
