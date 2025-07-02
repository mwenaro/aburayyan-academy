import { dbCon } from "@/libs/mongoose/dbCon";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
type Query = { params: { id: string } };

export async function GET(req: NextRequest, { params: { id } }: Query) {
  try {
    await dbCon();
    const fetchedUser = await User.findOne({ _id: id, role:"teacher" });
    if (!fetchedUser)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );

    return NextResponse.json(fetchedUser);
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
    const deletedUser = await User.findByIdAndUpdate(id, body);
    if (!deletedUser)
      return NextResponse.json(
        { success: false, message: "Not Found" },
        { status: 404 }
      );
    return NextResponse.json({ success: true, data: deletedUser });
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
    const updatedUsers = await User.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, data: updatedUsers },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
