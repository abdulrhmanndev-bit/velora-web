import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "THE_HARDEST_SECRET_KEY";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      Username,
      Password,
      ConfirmPassword,
      Email,
      AgreeRules,
      SecretCode,
      reg_ip, // receive IP from client
    } = body;

    // =====================
    // VALIDATION
    // =====================
    if (!Username || Username.length < 5)
      return NextResponse.json({ error: "Username too short" }, { status: 400 });

    if (!Password || Password.length < 5)
      return NextResponse.json({ error: "Password too short" }, { status: 400 });

    if (Password !== ConfirmPassword)
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });

    if (!AgreeRules)
      return NextResponse.json({ error: "You must agree to the rules" }, { status: 400 });

    // =====================
    // DB CONNECT
    // =====================
    const db = await getAccountDB();

    // CHECK USER EXISTS
    const existing = await db
      .request()
      .input("Username", Username)
      .query("SELECT JID FROM dbo.TB_User WHERE StrUserID=@Username");

    if (existing.recordset.length > 0)
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });

    // HASH PASSWORD
    const hashedPassword = crypto.createHash("md5").update(Password).digest("hex");

    // =====================
    // INSERT USER
    // =====================
    const insertRes = await db
      .request()
      .input("Username", Username)
      .input("Password", hashedPassword)
      .input("Email", Email || "")
      .input("SecretCode", SecretCode || "")
      .input("RegIP", reg_ip || "0.0.0.0") // use IPv4 from client
      .query(`
        INSERT INTO dbo.TB_User
        (StrUserID, password, Email, Name, regtime, reg_ip)
        OUTPUT inserted.JID
        VALUES (@Username, @Password, @Email, @SecretCode, GETDATE(), @RegIP)
      `);

    if (!insertRes.recordset.length) throw new Error("Failed to create user.");

    const JID = insertRes.recordset[0].JID;

    // =====================
    // CREATE JWT
    // =====================
    const token = jwt.sign({ jid: JID, username: Username }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // =====================
    // SET COOKIE
    // =====================
    const response = NextResponse.json({
      success: true,
      message: "Signup successful",
      redirect: "/profile",
      user: { username: Username },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false, // set true on production (https)
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (err: any) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error", detail: err.message }, { status: 500 });
  }
}
