// app/api/guild/[guildName]/route.ts
import { NextResponse } from "next/server";
import { getShardDB } from "@/app/db";

export async function GET(req:any, context:any) {
  try {
    const params = await context.params;
    const encodedGuildName = params.guildName;
    const guildName = decodeURIComponent(encodedGuildName);

    const shard = await getShardDB();

    // 1) Get GuildID from name
    const guildRes = await shard
      .request()
      .input("GuildName", guildName)
      .query(`
        SELECT ID FROM _Guild WHERE Name = @GuildName
      `);

    if (guildRes.recordset.length === 0) {
      return NextResponse.json(
        { error: "Guild Not Found" },
        { status: 404 }
      );
    }

    const guildId = guildRes.recordset[0].ID;

    // 2) Get Members + Live ItemPoints Calculation
    const membersRes = await shard
      .request()
      .input("GuildID", guildId)
      .query(`
        SELECT 
            GM.CharID,
            GM.CharName,
            GM.CharLevel,
            GM.GuildWarKill,
            GM.GuildWarKilled,

            ISNULL((
                SELECT SUM(
                    ISNULL(b.nOptValue,0) +
                    ISNULL(i.OptLevel,0) +
                    ISNULL(r.ReqLevel1,0) +
                    ISNULL(i.MagParamNum,0) +
                    ISNULL(r.Rarity * 3,0)
                )
                FROM _Inventory inv
                LEFT JOIN _Items i ON inv.ItemID = i.ID64
                LEFT JOIN _RefObjCommon r ON i.RefItemId = r.ID
                LEFT JOIN _BindingOptionWithItem b ON b.nItemDBID = i.ID64
                WHERE inv.CharID = GM.CharID
                AND inv.Slot < 13
                AND inv.Slot NOT IN (7, 8)
            ), 0) AS ItemPoints

        FROM _GuildMember GM
        WHERE GM.GuildID = @GuildID
        ORDER BY ItemPoints DESC
      `);

    return NextResponse.json({
      guildId,
      guildName,
      members: membersRes.recordset,
    });

  } catch (err:any) {
    console.error("Guild API Error:", err);
    return NextResponse.json(
      { error: "Server Error", detail: err.message },
      { status: 500 }
    );
  }
}
