import { clearAuthCookie, getAuthCookie } from "@/lib/cookies";
import { verifyJwt } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getAuthCookie();
  const decoded = token && verifyJwt(token);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Authenticated", user: decoded });
}

