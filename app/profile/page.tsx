"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import ResetSecretCode from "../components/ResetSecretCode";
import ChangePassword from "../components/ChangePasswordPage";
import ChangeSecretCode from "../components/ChangeSecret";

interface ProfileData {
  username: string;
  email: string;
  silk_own: number;
  silk_gift: number;
  silk_point: number;
}

interface CharInfo {
  CharID: number;
  CharName16: string;
  CurLevel: number;
  HP: number;
  MP: number;
  RemainGold: number;
  LastLogout: string | null;
  Class: string | null;
  Race: string;
  JobType: string;
  JobLevel: number;
  Face: string;
  Name: string;
  Nickname: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [chars, setChars] = useState<CharInfo[]>([]);
  // ✅ تم الإبقاء على منطق Accordion باستخدام openPanel
  const [openPanel, setOpenPanel] = useState<string>("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });
        if (!res.ok) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, [user, router]);

  const fetchChars = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/chars", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setChars(data.chars || []);
    } catch (err) {
      console.error("Failed to load chars:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchChars();
    const interval = setInterval(fetchChars, 1000);
    return () => clearInterval(interval);
  }, [fetchChars]);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  const togglePanel = (panelName: string) => {
    // منطق الـ Accordion: يغلق اللوح الحالي إذا كان مفتوحاً، وإلا يفتح اللوح الجديد
    setOpenPanel(prev => prev === panelName ? "" : panelName);
  };

  if (loading || !user || !profileData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="text-white text-xl flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-orange-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-gray-200 p-4 md:p-8 relative"
      // ✅ تم حذف الـ background-image و overlay هنا لعدم تكرارها (إذا كان يتم تعيينها في ملف الـ layout أو الـ parent)
    >
      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* --- Profile Header & Summary --- */}
        <div className="bg-gray-900/90 p-6 rounded-xl shadow-2xl border border-green-400 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
          <h1 className="text-4xl font-extrabold mb-2 text-green-400">
             Welcome, <span className="text-white">{profileData.username}</span>
          </h1>

          {/* --- Account Summary --- */}
          <h2 className="text-xl font-bold mt-4 mb-2 text-green-400">Account Summary</h2>
          <ul className="mt-2 text-lg space-y-1">
            <li>
              Current Silk:{" "}
              <span className="text-yellow-400 font-extrabold text-[22px]">{profileData.silk_own || 0}</span>
            </li>
          </ul>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-700 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-bold transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>

        {/* --- Security Panels (Accordion) --- */}
        <h2 className="text-2xl font-bold mt-10 mb-4 text-green-400">Account Security</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          
          {/* 1. Change Password */}
          <div className={`flex-1 rounded-xl shadow-lg overflow-hidden transition duration-300 ${
            openPanel === "password" 
            ? 'drop-shadow-[0_0_15px_rgba(25,255,100,0.6)] border border-green-700' 
            : 'border-none border-gray-700 hover:border-gray-500' // border-none تم تغييرها لتبدو أفضل
          }`}>
            <h3
              className={`text-xl font-bold p-4 flex justify-between items-center cursor-pointer transition duration-300 ${
                openPanel === "password" 
                ? 'bg-green-600 text-white ' 
                : 'bg-gray-900/90 hover:bg-gray-800 text-gray-200'
              }`}
              onClick={() => togglePanel("password")}
            >
              Change Password {openPanel === "password" ? "▲" : "▼"}
            </h3>
            {openPanel === "password" && (
              <div className="p-4 bg-green-400/10 text-gray-400 ">
                <ChangePassword email={profileData.email} />
              </div>
            )}
          </div>

          {/* 2. Change Secret Code */}
          <div className={`flex-1 rounded-xl shadow-lg overflow-hidden transition duration-300 ${
            openPanel === "secret" 
            ? 'drop-shadow-[0_0_15px_rgba(25,255,100,0.6)] border border-green-700' 
            : 'border-none border-gray-700 hover:border-gray-500' // border-none تم تغييرها لتبدو أفضل
          }`}>
            <h3
              className={`text-xl font-bold p-4 flex justify-between items-center cursor-pointer transition duration-300 ${
                openPanel === "secret" 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-900/90 hover:bg-gray-800 text-gray-200'
              }`}
              onClick={() => togglePanel("secret")}
            >
              Change Secret Code {openPanel === "secret" ? "▲" : "▼"}
            </h3>
            {openPanel === "secret" && (
              <div className="p-4 bg-green-400/10 text-gray-400">
                <ChangeSecretCode email={profileData.email} />
              </div>
            )}
          </div>

          {/* 3. Reset Secret Code */}
          <div className={`flex-1 rounded-xl shadow-lg overflow-hidden transition duration-300 ${
            openPanel === "reset" 
            ? 'drop-shadow-[0_0_15px_rgba(25,255,100,0.6)] border border-green-700' 
            : 'border-none hover:border-gray-500' // border-none تم تغييرها لتبدو أفضل
          }`}>
            <h3
              className={`text-xl font-bold p-4 flex justify-between items-center cursor-pointer transition duration-300 ${
                openPanel === "reset" 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-900/90 hover:bg-gray-800 text-gray-200'
              }`}
              onClick={() => togglePanel("reset")}
            >
              Reset Secret Code {openPanel === "reset" ? "▲" : "▼"}
            </h3>
            {openPanel === "reset" && (
              <div className="p-4 bg-green-400/10 text-gray-400">
                <ResetSecretCode />
              </div>
            )}
          </div>
        </div>

        {/* --- Characters --- */}
        <h2 className="text-2xl font-bold mt-12 mb-4 text-green-400">Your Characters</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]">
          {chars.map((c, id) => (
            <div
              key={id}
              className="bg-gray-900/90 p-4 rounded-xl shadow-xl flex gap-6 border border-green-700 hover:border-green-400 transition duration-300"
            >
              <Image
                src={c.Face}
                alt={c.CharName16}
                width={150}
                height={150}
                className="rounded-lg object-cover w-32 h-32 md:w-40 md:h-40 flex-shrink-0 border border-green-600"
              />

              <div className="text-sm space-y-1 md:text-base">
                <h1 className="text-2xl font-extrabold mb-1 text-green-400 hover:underline cursor-pointer">
                  {c.CharName16}
                </h1>
                <p>
                  <span className="font-semibold text-gray-300">Level:</span>{" "}
                  <span className="text-lg font-bold text-red-500">{c.CurLevel}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Race:</span>{" "}
                  <span className="text-amber-400">{c.Race}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Class:</span>{" "}
                  <span className="text-amber-400">{c.Class || "Unknown"}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Job:</span>{" "}
                  <span className="text-orange-400 font-medium">
                    {c.JobType && c.JobType !== "No Job" ? `${c.JobType} (Lvl ${c.JobLevel})` : "No Job"}
                  </span>
                </p>
                <p className="text-xs">
                  <span className="font-semibold text-gray-300">HP/MP:</span>{" "}
                  <span className="text-red-500">{Number(c.HP).toLocaleString()}</span> /{" "}
                  <span className="text-blue-400">{Number(c.MP).toLocaleString()}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Gold:</span>{" "}
                  <span className="text-yellow-500 font-bold">{Number(c.RemainGold).toLocaleString()}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Guild Name:</span>{" "}
                  <span className="text-white font-medium">{c.Name || "Unknown"}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Grant Name:</span>{" "}
                  <span className="text-white font-medium">{c.Nickname || "Unknown"}</span>
                </p>
                <p className="text-xs mt-1 text-gray-500">
                  Last Logout:{" "}
                  {c.LastLogout
                    ? new Date(c.LastLogout).toISOString().slice(0, 19).replace("T", " ")
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}