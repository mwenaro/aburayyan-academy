import { dbCon } from "@/libs/mongoose/dbCon";
import { School } from "@/models/School";
import { NextRequest, NextResponse } from "next/server";
type Query = { params: { id: string } };

export async function GET(req: NextRequest, { params: { id } }: Query) {
  try {
    await dbCon();
    const fetchedSchool = await School.findOne({ _id: id });
    if (!fetchedSchool)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );

    return NextResponse.json(fetchedSchool);
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
    const deletedSchool = await School.findByIdAndUpdate(id, body);
    if (!deletedSchool)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: deletedSchool });
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
    const updatedSchools = await School.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, data: updatedSchools },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
