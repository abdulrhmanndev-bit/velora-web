"use client";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white px-6 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style={{ backgroundImage: "url('/bg-img/home.png')" }} />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">

        <Image
          src="/bg-img/velora-logo.png"
          width={1000}
          height={100}
          alt="Logo"
          className="drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]"
        />

        <p className="mt-6 text-lg sm:text-xl text-green-200/80">
          Velora is a brand new innovative Silkroad private server designed to
          deliver a mystical, immersive, and epic gaming experience. Explore
          unique systems, encounter legendary monsters, and forge unforgettable
          memories. Do you have what it takes to become a champion in Velora-SRO?
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {[
            { href: "/download", label: "Join Server" },
            { href: "/signup", label: "Register" },
            { href: "/signup", label: "Video Tutorial" },
          ].map((btn, i) => (
            <Link key={i} href={btn.href}>
              <p className="hover:text-amber-50 inline-flex items-center justify-center rounded-2xl px-6 py-3 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)] bg-gradient-to-br from-[#0faa52] to-[#0a7a3b] text-black font-semibold shadow-2xl hover:scale-[1.02] transition">
                {btn.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 flex gap-4 text-sm text-green-200/70">
          <span>Rate: 2x</span>
          <span>•</span>
          <span>Events: Daily</span>
          <span>•</span>
          <span>Forum</span>
        </div>

      </div>
    </main>
  );
}
