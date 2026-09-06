"use client";

import Link from "next/link";

export interface Pesawat {
  id_user: number;
  jenis_pesawat: string;
  id_spesifikasi: number;
  Merk: string;
  Model: string;
  No_Seri: string;
}

interface ModalitySectionProps {
  identifikasiPesawatUnik: Pesawat[];
  pathname: string;
  currentId: string | null;
  currentNoSeri: string | null;
}

export default function ModalitySection({ identifikasiPesawatUnik, pathname, currentId, currentNoSeri }: ModalitySectionProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1 mb-4">
      {identifikasiPesawatUnik.map((item, index) => {
        const href = index === 0 ? `/dashboard` : `/dashboard/radiografi?No_Seri=${item.No_Seri}&id=${item.id_user}`;

        const isActive =
          (index === 0 && pathname === "/dashboard") ||
          (pathname.startsWith("/dashboard/radiografi") && currentId === String(item.id_user) && currentNoSeri === String(item.No_Seri));

        return (
          <div key={index} className="w-3/4 md:w-2/3 lg:w-[45%]">
            <div
              className={`relative p-2.5 rounded-[35px]
            bg-[#e8e8e8]
            shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]
            transition-all duration-200`}
            >
              <Link href={href}>
                <div
                  className={`flex flex-col justify-center items-center
                h-63.5 rounded-[30px] overflow-hidden text-center
                font-mono font-black space-y-1 bg-[#9bcda1]
                ${isActive ? "text-teal-800" : "text-gray-400 hover:text-green-900"}`}
                >
                  <span className="text-4xl md:text-6xl lg:text-7xl">{item.Merk}</span>
                  <span className="mt-1 text-base">
                    {item.Model} - {item.No_Seri}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
