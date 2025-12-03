import { NextResponse } from "next/server";
import { getShardDB } from "@/app/db.js";

export async function GET() {
  try {
    const shard = await getShardDB();

    const result = await shard.request().query(`
      SELECT 
          f.FortressID,
          g.ID AS GuildID,
          g.Name AS GuildName
      FROM _SiegeFortress f
      LEFT JOIN _Guild g ON g.ID = f.GuildID
      WHERE f.FortressID IN (1, 3, 6)
    `);

    return NextResponse.json({ data: result.recordset });
  } catch (err: any) {
    console.error("Error fetching fortresses:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
