"use client";
import React from "react";
import Link from "next/link";
import { ChatBubbleLeftRightIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function DonatePage() {
  const offers = [
    { silk: 5500, price: "140 " },
    { silk: 4400, price: "112 " },
    { silk: 3300, price: "84 " },
    { silk: 2200, price: "56 " },
    { silk: 1100, price: "28 " },
    { silk: 550, price: "15 " },
    { silk: 250, price: "8 " },
  ];

  const contacts = [
    { label: "Discord", link: "https://discord.gg/qPsvzdAQ", icon: <ChatBubbleLeftRightIcon className="text-[#5865F2] w-7 h-7" /> },
    { label: "Facebook", link: "https://www.facebook.com/profile.php?id=61584111351914", icon: <GlobeAltIcon className="text-[#1877F2] w-7 h-7" /> },
  ];

  return (
    <section className="relative z-10 container mx-auto px-6 py-24 lg:py-40 text-white">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 drop-shadow-[0_6px_15px_rgba(0,70,34,0.6)]">
        Silk Donate
      </h1>

      <div className="bg-green-900/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl mx-auto mb-16 text-green-400 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-200">Silk Offers</h2>
        <ul className="space-y-4">
          {offers.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center bg-green-900 p-4 rounded-xl shadow-md hover:scale-105 transition">
              <span className="text-green-100 font-semibold text-2xl">{item.silk} Silk</span>
              <span className="text-red-400 font-bold text-2xl">{item.price} USD</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green-900/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl mx-auto text-green-400 drop-shadow-[0_0_15px_rgba(25,255,100,0.4)] my-10">
        <h2 className="text-xl font-bold mb-6 text-center text-orange-600">
          Egyptian Players Contact Us Via{" "}
          <Link href="https://www.facebook.com/profile.php?id=61584111351914" className="underline text-white" target="_blank">
            Facebook
          </Link>{" "}
          for Silk Donation
        </h2>
      </div>

      <div className="bg-green-900/20 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl mx-auto text-green-400 drop-shadow-[0_0_15px_rgba(25,255,100,0.4)]">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-200">How To Donate</h2>
        <p className="text-center text-green-100/80 mb-6">
          To complete your donation and receive Silk instantly, please contact our team through one of the following:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.link}
              target="_blank"
              className="flex items-center gap-4 p-4 bg-green-900/30 backdrop-blur-md rounded-xl shadow-md hover:bg-green-900/40 hover:scale-105 transition"
            >
              {c.icon}
              <span className="font-semibold text-green-100">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
