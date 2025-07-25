import { NextRequest, NextResponse } from "next/server";
import { dbCon } from "@/libs/mongoose/dbCon";
import { Template } from "@/models/Template";
import { readFile } from "fs/promises";
import { join } from "path";

// GET - Download template file
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    const template = await Template.findById(params.id);
    
    if (!template || !template.isActive) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    // Get student information from query parameters for exam templates
    const { searchParams } = new URL(request.url);
    const studentName = searchParams.get('studentName');
    const studentGrade = searchParams.get('studentGrade');

    try {
      // Try to read the file from the uploads directory
      const filePath = join(process.cwd(), 'public', template.filePath);
      const fileBuffer = await readFile(filePath);
      
      // Increment download count
      await Template.findByIdAndUpdate(params.id, {
        $inc: { downloadCount: 1 }
      });

      // Determine the filename
      let downloadFileName = template.fileName;
      
      // For exam templates with student info, prepend student name and grade
      if (template.category === 'exam' && studentName && studentGrade) {
        const cleanStudentName = studentName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
        const fileExtension = template.fileName.split('.').pop();
        const baseFileName = template.fileName.replace(/\.[^/.]+$/, ""); // Remove extension
        downloadFileName = `${cleanStudentName} - ${studentGrade} - ${baseFileName}.${fileExtension}`;
      }

      // Set appropriate headers for file download
      const headers = new Headers();
      headers.set('Content-Type', getContentType(template.fileType));
      headers.set('Content-Disposition', `attachment; filename="${downloadFileName}"`);
      headers.set('Content-Length', fileBuffer.length.toString());

      return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers
      });

    } catch (fileError) {
      console.error("File read error:", fileError);
      return NextResponse.json(
        { success: false, error: "File not found on server" },
        { status: 404 }
      );
    }

  } catch (error: any) {
    console.error("Template download error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper function to get content type based on file extension
function getContentType(fileType: string): string {
  const contentTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'txt': 'text/plain',
  };

  return contentTypes[fileType] || 'application/octet-stream';
}
