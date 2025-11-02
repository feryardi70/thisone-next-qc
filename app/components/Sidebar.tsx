"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Aperture,
  LayoutDashboard,
  ChevronsLeft,
  Brain,
  NotebookPen,
  BusFront,
  Disc2,
  Caravan,
  AudioWaveform,
} from "lucide-react";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Fungsi untuk cek ukuran layar
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // Layar sedang atau kecil (di bawah breakpoint lg)
        setCollapsed(true);
      } else {
        // Layar besar
        setCollapsed(false);
      }
    };

    // Jalankan sekali saat mount
    handleResize();
  }, []);

  return (
    <div
      className={`hidden md:inline rounded-4xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-green-700 to-green-300 text-white p-5 relative`}
    >
      {/* Header dalam sidebar */}
      <div className="mt-0 mb-5 flex items-center justify-between">
        {!collapsed && (
          <h2 className="text-lime-200 text-xl font-semibold flex flex-row gap-1">
            <span><NotebookPen /> </span>
            <span>Kendali-Mutu</span>
          </h2>
        )}
        <button
          className="bg-white text-lime-700 p-1 rounded-full hover:bg-blue-200"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
            size={20}
          />
        </button>
      </div>

      <div className="mt-4 space-y-0">
        <Link href="/dashboard" className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer">
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer"
        >
          <BusFront size={20} />
          {!collapsed && <span>Radiografi Umum</span>}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer"
        >
          <AudioWaveform size={20} />
          {!collapsed && <span className="text-lime-200">Fluoroskopi</span>}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer"
        >
          <Brain size={20} />
          {!collapsed && <span className="text-amber-800">CT Scan</span>}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer"
        >
          <Disc2 size={20} />
          {!collapsed && <span className="text-emerald-950">Dental</span>}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer"
        >
          <Caravan size={20} />
          {!collapsed && <span className="text-fuchsia-800">Mammografi</span>}
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:bg-fuchsia-500 p-2 rounded cursor-pointer"
        >
          <Aperture size={20} />
          {!collapsed && (
            <span className="text-lime-900">Fluroskopi Dual Mode</span>
          )}
        </Link>
      </div>
    </div>
  );
}
