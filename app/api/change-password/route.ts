import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db.js"; // تأكد أن هذا المسار صحيح
import crypto from "crypto";

// الـ API هذا يفترض أنه موجود في /api/change-password/route.ts
export async function POST(req: Request) {
  try {
    const { 
        Email, 
        SecretCode, // الرمز السري (Name في DB)
        NewPassword // كلمة المرور الجديدة 
    } = await req.json();

    // التحقق من الحقول المطلوبة
    if (!Email || !SecretCode || !NewPassword) {
      return NextResponse.json({ error: "All fields (Email, Secret Code, New Password) are required" }, { status: 400 });
    }

    if (NewPassword.length < 3) {
      return NextResponse.json({ error: "New password too short" }, { status: 400 });
    }

    const db = await getAccountDB();

    // 1. Hash كلمة المرور الجديدة (NewPassword) لحفظها
    // يجب استخدام نفس طريقة التشفير (MD5) التي تستخدمها قاعدة بياناتك
    const hashedNewPassword = crypto.createHash("md5").update(NewPassword).digest("hex");

    // 2. التحقق من Email و SecretCode (عمود Name) فقط
    const res = await db.request()
      .input("Email", Email)
      .input("SecretCode", SecretCode) 
      .query(`
        SELECT JID FROM TB_User 
        WHERE Email=@Email AND Name=@SecretCode
      `);

    if (!res.recordset.length) {
      return NextResponse.json({ error: "Invalid Email or Secret Code." }, { status: 401 });
    }

    const JID = res.recordset[0].JID;

    // 3. تحديث كلمة المرور الجديدة في عمود 'Password'
    await db.request()
      .input("NewPasswordHash", hashedNewPassword) 
      .input("JID", JID)
      .query(`UPDATE TB_User SET Password=@NewPasswordHash WHERE JID=@JID`);

    return NextResponse.json({ message: "Password changed successfully" });

  } catch (err: any) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}