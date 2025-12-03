// app/api/guild-rank/route.ts
import { NextResponse } from "next/server";
import { getShardDB } from "@/app/db.js";

export async function GET() {
  try {
    const shard = await getShardDB();

    // Get top 5 guilds sorted by Lvl DESC, then GatheredSP DESC
    const result = await shard.request().query(`
      SELECT TOP 5
        ID AS GuildID,
        Name AS GuildName,
        Lvl,
        GatheredSP
      FROM _Guild
      ORDER BY Lvl DESC, GatheredSP DESC
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
