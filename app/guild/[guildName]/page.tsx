"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type GuildMember = {
  CharID: number;
  CharName: string;
  CharLevel: number;
  ItemPoints: number;
  GuildWarKill: number;
  GuildWarKilled: number;
};

export default function GuildPage() {
  const { guildName: urlGuildName } = useParams();

  const [members, setMembers] = useState<GuildMember[]>([]);
  const [fetchedGuildName, setFetchedGuildName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!urlGuildName) return;

    const fetchMembers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/guild/${urlGuildName}?page=${page}`);
        if (!res.ok) {
          setMembers([]);
          setFetchedGuildName(Array.isArray(urlGuildName) ? urlGuildName[0] : urlGuildName);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setMembers(data.members || []);
        setFetchedGuildName(data.guildName || (Array.isArray(urlGuildName) ? urlGuildName[0] : urlGuildName));
      } catch (err) {
        setMembers([]);
        setFetchedGuildName(Array.isArray(urlGuildName) ? urlGuildName[0] : urlGuildName);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [urlGuildName, page]);

  const renderPlaceholderRows = () =>
    Array.from({ length: 10 }).map((_, idx) => (
      <tr key={idx} className="bg-black/40 h-12 animate-pulse">
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
        <td className="px-6 py-3">&nbsp;</td>
      </tr>
    ));

  return (
    <div className="min-h-screen flex relative items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-img/home1.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 flex items-center justify-center w-full p-6">
        <div className="bg-black/80 rounded-2xl shadow-xl max-w-6xl w-full p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
            ({fetchedGuildName}) Members
          </h1>

          <div className="overflow-x-auto shadow-[0_0_50px_rgba(25,255,100,0.6)] rounded-lg">
            <table className="min-w-full divide-y divide-green-400 border border-green-500 rounded-lg">
              <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Rank</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Char Name</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Level</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">Item Points</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">GuildWar Kill</th>
                  <th className="px-6 py-3 text-sm font-bold uppercase text-orange-700">GuildWar Killed</th>
                </tr>
              </thead>

              <tbody className="bg-black/50 divide-y divide-green-500 text-white">
                {loading
                  ? renderPlaceholderRows()
                  : members.length === 0
                  ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-3 text-center text-gray-400">
                        No members found for {fetchedGuildName}
                      </td>
                    </tr>
                  )
                  : members.map((m, idx) => (
                      <tr
                        key={m.CharID}
                        className={`transition-all hover:bg-green-400/30 ${idx % 2 === 0 ? "bg-black/40" : "bg-black/50"}`}
                      >
                        <td className="px-6 py-3 font-medium">{idx + 1 + (page - 1) * 50}</td>
                        <td className="px-6 py-3">{m.CharName}</td>
                        <td className="px-6 py-3 text-center">{m.CharLevel}</td>
                        <td className="px-6 py-3 text-center">{m.ItemPoints}</td>
                        <td className="px-6 py-3 text-center">{m.GuildWarKill}</td>
                        <td className="px-6 py-3 text-center">{m.GuildWarKilled}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-white font-semibold">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={members.length < 50}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
