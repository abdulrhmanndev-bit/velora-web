"use client";
import { useEffect, useState } from "react";

interface Player {
  CharID: number;
  CharName16: string;
  ItemPoints: number;
  HonorPoint: number;
}

export default function PlayersRanking() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const res = await fetch("/api/players-ranking");
      const data = await res.json();
      setPlayers(data.data || []);
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
      <div className="absolute flex items-center justify-center w-full">
        <div className="bg-black/70 rounded-2xl shadow-xl max-w-4xl w-full p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            TOP 10 Players Ranking
          </h1>

          <div className="overflow-x-auto shadow-[0_0_50px_rgba(25,255,100,0.6)]">
            <table className="min-w-full divide-y divide-green-400 border border-green-500 rounded-lg">
              <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Player Name
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Item Points
                  </th>
                  <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-orange-700">
                    Honor Points
                  </th>
                </tr>
              </thead>

              <tbody className="bg-black/50 divide-y divide-green-500 text-white">
                {players.map((player, index) => (
                  <tr
                    key={player.CharID}
                    className={`transition-all hover:bg-green-400/30 ${
                      index % 2 === 0 ? "bg-black/40" : "bg-black/50"
                    }`}
                  >
                    <td className="px-6 py-3 font-medium">{index + 1}</td>
                    <td className="px-6 py-3">{player.CharName16}</td>
                    <td className="px-6 py-3 font-semibold text-green-300">
                      {player.ItemPoints}
                    </td>
                    <td className="px-6 py-3 font-semibold text-green-300">
                      {player.HonorPoint}
                    </td>
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
