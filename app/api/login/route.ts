// app/api/login/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getAccountDB } from "@/app/db";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export async function POST(req: Request) {
  try {
    const { Username, Password } = await req.json();
    if (!Username || !Password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const hashed = crypto.createHash("md5").update(Password).digest("hex");
    const db = await getAccountDB();
    const res = await db
      .request()
      .input("Username", Username)
      .input("Password", hashed)
      .query(`
        SELECT JID, StrUserID AS username
        FROM TB_User
        WHERE StrUserID=@Username AND password=@Password
      `);

    if (!res.recordset.length) {
      return NextResponse.json({ error: "Invalid login credentials" }, { status: 401 });
    }

    const user = res.recordset[0];
    const token = jwt.sign({ jid: user.JID, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    const response = NextResponse.json({
      message: "Login successful",
      user: { username: user.username },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (err: any) {
    console.error("Login server error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}
