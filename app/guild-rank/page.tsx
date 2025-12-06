'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

type Guild = {
  GuildID: number;
  GuildName: string;
  Lvl: number;
  GatheredSP: number;
  MemberCount: number;
};

export default function GuildRankPage() {
  const [topGuilds, setTopGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopGuilds = async () => {
      try {
        const res = await fetch("/api/guild-rank");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        setTopGuilds(json?.topGuilds || []);
      } catch (err) {
        console.error(err);
        setTopGuilds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopGuilds();
    const interval = setInterval(fetchTopGuilds, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderPlaceholderRows = () =>
    Array.from({ length: 5 }).map((_, idx) => (
      <tr key={idx} className="bg-black/40 h-12 animate-pulse">
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
      </tr>
    ));

  return (
    <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-img/home1.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={75} // reduced from 100 for faster load
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <div className="bg-black/80 rounded-2xl shadow-xl max-w-4xl w-full p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            Top 5 Guilds
          </h1>

          <div className="overflow-x-auto shadow-[0_0_50px_rgba(25,255,100,0.6)] rounded-lg">
            <table className="min-w-full divide-y divide-green-400 border border-green-500 rounded-lg">
              <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Rank</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Guild Name</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Level</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Guild SP</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Members Count</th>
                </tr>
              </thead>

              <tbody className="bg-black/50 divide-y divide-green-500 text-white">
                {loading ? renderPlaceholderRows() : 
                  topGuilds.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-3 text-center text-gray-400">
                        No guilds found
                      </td>
                    </tr>
                  ) : (
                    topGuilds.map((guild, index) => (
                      <tr
                        key={guild.GuildID}
                        onClick={() => window.location.href = `/guild/${guild.GuildName}`}
                        className={`transition-all hover:bg-green-400/30 cursor-pointer ${
                          index % 2 === 0 ? "bg-black/40" : "bg-black/50"
                        }`}
                      >
                        <td className="px-6 py-3 font-medium">{index + 1}</td>
                        <td className="px-6 py-3">{guild.GuildName}</td>
                        <td className="px-6 py-3 text-center">{guild.Lvl}</td>
                        <td className="px-6 py-3 text-center">{Math.floor(guild.GatheredSP / 1000)}</td>
                        <td className="px-6 py-3 text-center">{guild.MemberCount}</td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
