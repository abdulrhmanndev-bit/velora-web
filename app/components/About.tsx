import React, { useRef, useState, memo } from "react";
import Image from "next/image";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { cinzel } from "./Gallery";

// --- Static Data ---
const GAME_STATS = [
  { value: "5", label: "Kingdoms" },
  { value: "100+", label: "Dungeons" },
  { value: "∞", label: "Adventures" },
];

// --- Video Player (PFM Optimized) ---
const TrailerVideoPlayer = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play();
    vid.controls = true;
    vid.muted = false;
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl shadow-green-900/50 border border-green-700/40">

      {/* Poster optimized */}
      {!isPlaying && (
        <Image
          src="/about/poster.png"
          alt="Video Poster"
          fill
          priority
          className="object-cover"
        />
      )}

      <video
        ref={videoRef}
        src="/about/okayge.mp4"
        preload="metadata"
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Play Button */}
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition"
          aria-label="Play Trailer"
        >
          <span className="w-20 h-20 flex items-center justify-center rounded-full bg-amber-500/20 border border-amber-400 shadow-xl hover:scale-105 transition">
            <PlayCircleIcon className="w-12 h-12 text-amber-300" />
          </span>
        </button>
      )}
    </div>
  );
});
TrailerVideoPlayer.displayName = "TrailerVideoPlayer";

// --- Main About Section ---
export default function About() {
  return (
    <section className="relative text-white py-20 md:py-32 overflow-hidden">

      {/* Optimized background */}
      <Image
        src="/abouttsx/About.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0a1515]/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Video */}
          <TrailerVideoPlayer />

          {/* Text */}
          <div className="space-y-8">

            <p className="text-sm tracking-widest uppercase text-amber-600/90 border-b border-amber-600/50 pb-1 w-fit mx-auto lg:mx-0">
              About the Game
            </p>

            <h1 className={`${cinzel.className} text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text 
              bg-gradient-to-r leading-20 from-amber-200 to-amber-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.3)]
              tracking-wider text-center lg:text-left`}>
              THE LEGEND OF VELORA
            </h1>

            <div className="space-y-6 text-lg text-gray-300">
              <p>
                In the ancient realm of Velora, <strong>five kingdoms</strong> once lived in harmony,
                their power sustained by mystical crystals scattered across the land.
              </p>
              <p>
                Now, heroes must unite, master ancient magic, and conquer forgotten dungeons
                where legendary treasures await.
              </p>
              <p>
                Will you rise as a <strong>champion of light</strong>, or will the shadows consume you?
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-10 border-t border-green-800/50 pt-8">
              {GAME_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-lg bg-green-900/20"
                >
                  <p className="text-4xl font-bold text-amber-400">{stat.value}</p>
                  <p className="text-sm uppercase tracking-wider text-gray-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
