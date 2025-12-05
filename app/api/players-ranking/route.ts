import { NextResponse } from "next/server";
import { getShardDB } from "@/app/db.js";

export async function GET() {
  try {
    const shard = await getShardDB();

    const charsRes = await shard.request().query(`
      SELECT TOP 10
          c.CharID,
          c.CharName16,

          
          ISNULL((
              SELECT 
                  SUM(
                      ISNULL(b.nOptValue, 0) +
                      ISNULL(i.OptLevel, 0) +
                      ISNULL(r.ReqLevel1, 0) +
                      ISNULL(i.MagParamNum, 0) +
                      ISNULL(r.Rarity * 3, 0)
                  )
              FROM dbo._Inventory inv
              LEFT JOIN dbo._Items i ON i.ID64 = inv.ItemID
              LEFT JOIN dbo._RefObjCommon r ON r.ID = i.RefItemId
              LEFT JOIN dbo._BindingOptionWithItem b ON b.nItemDBID = i.ID64
              WHERE inv.CharID = c.CharID
              AND inv.Slot < 13
              AND inv.Slot NOT IN (7, 8)
          ), 0) AS ItemPoints,

          -- Honor Points
          ISNULL(t.HonorPoint, 0) AS HonorPoint

      FROM dbo._Char c
      LEFT JOIN dbo._TrainingCampMember t ON t.CharID = c.CharID
      ORDER BY ItemPoints DESC;
    `);

    return NextResponse.json({ data: charsRes.recordset });

  } catch (err: any) {
    console.error("Error fetching top item points:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
