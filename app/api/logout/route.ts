// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax",   // خلي نفس القيمة اللي في login
    path: "/",
    expires: new Date(0), // حذف الكوكي
  });

  return res;
}
