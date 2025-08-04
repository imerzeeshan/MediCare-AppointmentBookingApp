import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { date, email, name, id: userId, doctorId } = await req.json();

    console.log(date, email, name, userId, doctorId);

    // Validate required fields
    if (!date || !email || !userId || !doctorId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate date format
    if (isNaN(Date.parse(date))) {
      return NextResponse.json(
        { success: false, error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Optional: check if user exists
    // const [userRows]: any = await db.execute("SELECT id FROM users WHERE id = ?", [userId]);
    // if (userRows.length === 0) {
    //   return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    // }

    // Optional: check if doctor exists
    // const [doctorRows]: any = await db.execute("SELECT id FROM doctors WHERE id = ?", [doctorId]);
    // if (doctorRows.length === 0) {
    //   return NextResponse.json({ success: false, error: "Doctor not found" }, { status: 404 });
    // }

    // Insert into appointments
    const [result]: any = await db.execute(
      `INSERT INTO appointments (user_id, doctor_id, appointment_date, status, email)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, doctorId, date, "scheduled", email]
    );

    console.log("New appointment booked:", result);

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
