import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db";

export async function GET() {
  try {
    const db = await getAccountDB();

    const result = await db.request().query(`
      SELECT 
        u1.CharName, 
        u1.MobName, 
        u1.time,
        CASE 
          WHEN DATEADD(HOUR, 1, CONVERT(datetime, u1.time, 100)) > GETDATE() 
          THEN 'Dead' 
          ELSE 'Alive' 
        END AS Status
      FROM Evangelion_uniques u1
      INNER JOIN (
        SELECT MobName, MAX(CONVERT(datetime, time, 100)) AS lastKill
        FROM Evangelion_uniques
        GROUP BY MobName
      ) u2
      ON u1.MobName = u2.MobName AND CONVERT(datetime, u1.time, 100) = u2.lastKill
      ORDER BY CONVERT(datetime, u1.time, 100) DESC
    `);

    return NextResponse.json({ data: result.recordset }, { status: 200 });
    
  } catch (err: any) {
    console.error("Unique log API error:", err);
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}
