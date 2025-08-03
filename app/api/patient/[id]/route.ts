import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const [res] = await db.execute(`SELECT * FROM users WHERE id = ?`, [id]);

  return NextResponse.json(res);
}
