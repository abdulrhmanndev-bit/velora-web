"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// استخدام فئات Tailwind قياسية للـ width والـ height
const IMAGE_SIZE_CLASS = "w-36 h-36 md:w-48 md:h-48"; 

export default function AboutPage() {
  const [modalImg, setModalImg] = useState<string | null>(null);

  const openModal = (src: string) => setModalImg(src);
  const closeModal = () => setModalImg(null);

  return (
    <main
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        backgroundImage: "url('/bg-img/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          {/* Hero */}
          {/* <section>
            <Image
              src="/bg-img/velora-logo.png"
              width={3000}
              height={1500}
              alt="Logo"
              className="mx-auto drop-shadow-[0_5px_20px_rgba(0,255,120,0.35)]"
            />
          </section> */}

          {/* Server Info */}
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
                ["EXP Rate:", " 2x ", "text-yellow-300"],
                ["Drop Rate:", " 1.5x ", "text-yellow-300"],
                ["Alchemy Rate:", " 1.5x ", "text-yellow-300"],
                ["Gold Rate:", " 1.5x ", "text-yellow-300"],
                ["Max Plus:", " 10 without adv ", "text-yellow-300"],
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

          {/* Start Items */}
          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            {/* العنوان في المنتصف */}
            <div className="flex items-center gap-3 mb-4 justify-start">
              <h2 className="text-2xl font-bold text-emerald-300 flex-1 text-center">
                Start Items
              </h2>
            </div>
            
            {/* الصورة على اليسار والقائمة على اليمين */}
            <div className="flex flex-row items-center sm:items-start justify-center gap-8 pt-4">
                
              {/* تنسيق أفضل للقائمة باستخدام Flex/Grid لجعل النص على اليمين */}
              <div className="flex flex-col text-left w-full sm:w-auto space-y-2">
                
                {/* تم تعديل القائمة لتكون عناصر قائمة منفصلة داخل div لسهولة التنسيق */}
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">Start Level:</span>
                    <span className="text-white/80">1</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">100EXP HELPER:</span>
                    <span className="text-white/80">Included</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">Nasrun:</span>
                    <span className="text-white/80">7 days</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">Scrolls/Drugs:</span>
                    <span className="text-white/80">10x Speed Drug, Reverse, Instant, Berserker</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">HP/MP Pots:</span>
                    <span className="text-white/80">1k MP, 1k HP</span>
                </div>
              </div>
              <img
                src="/about/start items.png"
                className={`object-contain cursor-pointer hover:scale-110 transition-transform flex-shrink-0 ${IMAGE_SIZE_CLASS}`}
                alt="Start Items"
                onClick={() => openModal("/about/start items.png")}
              />
            </div>
          </section>

          {/* NPC & Trade */}
          <section className="bg-green-900/25 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-700/20">
            {/* العنوان في المنتصف */}
            <div className="flex items-center gap-3 mb-4 justify-start">
              <h2 className="text-2xl font-bold text-emerald-300 flex-1 text-center">
                NPC & Trade
              </h2>
            </div>

            {/* الصورة على اليسار والقائمة على اليمين */}
            <div className="flex flex-row items-center sm:items-start justify-center gap-8 pt-4">
                
              {/* تنسيق أفضل للقائمة باستخدام Flex/Grid لجعل النص على اليمين */}
              <div className="flex flex-col text-left w-full sm:w-auto space-y-2">
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">NPC Items:</span>
                    <span className="text-white/80">DG1–DG9 1 Gold, Full Blue 80% state</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">Trade Route:</span>
                    <span className="text-white/80">Samarkand → Hotan , Hotan → Samarkand </span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                    <span className="text-green-300 font-semibold">Profit (Buy/Sell):</span>
                    <span className="text-white/80">2.6m / 55m</span>
                </div>
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
            {/* العنوان في المنتصف */}
            <div className="flex items-center gap-3 mb-4 justify-start">
              <h2 className="text-2xl font-bold text-emerald-300 flex-1 text-center">
                Grab Pet 5 Inventory
              </h2>
            </div>

            {/* الصورة على اليسار والقائمة على اليمين */}
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

      {/* Modal */}
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