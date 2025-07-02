import { dbCon } from "@/libs/mongoose/dbCon";
import { Student } from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";
type Query = { params: { id: string } };

export async function GET(req: NextRequest, { params: { id } }: Query) {
  try {
    await dbCon();
    const fetchedStudent = await Student.findOne({ _id: id })
      .populate('class', 'name grade ukey')
      .populate('guardians', 'name email phone role');
      console.log("Fetched Student:", fetchedStudent);
    if (!fetchedStudent)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );

    return NextResponse.json(fetchedStudent);
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
    const deletedStudent = await Student.findByIdAndUpdate(id, body);
    if (!deletedStudent)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: deletedStudent });
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
    let deleted =
      id === "all"
        ? await Student.deleteMany({})
        : await Student.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: deleted }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
