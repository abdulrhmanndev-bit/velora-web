"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

// Better SEO + Clean Data
const allClassesData = [
  {
    classImage: "/hero/harp.png",
    className: "HARP",
    subTitle: "Melody of Ruin",
    description:
      "Swift and deadly masters of sonic warfare, blending precision sound manipulation with shadow–borne agility.",
    abilities: ["Precision Shot", "Sonic Barrier", "Melody of Ruin"],
  },
  {
    classImage: "/hero/warriorr.png",
    className: "WARRIOR",
    subTitle: "Ironclad Sentinel",
    description:
      "Unstoppable frontline protectors clad in heavy armor, wielding immense strength and defensive mastery.",
    abilities: ["Tectonic Slam", "Defensive Stance", "Bloodlust"],
  },
  {
    classImage: "/hero/wizzardd.png",
    className: "WIZZARD",
    subTitle: "Arcane Weaver",
    description:
      "Masters of elemental magic, unleashing devastating long-range spells at the cost of physical fragility.",
    abilities: ["Fireball Barrage", "Time Warp", "Earth Quaker"],
  },
];

export default function ClassesAndHeroes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentHero = allClassesData[currentIndex];
  const total = allClassesData.length;

  const goPrev = () =>
    setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));

  const goNext = () =>
    setCurrentIndex((i) => (i === total - 1 ? 0 : i + 1));

  const goToClass = (i: number) => setCurrentIndex(i);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 text-white bg-[#0a1515]">

      {/* Optimized Background with Next.js image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/Hero.png"
          alt="Heroes Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#102020]/80" />
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-amber-600 border-b border-amber-600/50 pb-1 mx-auto w-fit">
            Choose Your Path
          </p>

          <h2 className="mt-4 text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 drop-shadow-lg tracking-wider">
            CLASSES & HEROES
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Character */}
          <div className="relative w-full overflow-hidden rounded-lg shadow-2xl shadow-green-900/50 bg-[#1a3a3a] h-[500px]">
            <Image
              src={currentHero.classImage}
              alt={`${currentHero.className} hero class image`}
              fill
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     500px"
              priority={currentIndex === 0}
              className="object-contain p-4 transition-opacity duration-500"
            />

            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="text-5xl font-bold uppercase tracking-widest drop-shadow-md">
                {currentHero.className}
              </h3>
              <p className="text-lg text-green-300">{currentHero.subTitle}</p>
            </div>
          </div>

          {/* RIGHT — Description */}
          <div className="space-y-10 text-gray-200">
            <p className="text-lg leading-relaxed">
              {currentHero.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-2xl font-bold uppercase tracking-wider text-amber-300 border-b border-amber-300/50 pb-2">
                SIGNATURE ABILITIES
              </h4>

              <div className="space-y-3">
                {currentHero.abilities.map((ability, i) => (
                  <div key={i} className="flex items-start text-lg">
                    <StarIcon className="w-5 h-5 mt-1 mr-3 text-green-500" />
                    <span className="font-semibold">{ability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={goPrev}
                className="p-3 rounded-full border border-green-700/50 text-green-400 hover:bg-green-700/30 transition"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              {/* Slider Dots */}
              <div className="flex space-x-2">
                {allClassesData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToClass(i)}
                    aria-label={`Go to hero ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentIndex
                        ? "bg-green-500 scale-110"
                        : "bg-gray-600 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="p-3 rounded-full border border-green-700/50 text-green-400 hover:bg-green-700/30 transition"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
