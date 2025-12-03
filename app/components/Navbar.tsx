"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import aa from "@/app/assets/images/velora.png";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
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
    <nav className="bg-gradient-to-b from-green-900 to-green-800 text-green-100 shadow-lg w-full sticky top-0 z-50 drop-shadow-[0_0_15px_rgba(25,255,100,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        <Link href="/">
          <Image
            src={aa}
            width={150}
            height={150}
            alt="Logo"
            className="hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.8)]"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.8)]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.4)]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.4)]"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex gap-6">
<Link href="/profile" className="flex items-center gap-2">
  <UserIcon className="w-5 h-5 text-current" />
  Profile
</Link>
              <button className="cursor-pointer" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-green-100 hover:text-green-400"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-green-900">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-green-100 hover:text-green-400"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!user ? (
            <>
              <Link
                href="/login"
                className="block text-green-100 hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block text-green-100 hover:text-green-400"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/profile" onClick={() => setIsOpen(false)} className="">
                Profile
              </Link>
              <button className="text-left" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
