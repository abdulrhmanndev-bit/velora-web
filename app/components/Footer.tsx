"use client";

import Link from "next/link";
import {
  FaceSmileIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon, 
} from "@heroicons/react/24/outline";




export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#d4af37] pt-16 pb-6 border-t border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

        {/* Left Column */}
        <div className="space-y-4">
          <h1 className="text-3xl font-serif tracking-wider">VELORA</h1>
          <p className="text-sm text-[#d4af37]/80 leading-relaxed">
            Embark on an epic journey through a world of magic, mystery, and adventure.
            Your legend begins here.
          </p>

          {/* Social Icons (Stylized alternatives via Heroicons) */}
          <div className="flex justify-center md:justify-start gap-4 pt-4">

            <Link
              href="#"
              className="p-2 rounded-full border border-[#d4af37] hover:bg-[#d4af37]/10 transition"
            >
              <FaceSmileIcon className="w-5 h-5" />
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full border border-[#d4af37] hover:bg-[#d4af37]/10 transition"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full border border-[#d4af37] hover:bg-[#d4af37]/10 transition"
            >
              <ShieldCheckIcon className="w-5 h-5" />
            </Link>

          </div>
        </div>

        {/* Middle Column */}
        <div>
          <h2 className="text-xl font-semibold tracking-wider mb-4">QUICK LINKS</h2>
          <ul className="space-y-2 text-[#d4af37]/80">
            <li><Link href="/" className="hover:text-[#d4af37] transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-[#d4af37] transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-[#d4af37] transition">Contact Us</Link></li>
            <li><Link href="/rules" className="hover:text-[#d4af37] transition">Rules</Link></li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h2 className="text-xl font-semibold tracking-wider mb-4">RANKS</h2>
          <ul className="space-y-2 text-[#d4af37]/80">
            <li><Link href="/players-ranking" className="hover:text-[#d4af37] transition">Players Ranking</Link></li>
            <li><Link href="/unique-log" className="hover:text-[#d4af37] transition">Uniques Log</Link></li>
            <li><Link href="/unique-rank" className="hover:text-[#d4af37] transition">Uniques Rank</Link></li>
            <li><Link href="/guild-rank" className="hover:text-[#d4af37] transition">Guild Rank</Link></li>

          </ul>
        </div>

      </div>

      {/* Divider Line */}
      <div className="border-t border-[#d4af37]/30 mt-12 pt-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-center md:text-left text-sm text-[#d4af37]/70">
          <span>© 2025 Velora. All Rights Reserved.</span>

          <div className="flex justify-center md:justify-end gap-6 mt-2 md:mt-0">
            <Link href="#" className="hover:text-[#d4af37] transition">Privacy</Link>
            <Link href="#" className="hover:text-[#d4af37] transition">Terms</Link>
            <Link href="#" className="hover:text-[#d4af37] transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
