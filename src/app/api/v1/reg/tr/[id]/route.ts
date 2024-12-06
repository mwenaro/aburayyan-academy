import { dbCon } from "@/libs/mongoose/dbCon";
import { TeacherSubject } from "@/models/TeacherSub";
import { NextRequest, NextResponse } from "next/server";
type Query = { params: { id: string } };

export async function GET(req: NextRequest, { params: { id } }: Query) {
  try {
    await dbCon();
    const fetchedTr = await TeacherSubject.findOne({ _id: id });
    if (!fetchedTr)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );

    return NextResponse.json(fetchedTr);
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
    const deletedTr = await TeacherSubject.findByIdAndUpdate(id, body);
    if (!deletedTr)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: deletedTr });
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
    const updatedTrs = await TeacherSubject.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, data: updatedTrs },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
