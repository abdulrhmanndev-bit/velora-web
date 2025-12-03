import { NextResponse } from "next/server";
import { getAccountDB } from "@/app/db";

export async function GET() {
  try {
    const db = await getAccountDB();

    const mobNameMap: { [key: string]: string } = {
      MOB_EU_KERBEROS: "Cerberus",
      MOB_KK_ISYUTARU: "Isyutaru",
      MOB_TK_BONELORD: "Lord Yarkan",
      MOB_RM_TAHOMET: "Demon Shaitan",
      MOB_CH_TIGERWOMAN: "Tiger Girl",
      MOB_SD_SELKIS: "Selket",
      MOB_VALKYRUE: "Valkyrie Of Hell",
      MOB_AM_IVY: "Captain Ivy",
      MOB_SD_NEITH: "Neith",
      MOB_SD_ANUBIS: "Anubis",
      MOB_SD_ISIS: "Isis",
      MOB_SD_HAROERIS: "Haroeris",
      MOB_SD_SETH: "Seth",
    };

    const pointsMapping: { [key: string]: number } = {
      "Tiger Girl": 5,
      "Cerberus": 5,
      "Captain Ivy": 10,
      "Isyutaru": 15,
      "Lord Yarkan": 15,
      "Demon Shaitan": 20,
      "Medusa": 50,
      "Roc": 100,
      "Selket": 10,
      "Valkyrie Of Hell": 25,
      "Neith": 15,
      "Anubis": 20,
      "Isis": 15,
      "Haroeris": 20,
      "Seth": 25,
    };

    // Get all unique kills
    const result = await db.request().query(`
      SELECT CharName, MobName
      FROM Evangelion_uniques
    `);

    const rows = result.recordset;

    const totals: { [char: string]: number } = {};

    rows.forEach((row: any) => {
      const humanName = mobNameMap[row.MobName] || row.MobName;
      const pts = pointsMapping[humanName] || 0;

      if (!totals[row.CharName]) totals[row.CharName] = 0;
      totals[row.CharName] += pts;
    });
    

    // Top 5 players
    const ranking = Object.entries(totals)
      .map(([CharName, TotalPoints]) => ({ CharName, TotalPoints }))
      .sort((a, b) => b.TotalPoints - a.TotalPoints)
      .slice(0, 5); // <-- changed from 10 to 5

    return NextResponse.json({ ranking }, { status: 200 });
    
  } catch (err: any) {
    console.error("Unique Rank API error:", err);
    return NextResponse.json(
      { error: "Server error", detail: err.message },
      { status: 500 }
    );
  }
}
