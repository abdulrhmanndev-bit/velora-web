"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await fetch("/api/logout", { method: "GET" });

      // مسح الـ token من الـ cookies client-side برضو احتياطي
      document.cookie = "token=; Max-Age=0; path=/";

      router.replace("/login"); // رجع المستخدم لصفحة login
    };

    doLogout();
  }, [router]);

  return <p>Logging out...</p>;
}
