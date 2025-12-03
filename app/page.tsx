"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 text-white"
      style={{ backgroundImage: "url('/bg-img/home.png')" }}
    >
      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-3xl">
        {/* Logo */}
        <Image
          src="/bg-img/velora-logo.png"
          width={1000}
          height={100}
          alt="Logo"
          className="drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]"
        />

        {/* Description */}
        <p className="mt-6 text-lg sm:text-xl text-green-200/80">
          Enter the world where magic meets destiny
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {[
            { href: "/download", label: "Join Server" },
            { href: "/signup", label: "Register" },
            { href: "/signup", label: "Video Tutorial" },
          ].map((btn, i) => (
            <Link key={i} href={btn.href}>
              <p className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-gradient-to-br from-[#0faa52] to-[#0a7a3b] text-black font-semibold drop-shadow-[0_0_15px_rgba(25,255,100,0.6)] shadow-2xl hover:text-amber-50 hover:scale-[1.02] transition">
                {btn.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
