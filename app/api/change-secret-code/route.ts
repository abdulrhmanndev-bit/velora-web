import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db.js";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { Email, Password, RecentSecretCode, NewSecretCode } = await req.json();

    if (!Email || !Password || !RecentSecretCode || !NewSecretCode) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (NewSecretCode.length < 3) {
      return NextResponse.json({ error: "New secret code too short" }, { status: 400 });
    }

    const db = await getAccountDB();

    // Hash password for comparison
    const hashedPassword = crypto.createHash("md5").update(Password).digest("hex");

    // Verify Email + Password + RecentSecretCode
    const res = await db.request()
      .input("Email", Email)
      .input("Password", hashedPassword)
      .input("RecentSecretCode", RecentSecretCode)
      .query(`
        SELECT JID FROM TB_User 
        WHERE Email=@Email AND Password=@Password AND Name=@RecentSecretCode
      `);

    if (!res.recordset.length) {
      return NextResponse.json({ error: "Verification failed" }, { status: 401 });
    }

    const JID = res.recordset[0].JID;

    // Update new secret code
    await db.request()
      .input("NewSecretCode", NewSecretCode)
      .input("JID", JID)
      .query(`UPDATE TB_User SET Name=@NewSecretCode WHERE JID=@JID`);

    return NextResponse.json({ message: "Secret code changed successfully" });

  } catch (err: any) {
    console.error("Change secret code error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}
