// /api/reset-secret-code/route.ts
import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db.js"; // تأكد أن المسار صحيح
import crypto from "crypto"; // لو عايز تستخدم تشفير لكلمات المرور

export async function POST(req: Request) {
  try {
    const { Email, CurrentPassword, NewSecretCode } = await req.json();

    // تحقق من الحقول المطلوبة
    if (!Email || !CurrentPassword || !NewSecretCode) {
      return NextResponse.json(
        { error: "Email, Current Password and New Secret Code are required" },
        { status: 400 }
      );
    }

    const db = await getAccountDB();

    // 1️⃣ تحقق من صحة البريد وكلمة المرور الحالية
    // إذا كلمة المرور مخزنة مشفرة بـ MD5، فكّر تستخدم التشفير هنا
    const hashedPassword = crypto.createHash("md5").update(CurrentPassword).digest("hex");

    const userRes = await db
      .request()
      .input("Email", Email)
      .input("Password", hashedPassword)
      .query("SELECT JID FROM TB_User WHERE Email=@Email AND Password=@Password");

    if (!userRes.recordset.length) {
      return NextResponse.json({ error: "Email or password is incorrect" }, { status: 401 });
    }

    const JID = userRes.recordset[0].JID;

    // 2️⃣ تحديث SecretCode
    await db
      .request()
      .input("NewSecretCode", NewSecretCode)
      .input("JID", JID)
      .query("UPDATE TB_User SET Name=@NewSecretCode WHERE JID=@JID");

    return NextResponse.json({ message: "Secret code has been reset successfully" });

  } catch (err: any) {
    console.error("Reset Secret Code error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}
