import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Optional: validate ID format (e.g., if numeric)
  // if (!id || isNaN(Number(id))) {
  //   return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  // }

  try {
    const [rows]: any = await db.execute("SELECT * FROM users WHERE id = ?", [
      id,
    ]);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
