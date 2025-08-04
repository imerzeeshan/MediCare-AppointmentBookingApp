import { clearAuthCookie, getAuthCookie } from "@/lib/cookies";
import { verifyJwt } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getAuthCookie(); // or getAuthCookie(request) if needed

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = verifyJwt(token);

    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Authenticated",
      user: decoded,
    });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
