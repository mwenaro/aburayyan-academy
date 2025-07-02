import { dbCon } from "@/libs/mongoose/dbCon";
import { ClassModel } from "@/models/Class";
import { NextRequest, NextResponse } from "next/server";
type Query = { params: { id: string } };

export async function GET(req: NextRequest, { params: { id } }: Query) {
  try {
    await dbCon();
    const fetchedClass = await ClassModel.findOne({ _id: id });
    if (!fetchedClass)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );

    return NextResponse.json(fetchedClass);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params: { id } }: Query) {
  const body = await req.json();
  try {
    await dbCon();
    const updatedClass = await ClassModel.findByIdAndUpdate(id, body);
    if (!updatedClass)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: updatedClass });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: Query) {
  try {
    await dbCon();
    const deletedClasss = await ClassModel.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, data: deletedClasss },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
