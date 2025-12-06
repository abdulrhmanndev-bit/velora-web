"use client";

import Link from "next/link";
import Image from "next/image";
import { GlobeAltIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, MusicalNoteIcon, PlayCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function ContactSection() {
  const contacts = [
    { icon: EnvelopeIcon, label: "Email", value: "velora-sro@gmail.com", link: "mailto:velora-sro@gmail.com", color: "#D44638" },
    { icon: ChatBubbleLeftRightIcon, label: "Discord", value: "Velora-SRO Server", link: "https://discord.gg/qPsvzdAQ", color: "#7289DA" },
    { icon: GlobeAltIcon, label: "Facebook", value: "Velora-SRO", link: "https://www.facebook.com/profile.php?id=61584111351914", color: "#1877F2" },
    { icon: MusicalNoteIcon, label: "TikTok", value: "@velorasro", link: "https://www.tiktok.com/@velorasro", color: "#000000" },
    { icon: PlayCircleIcon, label: "YouTube", value: "Velora-SRO", link: "https://www.youtube.com/@Velora-Sro", color: "#FF0000" },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bg-img/home1.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-8 rounded-2xl shadow-[0_0_50px_rgba(25,255,100,0.2)] bg-black/50 backdrop-blur-sm border border-green-700/50">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-300 shadow-green-500/50 tracking-wider py-2 flex items-center justify-center mb-16">
          <GlobeAltIcon className="w-8 h-8 mr-3 text-green-400" />
          Connect with VeloraWORLD #CREW
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-green-400/30 shadow-[0_0_15px_rgba(25,255,100,0.1)] hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(25,255,100,0.8)] transition duration-300 transform group"
              >
                <div className="p-3 rounded-full bg-black/30 border-2 border-green-500/70 shadow-inner shadow-green-500/50">
                  <Icon className="w-8 h-8" style={{ color: contact.color }} />
                </div>

                <div className="mt-2">
                  <p className="font-extrabold text-xl text-green-300 group-hover:text-green-100 tracking-wide transition duration-300">
                    {contact.label}
                  </p>
                  <p className="text-green-100/70 text-sm break-words mt-1">{contact.value}</p>
                </div>

                <div className="absolute bottom-2 right-2 opacity-50 group-hover:opacity-100 transition duration-300">
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-green-400" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
