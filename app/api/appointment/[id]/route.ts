import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { date, email, name, id, doctorId } = body;
    console.log(doctorId);

    // Basic validation
    if (!date || !email || !id || !doctorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert into appointments table
    const res = await db.execute(
      `INSERT INTO appointments (user_id, doctor_id, appointment_date, status, email)
       VALUES (?, ?, ?, ?, ?)`,
      [id, doctorId, date, "scheduled", email]
    );

    console.log("New appointment booked:", body, res);

    return NextResponse.json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
