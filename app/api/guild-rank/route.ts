import { NextResponse } from "next/server";
import { getShardDB } from "@/app/db.js";

export async function GET() {
  try {
    const shard = await getShardDB();

    // تم تعديل الاستعلام ليستخدم دمج البيانات (LEFT JOIN) والتجميع (GROUP BY)
    // بدلاً من الاستعلامات الفرعية لتحسين الأداء بشكل كبير.
    // هذا الاستعلام يحسب الترتيب مباشرة من قواعد البيانات الحية.
    const result = await shard.request().query(`
      SELECT TOP 5
          G.ID AS GuildID,
          G.Name AS GuildName,
          G.Lvl,
          G.GatheredSP,
          COUNT(GM.CharID) AS MemberCount,
          MAX(GM.CharLevel) AS MaxMemberLevel
      FROM
          _Guild G
      LEFT JOIN
          _GuildMember GM ON G.ID = GM.GuildID
      GROUP BY
          G.ID,
          G.Name,
          G.Lvl,
          G.GatheredSP
      ORDER BY
          MemberCount DESC,
          G.Lvl DESC,
          G.GatheredSP DESC;
    `);

    return NextResponse.json({ topGuilds: result.recordset }, { status: 200 });
  } catch (err: any) {
    console.error("Guild Rank API error:", err);
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}