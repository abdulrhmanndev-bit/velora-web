"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import aa from "@/app/assets/images/velora.png";
import { UserIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Download", href: "/download" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
    { name: "Q&A", href: "/q&a" },
    { name: "Schedule", href: "/shedule" },
  ];

  const rankLinks = [
    { name: "Players Rank", href: "/players-ranking" },
    { name: "Uniques Log", href: "/unique-log" },
    { name: "Uniques Rank", href: "/unique-rank" },
    { name: "Guild Rank", href: "/guild-rank" },
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
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.8)] transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-green-400 flex items-center gap-1 transition duration-300"
            >
              Rankings
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute mt-2 w-48 bg-green-900 border border-green-700 rounded-lg shadow-xl z-50 overflow-hidden">
                {rankLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-green-100 hover:text-green-400 hover:drop-shadow-[0_0_10px_rgba(25,255,100,0.6)] transition bg-gradient-to-r from-green-900 via-green-800 to-green-900"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.4)] transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hover:text-green-400 hover:drop-shadow-[0_0_15px_rgba(25,255,100,0.4)] transition"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
              className="block text-green-100 hover:text-green-400 transition duration-500"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex justify-between w-full text-green-100 hover:text-green-400 transition"
            >
              Rankings
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="mt-1 space-y-1 pl-4">
                {rankLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-green-100 hover:text-green-400 hover:drop-shadow-[0_0_10px_rgba(25,255,100,0.6)] transition"
                    onClick={() => { setDropdownOpen(false); setIsOpen(false); }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {!user ? (
            <>
              <Link
                href="/login"
                className="block text-green-100 hover:text-green-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block text-green-100 hover:text-green-400 transition"
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
