import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [doctors] = await db.execute(`SELECT * FROM doctors`);

  return NextResponse.json(doctors);
}
