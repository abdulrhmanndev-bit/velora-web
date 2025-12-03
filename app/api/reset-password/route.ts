import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db.js";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { Username, Email, SecretCode, NewPassword, ConfirmPassword } = await req.json();

    // ======= VALIDATION =======
    if (!Username || !Email || !SecretCode || !NewPassword || !ConfirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (NewPassword !== ConfirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    if (NewPassword.length < 5) {
      return NextResponse.json({ error: "Password too short" }, { status: 400 });
    }

    // ======= DATABASE =======
    const db = await getAccountDB();

    const userRes = await db
      .request()
      .input("Username", Username)
      .input("Email", Email)
      .input("SecretCode", SecretCode)
      .query(`
        SELECT JID FROM dbo.TB_User 
        WHERE StrUserID=@Username AND Email=@Email AND Name=@SecretCode
      `);

    if (!userRes.recordset.length) {
      return NextResponse.json({ error: "Invalid Username, Email, or SecretCode" }, { status: 404 });
    }

    // ======= HASH PASSWORD =======
    const hashedPassword = crypto.createHash("md5").update(NewPassword).digest("hex");

    // ======= UPDATE PASSWORD =======
    const updateRes = await db
      .request()
      .input("JID", userRes.recordset[0].JID)
      .input("Password", hashedPassword)
      .query(`
        UPDATE dbo.TB_User
        SET password=@Password
        WHERE JID=@JID
      `);

    return NextResponse.json({ message: "Password has been reset successfully" });

  } catch (err: any) {
    console.error("Reset Password error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}
