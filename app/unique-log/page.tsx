"use client";
import { useEffect, useState } from "react";

interface UniqueLog {
  CharName: string;
  MobName: string;
  time: string;
  Status:string;
}

export default function UniqueLogPage() {
  const [players, setPlayers] = useState<UniqueLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const res = await fetch("/api/unique-log");
      const data = await res.json();

      const latestKillsMap: { [mob: string]: UniqueLog } = {};
      (data.data || []).forEach((row: UniqueLog) => {
        const existing = latestKillsMap[row.MobName];
        if (!existing || new Date(row.time).getTime() > new Date(existing.time).getTime()) {
          latestKillsMap[row.MobName] = row;
        }
      });

      const sorted = Object.values(latestKillsMap).sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      );

      setPlayers(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 font-medium">
        Loading...
      </div>
    );

  const mobNameMap: { [key: string]: string } = {
    MOB_EU_KERBEROS: "Cerberus",
    MOB_KK_ISYUTARU: "Isyutaru",
    MOB_TK_BONELORD: "Lord Yarkan",
    MOB_RM_TAHOMET: "Devil Shaitan",
    MOB_CH_TIGERWOMAN: "Tiger Girl",
    MOB_SD_SELKIS: "Selket",
    MOB_VALKYRUE: "Valkyrie Of Hell",
    MOB_AM_IVY: "Captin Ivy",
    MOB_SD_NEITH: "Neith",
    MOB_SD_ANUBIS: "Anubis",
    MOB_SD_ISIS: "Isis",
    MOB_SD_HAROERIS: "Haroeris",
    MOB_SD_SETH: "Seth",
    MOB_EV_WINTER_WHITEKNIGHT_100: "White Knight",
    MOB_KNIGHT_MAGIC_TOPS4A: "Knight Of Magic",
    MOB_DEMON_OF_DEATH_TOPS4A: "Demon Of Death",
    MOB_TOPS4A_PENDRAGON: "Pendragon",
    MOB_EV_WINTER_PRINCESS_100: "Princess Miyene",
  };

  const formatTime = (sqlString: string) => {
    const parts = sqlString.trim().split(/\s+/);
    if (parts.length < 4) return sqlString;
    return parts[3].replace(/(AM|PM)/, " $1");
  };

  return (
    <div
      className="h-screen flex relative items-center justify-center text-center before:absolute before:inset-0 before:bg-black/50"
      style={{
        backgroundImage: "url('/bg-img/home1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/70 rounded-2xl shadow-xl w-full max-w-4xl p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            Unique Log
          </h1>

          <div className="overflow-x-auto shadow-[0_0_50px_rgba(25,255,100,0.6)]">
            <table className="min-w-full divide-y divide-green-400 border border-green-500 rounded-lg">
              <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Player Name
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Unique Name
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Last Killed Time
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-black/50 divide-y divide-green-500 text-white">
                {players.map((row, index) => (
                  <tr
                    key={index}
                    className={`transition-all hover:bg-green-400/30 ${
                      index % 2 === 0 ? "bg-black/40" : "bg-black/50"
                    }`}
                  >
                    <td className="px-6 py-3 font-medium text-red-300">{row.CharName}</td>
                    <td className="px-6 py-3">{mobNameMap[row.MobName] || row.MobName}</td>
                    <td className="px-6 py-3 font-semibold text-orange-300">{formatTime(row.time)}</td>
                    <td className="px-6 py-3 font-medium text-red-300">{row.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
