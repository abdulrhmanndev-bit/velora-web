"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function QAPage() {
  const qaList = [
    { q: "How To Get Arena Coin?", a: "From Arena Manager (Gameplay).", imagePath: "/qa-images/arena coin.PNG" },
    { q: "How To Get Gold Coin?", a: "Temple Job Uniques, and more Uniques will be added soon.", imagePath: "/qa-images/gold coin.PNG" },
    { q: "How To Get Silver?", a: "Temple Job Uniques, and more Uniques will be added soon.", imagePath: "/qa-images/silver coin.png" },
    { q: "How To Get Gold?", a: "Trade profit between Samarkand and Hotan only (Buy for 2.6m — Sell for 56.4m) And BOTTING.", imagePath: "/qa-images/gold.png" },
    { q: "How To Get Egy A (Power) Weapons?", a: "From Forgotten World Books (collect 8 books and pick your Egy A).", imagePath: "/qa-images/weap a.png" },
    { q: "How To Get Egy A (Power) Shield?", a: "Forgotten World Boss (Ghost Sereness – hard drop).", imagePath: "/qa-images/shield a.png" },
    { q: "How To Get Egy (Immortality) Set?", a: "Buy from Egy Set NPC located in Samarkand or Alexandria.", imagePath: "/qa-images/egy set.PNG" },
    { q: "How To Get Egy (Immortality) Accessory?", a: "Buy from Egy Accessory NPC located in Samarkand or Alexandria.", imagePath: "/qa-images/egy accs.PNG" },
    { q: "How To Get Egy B (Fight) Shield?", a: "Have an Egy A (Power) Shield +11 then use Egy B Upgrade Scroll From NPC Located in Samarkand or Alexandria.", imagePath: "/qa-images/shield B.png" },
    { q: "How To Get Egy B (Fight) Weapon?", a: "Have an Egy A (Power) Weapon +11 then use Egy B Upgrade Scroll From NPC Located in Samarkand or Alexandria.", imagePath: "/qa-images/weap b.png" },
    { q: "MaxStack ?", a: "Max Stack is 10.000 For Potions and Alchemy stuffs and Coins and many things So u can Play without problems..", imagePath: "/qa-images/potion stack.PNG" },
    { q: "Magic Lucky Powder 10% ?", a: "Added to NPC for 10 silk each Give You 10% More Lucky Than Normal Powder.", imagePath: "/qa-images/archemy_reinforce_prob_up_b.png" },
    { q: "How To Get Nova D11 ?", a: "Drop Mobs Level Between 107 AND 110.", imagePath: "/qa-images/nova-11.png" },
    { q: "How To Get Sun D10 ?", a: "Drop Mobs Level Between 100 AND 106.", imagePath: "/qa-images/sun-10.png" },
    { q: "New Prem 15% ", a: "Added to NPC Gives You 15% STR INT PHY MAG 14% More Lucky.", imagePath: "/qa-images/new prem.PNG" },
    { q: "How To Get Silk?", a: (
        <>
          It's a donate section →{" "}
          <Link href="/donate" className="text-green-400 underline hover:text-green-300">CLICK HERE</Link>
           {' '}Also There's Silk Scroll in Item Mall F10 So Players Can Exchange Silk In Game While Playing
        </>
      ), imagePath: "/qa-images/mall_indulgence.png"
    },
  ];

  return (
    <main className="min-h-screen text-white px-6 py-24">
      <div className="max-w-4xl mx-auto bg-[#0A2616]/80 backdrop-blur-sm p-10 rounded-[30px] shadow-[0_0_50px_rgba(25,255,100,0.4)] border border-green-700/50">
        <h1 className="underline text-4xl font-extrabold text-center mb-10 text-green-400 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
          Questions & Answers
        </h1>

        <ul className="space-y-6">
          {qaList.map((item, i) => (
            <li key={i} className="bg-[#03150A]/70 p-5 rounded-2xl border border-green-700/50 hover:bg-[#03150A]/90 transition duration-300 flex space-x-4 items-start">
              {item.imagePath && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-green-700/50">
                  <Image src={item.imagePath} alt={item.q} width={200} height={200} className="w-full h-full" />
                </div>
              )}
              <div className="flex-grow">
                <p className="text-xl font-semibold text-green-200">{i + 1} - {item.q}</p>
                <p className="mt-2 text-green-300/80">- {item.a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
