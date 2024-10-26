import { dbCon } from "@/libs/mongoose/dbCon";
import { Registration } from "@/models/RegistrationForm";
import { NextRequest, NextResponse } from "next/server";
type IQuery = {
    params:{id:string}
}
// GET: Retrieve all registrations
export async function GET(req: NextRequest, {params:{id}}:IQuery) {
  try {
    await dbCon();
    const fetchedStudent = await Registration.findById(id)
        if (!fetchedStudent) return NextResponse.json(fetchedStudent, { status: 404 });
    return NextResponse.json(fetchedStudent);
  } catch (error: any) {
    return NextResponse.json({ message: "Error " + error.message }, { status: 500 });
  }
}



// PUT: Update an existing registration
export async function PUT(req: NextRequest, {params:{id}}:IQuery) {
  try {
    const body = await req.json();
    
    await dbCon();
    const updatedRegistration = await Registration.findByIdAndUpdate(id, body, { new: true });
    if (!updatedRegistration) return NextResponse.json({ message: "Registration not found" }, { status: 404 });

    return NextResponse.json(updatedRegistration, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a registration by ID
export async function DELETE(req: NextRequest, {params:{id}}:IQuery) {
  try {
    
    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    await dbCon();
    const deletedRegistration = await Registration.findByIdAndDelete(id);
    if (!deletedRegistration) return NextResponse.json({ message: "Registration not found" }, { status: 404 });

    return NextResponse.json({ message: "Registration deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
