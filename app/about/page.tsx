"use client";

import { useState } from "react";

const IMAGE_SIZE_CLASS = "w-36 h-36 md:w-48 md:h-48";

type InfoRowProps = { title: string; value: string; extraClass?: string };
type ImageModalProps = { src: string; onClick: () => void; alt: string };

const InfoRow = ({ title, value, extraClass = "text-white/85" }: InfoRowProps) => (
  <div className="grid grid-cols-2 border-b border-green-800/30 pb-2 last:border-none">
    <span className="font-semibold text-emerald-300">{title}</span>
    <span className={extraClass}>{value}</span>
  </div>
);

const ImageBox = ({ src, alt, onClick }: ImageModalProps) => (
  <img
    src={src}
    alt={alt}
    onClick={onClick}
    className={`object-contain cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ${IMAGE_SIZE_CLASS}`}
  />
);

export default function AboutPage() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  const openModal = (src: string) => setModalImg(src);
  const closeModal = () => setModalImg(null);

  const serverInfo = [
    ["Current Cap:", "110, D11 Coin System"],
    ["Upcoming Update:", "D12 | Cap 120 (Mirror Temple Jupiter)"],
    ["PC Limit:", "Unlimited"],
    ["IP Limit:", "Unlimited"],
    ["Honor System:", "Like Isro System"],
    ["Auto Events:", "Yes"],
    ["Guild Limit:", "50"],
    ["Union Limit:", "8"],
    ["BOT:", "Allowed (All Kind Of BOTS)"],
    ["Arena Manager:", "Working"],
    ["Mastery Cap:", "220 EU/330 CH"],
    ["EXP Rate:", "2x"],
    ["Drop Rate:", "1.5x"],
    ["Alchemy Rate:", "1.5x"],
    ["Gold Rate:", "1.5x"],
    ["Max Plus:", "12 without adv"],
    ["Fortress War:", "Hotan (With a good reward)"],
    ["Fortress War Day:", "Friday 8 PM to 9:30 PM"],
    ["Play 2 win:", "Yes"],
    ["Server Race:", "CH & EU"],
    ["Unique Silk Drop:", "Yes 2 New Uniques Added"],
    ["Start Date:", "20/10/2025"],
  ];

  const startItems = [
    ["Start Level:", "1"],
    ["100EXP HELPER:", "Included"],
    ["Nasrun:", "7 days"],
    ["Scrolls/Drugs:", "10x Speed Drug, Reverse, Instant, Berserker"],
    ["HP/MP Pots:", "1k MP, 1k HP"],
  ];

  const tradeInfo = [
    ["NPC Items:", "DG1–DG9 1 Gold, Full Blue 80% state"],
    ["Trade Route:", "Samarkand → Hotan , Hotan → Samarkand"],
    ["Profit (Buy/Sell):", "2.6m / 55m"],
  ];

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
          {/* SERVER INFO */}
          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-3xl font-bold mb-6 text-emerald-300">Server Information</h2>

            <div className="text-green-100/90 text-lg space-y-4">
              <div className="text-red-400 font-bold bg-green-900/40 p-3 rounded-lg">
                PVE MMORPG GAME (LongTerm) PROGRESSIVE
              </div>

              {serverInfo.map(([title, value], i) => (
                <InfoRow key={i} title={title} value={value} extraClass="text-yellow-300" />
              ))}
            </div>
          </section>

          {/* START ITEMS */}
          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">Start Items</h2>

            <div className="flex flex-row items-center justify-center gap-8 pt-4">
              <div className="flex flex-col text-left space-y-2">
                {startItems.map(([title, value], i) => (
                  <InfoRow key={i} title={title} value={value} />
                ))}
              </div>

              <ImageBox
                src="/about/start items.png"
                alt="Start Items"
                onClick={() => openModal("/about/start items.png")}
              />
            </div>
          </section>

          {/* TRADE */}
          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">NPC & Trade</h2>

            <div className="flex flex-row items-center justify-center gap-8 pt-4">
              <div className="flex flex-col text-left space-y-2">
                {tradeInfo.map(([title, value], i) => (
                  <InfoRow key={i} title={title} value={value} />
                ))}
              </div>

              <ImageBox
                src="/about/item 1 gold.PNG"
                alt="NPC & Trade"
                onClick={() => openModal("/about/item 1 gold.PNG")}
              />
            </div>
          </section>

          {/* PET INVENTORY */}
          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            <h2 className="text-2xl font-bold mb-4 text-emerald-300 text-center">Grab Pet 5 Inventory</h2>

            <div className="flex justify-center pt-4">
              <ImageBox
                src="/about/5 page grab pet.PNG"
                alt="Pet Inventory"
                onClick={() => openModal("/about/5 page grab pet.PNG")}
              />
            </div>
          </section>
        </div>
      </div>

      {/* MODAL */}
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
