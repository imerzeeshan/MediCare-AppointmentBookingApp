import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const [data] = await db.execute(`SELECT * FROM doctors WHERE id = ?`, [id]);

  return Response.json(data[0]);
}
