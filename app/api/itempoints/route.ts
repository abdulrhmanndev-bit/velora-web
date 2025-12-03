import { NextResponse } from "next/server";
import { getShardDB } from "@/app/db.js";

export async function GET() {
  try {
    const shard = await getShardDB();

    // Get top 10 characters sorted by ItemPoints DESC
    const charsRes = await shard.request().query(`
      SELECT TOP 10
        c.CharID,
        c.CharName16,
        ISNULL(SUM(
          ISNULL(b.nOptValue,0) +
          ISNULL(i.OptLevel,0) +
          ISNULL(r.ReqLevel1,0) +
          ISNULL(i.MagParamNum,0) +
          ISNULL(r.Rarity*3,0)
        ),0) AS ItemPoints,
        ISNULL(t.HonorPoint, 0) AS HonorPoint
      FROM dbo._Char AS c
      LEFT JOIN dbo._Inventory AS inv 
        ON inv.CharID = c.CharID 
        AND inv.Slot < 13 
        AND inv.Slot NOT IN (7,8)
      LEFT JOIN dbo._Items AS i 
        ON i.ID64 = inv.ItemID
      LEFT JOIN dbo._RefObjCommon AS r 
        ON i.RefItemId = r.ID
      LEFT JOIN dbo._BindingOptionWithItem AS b 
        ON b.nItemDBID = i.ID64
      LEFT JOIN dbo._TrainingCampMember AS t
        ON t.CharID = c.CharID
      GROUP BY c.CharID, c.CharName16, t.HonorPoint
      ORDER BY ItemPoints DESC
    `);

    return NextResponse.json({ data: charsRes.recordset });
  } catch (err: any) {
    console.error("Error fetching top item points:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
