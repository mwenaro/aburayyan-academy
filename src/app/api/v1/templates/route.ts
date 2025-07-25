import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth/auth";
import { dbCon } from "@/libs/mongoose/dbCon";
import { Template } from "@/models/Template";
import { ClassModel } from "@/models/Class";

// GET - Fetch all templates with optional filtering
export async function GET(request: NextRequest) {
  try {
    await dbCon();
    
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade');
    const category = searchParams.get('category');
    const subject = searchParams.get('subject');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = { isActive: true };
    
    if (grade && grade !== 'all') {
      filter.grade = grade;
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (subject && subject !== 'all') {
      filter.subject = subject;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Fetch templates with pagination
    const [templates, total, grades] = await Promise.all([
      Template.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Template.countDocuments(filter),
      ClassModel.find({}, 'name').sort({ name: 1 }).lean() // Get available grades
    ]);

    // Get unique categories and subjects for filtering
    const categories = await Template.distinct('category', { isActive: true });
    const subjects = await Template.distinct('subject', { isActive: true, subject: { $ne: null } });

    return NextResponse.json({
      success: true,
      data: {
        templates,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        filters: {
          grades: grades.map(g => g.name),
          categories,
          subjects
        }
      }
    });

  } catch (error: any) {
    console.error("Templates fetch error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new template
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
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
      fileName,
      filePath,
      fileType,
      fileSize,
      grade,
      subject,
      category,
      tags
    } = body;

    // Validate required fields
    if (!title || !fileName || !filePath || !fileType || !grade || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if template with same title and grade already exists
    const existingTemplate = await Template.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
      grade,
      isActive: true
    });

    if (existingTemplate) {
      return NextResponse.json(
        { success: false, error: "A template with this title already exists for this grade" },
        { status: 409 }
      );
    }

    // Create new template
    const template = new Template({
      title,
      description,
      fileName,
      filePath,
      fileType,
      fileSize,
      grade,
      subject,
      category,
      tags: tags || [],
      uploadedBy: {
        userId: session.user.id || 'unknown',
        userName: session.user.name || 'Unknown User',
        userRole: session.user.role || 'user'
      }
    });

    await template.save();

    return NextResponse.json({
      success: true,
      data: template,
      message: "Template uploaded successfully"
    }, { status: 201 });

  } catch (error: any) {
    console.error("Template creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
