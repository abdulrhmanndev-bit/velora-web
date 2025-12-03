import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getAccountDB } from "@/app/db.js";

export const dynamic = "force-dynamic";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const live = searchParams.get("live");

  // ===== SSE MODE =====
  if (live === "1") {
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        let lastSilk = -1;

        while (true) {
          try {
            const cookieStore = cookies();
            const token = (await cookieStore).get("token")?.value;
            if (!token) break;

            let decoded: any;
            try {
              decoded = jwt.verify(token, JWT_SECRET);
            } catch {
              break;
            }

            const jid = decoded.jid;
            const db = await getAccountDB();

            const userRes = await db.request()
              .input("JID", jid)
              .query(`
                SELECT silk_own
                FROM SK_Silk WHERE JID=@JID
              `);

            const silk = userRes.recordset[0]?.silk_own ?? 0;

            if (silk !== lastSilk) {
              lastSilk = silk;

              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ silk_own: silk })}\n\n`
                )
              );
            }

            await new Promise(res => setTimeout(res, 2000)); // check every 2 sec
          } catch (err) {
            console.error("SSE Error /me:", err);
            break;
          }
        }

        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
      },
    });
  }

  // ===== NORMAL MODE =====
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    let decoded: any = jwt.verify(token, JWT_SECRET);
    const jid = decoded.jid;

    const db = await getAccountDB();

    const userRes = await db.request()
      .input("JID", jid)
      .query(`
        SELECT u.StrUserID AS username, s.silk_own
        FROM TB_User u
        LEFT JOIN SK_Silk s ON u.JID = s.JID
        WHERE u.JID = @JID
      `);

    const user = userRes.recordset[0];

    return NextResponse.json({
      username: user.username,
      silk_own: user.silk_own
    });

  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
