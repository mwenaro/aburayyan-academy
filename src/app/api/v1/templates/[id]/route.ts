import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth/auth";
import { dbCon } from "@/libs/mongoose/dbCon";
import { Template } from "@/models/Template";

// GET - Fetch single template by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbCon();
    
    const template = await Template.findById(params.id);
    
    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: template
    });

  } catch (error: any) {
    console.error("Template fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update template
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    await dbCon();
    
    const body = await request.json();
    const {
      title,
      description,
      grade,
      subject,
      category,
      tags,
      isActive
    } = body;

    const template = await Template.findById(params.id);
    
    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    // Check permissions (only admin or template owner can update)
    const isAdmin = session.user.role === 'admin';
    const isOwner = template.uploadedBy.userId === session.user.id;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    // Update template
    const updatedTemplate = await Template.findByIdAndUpdate(
      params.id,
      {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(grade && { grade }),
        ...(subject !== undefined && { subject }),
        ...(category && { category }),
        ...(tags && { tags }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedTemplate,
      message: "Template updated successfully"
    });

  } catch (error: any) {
    console.error("Template update error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete template
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    await dbCon();
    
    const template = await Template.findById(params.id);
    
    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    // Check permissions (only admin or template owner can delete)
    const isAdmin = session.user.role === 'admin';
    const isOwner = template.uploadedBy.userId === session.user.id;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: "Permission denied" },
        { status: 403 }
      );
    }

    // Soft delete (set isActive to false)
    await Template.findByIdAndUpdate(params.id, { isActive: false });

    return NextResponse.json({
      success: true,
      message: "Template deleted successfully"
    });

  } catch (error: any) {
    console.error("Template deletion error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
