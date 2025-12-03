"use client";

import { useState } from "react";
import Image from "next/image";

const IMAGE_SIZE_CLASS = "w-36 h-36 md:w-48 md:h-48";

export default function AboutPage() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  const openModal = (src: string) => setModalImg(src);
  const closeModal = () => setModalImg(null);

  return (
    <main
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: "url('/bg-img/home1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-3xl font-bold mb-6 text-emerald-300">Server Information</h2>

            <div className="text-green-100/90 text-lg space-y-4">
              <div className="text-red-400 font-bold bg-green-900/40 p-3 rounded-lg">
                PVE MMORPG GAME (LongTerm) PROGRESSIVE
              </div>

              {[
                ["Current Cap:", "110, D11 Coin System", "text-yellow-300"],
                ["Upcoming Update:", "D12 | Cap 120 (Mirror Temple Jupiter)", "text-yellow-300"],
                ["PC Limit:", "Unlimited", "text-yellow-300"],
                ["IP Limit:", "Unlimited", "text-yellow-300"],
                ["Honor System:", "Like Isro System", "text-yellow-300"],
                ["Auto Events:", "Yes", "text-yellow-300"],
                ["Guild Limit:", "50", "text-yellow-300"],
                ["Union Limit:", "8", "text-yellow-300"],
                ["BOT:", "Allowed (All Kind Of BOTS)", "text-yellow-300"],
                ["Arena Manager:", "Working", "text-yellow-300"],
                ["Mastery Cap:", "220 EU/330 CH", "text-yellow-300"],
                ["EXP Rate:", "2x", "text-yellow-300"],
                ["Drop Rate:", "1.5x", "text-yellow-300"],
                ["Alchemy Rate:", "1.5x", "text-yellow-300"],
                ["Gold Rate:", "1.5x", "text-yellow-300"],
                ["Max Plus:", "10 without adv", "text-yellow-300"],
                ["Fortress War:", "Hotan (With a good reward)", "text-yellow-300"],
                ["Fortress War Day:", "Friday 8 PM to 9:30 PM", "text-yellow-300"],
                ["Play 2 win:", "Yes", "text-yellow-300"],
                ["Server Race:", "CH & EU", "text-yellow-300"],
                ["Unique Silk Drop:", "Yes 2 New Uniques Added", "text-yellow-300"],
                ["Start Date:", "20/10/2025", "text-yellow-300"],
              ].map(([title, value, extra], i) => (
                <div key={i} className="grid grid-cols-2 border-b border-green-800/30 pb-2 last:border-none">
                  <span className="font-semibold text-emerald-300">{title}</span>
                  <span className={extra || "text-white/85"}>{value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">Start Items</h2>

            <div className="flex flex-row items-center sm:items-start justify-center gap-8 pt-4">
              <div className="flex flex-col text-left w-full sm:w-auto space-y-2">
                {[
                  ["Start Level:", "1"],
                  ["100EXP HELPER:", "Included"],
                  ["Nasrun:", "7 days"],
                  ["Scrolls/Drugs:", "10x Speed Drug, Reverse, Instant, Berserker"],
                  ["HP/MP Pots:", "1k MP, 1k HP"],
                ].map(([title, value], i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">{title}</span>
                    <span className="text-white/80">{value}</span>
                  </div>
                ))}
              </div>
              <img
                src="/about/start items.png"
                className={`object-contain cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ${IMAGE_SIZE_CLASS}`}
                alt="Start Items"
                onClick={() => openModal("/about/start items.png")}
              />
            </div>
          </section>

          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">NPC & Trade</h2>

            <div className="flex flex-row items-center sm:items-start justify-center gap-8 pt-4">
              <div className="flex flex-col text-left w-full sm:w-auto space-y-2">
                {[
                  ["NPC Items:", "DG1–DG9 1 Gold, Full Blue 80% state"],
                  ["Trade Route:", "Samarkand → Hotan , Hotan → Samarkand"],
                  ["Profit (Buy/Sell):", "2.6m / 55m"],
                ].map(([title, value], i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">{title}</span>
                    <span className="text-white/80">{value}</span>
                  </div>
                ))}
              </div>
              <img
                src="/about/item 1 gold.PNG"
                className={`object-contain cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ${IMAGE_SIZE_CLASS}`}
                alt="NPC & Trade"
                onClick={() => openModal("/about/item 1 gold.PNG")}
              />
            </div>
          </section>

          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">Grab Pet 5 Inventory</h2>

            <div className="flex flex-row items-center sm:items-start justify-center gap-8 pt-4">
              <img
                src="/about/5 page grab pet.PNG"
                className={`object-contain cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ${IMAGE_SIZE_CLASS}`}
                alt="Pet Feature"
                onClick={() => openModal("/about/5 page grab pet.PNG")}
              />
            </div>
          </section>
        </div>
      </div>

      {modalImg && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
          onClick={closeModal}
        >
          <img src={modalImg} className="max-w-[90%] max-h-[90%] object-contain" alt="Zoomed" />
        </div>
      )}
    </main>
  );
}
