"use client";

import { useEffect, useState } from "react";

export default function FortressStatus() {
  const [fortresses, setFortresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/fortress");
      const data = await res.json();
      setFortresses(data.data);
    };

    fetchData();
  }, []);

  const getName = (id: number) => {
    switch (id) {
      case 1:
        return "Jangan Fortress";
      case 3:
        return "Hotan Fortress";
      case 6:
        return "Bandit Fortress";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Occupied Fortresses</h2>

      <div className="space-y-3">
        {fortresses.map((f: any, index) => (
          <div
            key={index}
            className="p-3 bg-gray-800 rounded-lg flex justify-between"
          >
            <span>{getName(f.FortressID)}</span>
            <span className="font-semibold text-yellow-400">
              {f.GuildName ?? "No Owner"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
