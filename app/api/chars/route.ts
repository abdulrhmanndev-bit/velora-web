import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getShardDB } from "@/app/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// MasteryID → Class mapping
const masteryClassMap: Record<number, string> = {
  // CH Masteries
  257: "Sword",
  258: "Spear",
  259: "Bow",
  273: "Cold",
  274: "Lightning",
  275: "Fire",
  276: "Water",
  289: "GM",
  // EU Masteries
  513: "Warrior",
  514: "Wizard",
  515: "Rogue",
  516: "Warlock",
  517: "Bard",
  518: "Cleric",
};

// Job mapping
const jobTypes: Record<number, string> = {
  0: "No Job",
  1: "Trader",
  2: "Thief",
  3: "Hunter",
};

export async function GET() {
  try {
    const shard = await getShardDB();

    // Get token from cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const jid = decoded.jid;
    if (!jid)
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 400 }
      );

    // Get all CharIDs for this JID
    const charIdsRes = await shard
      .request()
      .input("jid", jid)
      .query(`
        SELECT CharID FROM dbo._User WHERE UserJID=@jid
      `);

    const charIDs = charIdsRes.recordset.map((x: any) => x.CharID);
    if (!charIDs.length) return NextResponse.json({ chars: [] });

    const chars = [];

    for (const charId of charIDs) {
      const charRes = await shard
        .request()
        .input("charId", charId)
        .query(`
          SELECT CharName16, CurLevel, HP, MP, RemainGold, LastLogout, RefObjID
          FROM dbo._Char
          WHERE CharID=@charId
        `);

      if (!charRes.recordset.length) continue;
      const charData = charRes.recordset[0];

      // Get mastery info for the char
      const masteryRes = await shard
        .request()
        .input("charId", charId)
        .query(`
          SELECT MasteryID, Level
          FROM dbo._CharSkillMastery
          WHERE CharID=@charId
        `);

      const masteryLevels = masteryRes.recordset;

      // Determine Race
      let race = "Unknown";
      const chRaceIDs = [257, 258, 259, 273, 274, 275, 276];
      const euRaceIDs = [513, 514, 515, 516, 517, 518];

      if (masteryLevels.some((m: any) => chRaceIDs.includes(m.MasteryID)))
        race = "CH";
      else if (masteryLevels.some((m: any) => euRaceIDs.includes(m.MasteryID)))
        race = "EU";

      // Determine Classes
      const classes: string[] = [];
      masteryLevels.forEach((m: any) => {
        if (m.Level > 1 && masteryClassMap[m.MasteryID]) {
          classes.push(masteryClassMap[m.MasteryID]);
        }
      });

      // Job Info
      const jobRes = await shard
        .request()
        .input("charId", charId)
        .query(`
          SELECT JobType, Level
          FROM dbo._CharTrijob
          WHERE CharID=@charId
        `);

      let jobType = "No Job";
      let jobLevel = 0;
      if (jobRes.recordset.length) {
        const j = jobRes.recordset[0];
        jobType = jobTypes[j.JobType] ?? "No Job";
        jobLevel = j.Level ?? 0;
      }

      // Guild Info
      const guildRes = await shard
        .request()
        .input("charId", charId)
        .query(`
          SELECT gm.GuildID, gm.Nickname, g.Name AS GuildName
          FROM dbo._GuildMember gm
          LEFT JOIN dbo._Guild g ON gm.GuildID = g.ID
          WHERE gm.CharID=@charId
        `);

      let guildName: string | null = null;
      let grantName: string | null = null;

      if (guildRes.recordset.length) {
        guildName = guildRes.recordset[0].GuildName ?? null;
        grantName = guildRes.recordset[0].Nickname ?? null;
      }

      // Add Face image
      const faceId = charData.RefObjID;
      const faceImage = `/faces/${faceId}.gif`;

      chars.push({
        ...charData,
        Face: faceImage,
        Race: race,
        Class: classes.length ? classes.join(" / ") : null,
        JobType: jobType,
        JobLevel: jobLevel,
        Name: guildName,
        Nickname: grantName,
      });
    }

    return NextResponse.json({ chars });
  } catch (err: any) {
    console.error("Get chars error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
