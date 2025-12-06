'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";

type RankItem = {
  CharName: string;
  TotalPoints: number;
};

export default function UniqueRankTable() {
  const [ranking, setRanking] = useState<RankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch("/api/unique-rank");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        const raw = Array.isArray(json?.ranking) ? json.ranking : json?.data ?? [];
        const normalized: RankItem[] = (raw as any[]).map((item, i) => ({
          CharName: String(item?.CharName ?? item?.charName ?? `Player ${i + 1}`),
          TotalPoints: Number(item?.TotalPoints ?? item?.totalPoints ?? 0),
        }));
        setRanking(normalized);
      } catch (err) {
        console.error(err);
        setRanking([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
    const interval = setInterval(fetchRanking, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderPlaceholderRows = () =>
    Array.from({ length: 10 }).map((_, idx) => (
      <tr key={idx} className="bg-black/40 h-12 animate-pulse">
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
      </tr>
    ));

  const getRankClass = (index: number) => {
    switch (index) {
      case 0:
        return "text-yellow-400 font-bold";
      case 1:
        return "text-gray-300 font-bold";
      case 2:
        return "text-orange-300 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="h-screen relative flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-img/home1.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <div className="bg-black/80 rounded-2xl shadow-xl max-w-4xl w-full p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            Top 10 Unique Hunters
          </h1>

          <div className="overflow-x-auto shadow-[0_0_50px_rgba(25,255,100,0.6)] rounded-lg">
            <table className="min-w-full divide-y divide-green-400 border border-green-500 rounded-lg">
              <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Rank</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Player Name</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Unique Points</th>
                </tr>
              </thead>

              <tbody className="bg-black/50 divide-y divide-green-500 text-white">
                {loading
                  ? renderPlaceholderRows()
                  : ranking.map((player, index) => (
                      <tr
                        key={`${player.CharName}-${index}`}
                        className={`transition-all hover:bg-green-400/30 ${
                          index % 2 === 0 ? "bg-black/40" : "bg-black/50"
                        }`}
                      >
                        <td className={`px-6 py-3 ${getRankClass(index)}`}>{index + 1}</td>
                        <td className="px-6 py-3">{player.CharName}</td>
                        <td className="px-6 py-3 font-semibold text-green-300">{player.TotalPoints}</td>
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
