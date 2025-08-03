import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const [app] = await db.execute(`SELECT * FROM appointments WHERE email = ?`, [
    email,
  ]);
//   console.log(app);

  return NextResponse.json({ app });
}
