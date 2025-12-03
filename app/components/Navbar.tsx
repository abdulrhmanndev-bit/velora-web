"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import aa from "@/app/assets/images/velora.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout(); // يمسح الكوكي ويحدث Context
    router.replace("/login"); // replace عشان ميقدرش يعمل Back
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Download", href: "/download" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
    { name: "Q&A", href: "/q&a" },
    { name: "Schedule", href: "/shedule" },
    { name: "Players Rank", href: "/players-ranking" },
    { name: "Uniques Log", href: "/unique-log" },
  ];

  return (
    <nav className="bg-gradient-to-b from-green-900 to-green-800 text-green-100 shadow-lg w-full sticky top-0 z-50  drop-shadow-[0_0_15px_rgba(25,255,100,0.8)] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center ">
        <Link href="/">
          <Image src={aa} width={150} height={150} alt="Logo" className="hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.8)]"/>
        </Link>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.8)]">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex space-x-4 ">
          {!user ? (
            <>
              <Link href="/login" className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.4)]">Login</Link>
              <Link href="/signup" className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.4)]">Signup</Link>
            </>
          ) : (
            <div className=' flex gap-6'>
              <Link href="/profile">Profile</Link>
              <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
