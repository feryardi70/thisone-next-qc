"use client";

import { useState } from "react";
import { Layers, Pencil, Trash2 } from "lucide-react";

interface DataUji {
  id_parameter: number;
  Tanggal_uji: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Iluminasi: number;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
  Ketegaklurusan: string;
  Akurasi_kV: number;
  Akurasi_waktu: number;
  Linearitas: number;
  Reproduksibilitas: number;
  Reproduksibilitas_kV: number;
  Reproduksibilitas_waktu: number;
  HVL: number;
  HVL_80: number;
  Kebocoran: number;
  Timer_darurat_mAs: number;
  Timer_darurat_s: number;
  Uniformitas_mAs: number;
  Uniformitas_EI: number;
  Penjejakan_ketebalan: number;
  Penjejakan_kV: number;
  Penjejakan_kombinasi: number;
  Waktu_respon_min: number;
}

const dummyData: DataUji[] = [
  {
    id_parameter: 1,
    Tanggal_uji: "2025-01-15",
    Merk: "Philips",
    Model: "DigitalDiagnost",
    No_Seri: "SN-001",
    Iluminasi: 150,
    Kolimasi_deltaX: 0.5,
    Kolimasi_deltaY: 0.3,
    Ketegaklurusan: "< 1.5",
    Akurasi_kV: 2.1,
    Akurasi_waktu: 1.8,
    Linearitas: 0.05,
    Reproduksibilitas: 0.002,
    Reproduksibilitas_kV: 0.003,
    Reproduksibilitas_waktu: 0.001,
    HVL: 2.1,
    HVL_80: 2.5,
    Kebocoran: 0.01,
    Timer_darurat_mAs: 500,
    Timer_darurat_s: 5,
    Uniformitas_mAs: 15,
    Uniformitas_EI: 8,
    Penjejakan_ketebalan: 12,
    Penjejakan_kV: 10,
    Penjejakan_kombinasi: 18,
    Waktu_respon_min: 2.5,
  },
  {
    id_parameter: 2,
    Tanggal_uji: "2025-02-20",
    Merk: "Siemens",
    Model: "Ysio Max",
    No_Seri: "SN-002",
    Iluminasi: 165,
    Kolimasi_deltaX: 0.4,
    Kolimasi_deltaY: 0.5,
    Ketegaklurusan: "< 1.5",
    Akurasi_kV: 1.9,
    Akurasi_waktu: 2.0,
    Linearitas: 0.04,
    Reproduksibilitas: 0.003,
    Reproduksibilitas_kV: 0.002,
    Reproduksibilitas_waktu: 0.002,
    HVL: 2.3,
    HVL_80: 2.7,
    Kebocoran: 0.02,
    Timer_darurat_mAs: 550,
    Timer_darurat_s: 5.5,
    Uniformitas_mAs: 18,
    Uniformitas_EI: 9,
    Penjejakan_ketebalan: 10,
    Penjejakan_kV: 12,
    Penjejakan_kombinasi: 15,
    Waktu_respon_min: 3.0,
  },
];

type CategoryKey = "kolimasi" | "akurasi" | "linearitas" | "hvl" | "aec";

const categories: Record<CategoryKey, { label: string; fields: (keyof DataUji)[] }> = {
  kolimasi: {
    label: "Kolimasi",
    fields: ["Tanggal_uji", "Iluminasi", "Kolimasi_deltaX", "Kolimasi_deltaY", "Ketegaklurusan"],
  },
  akurasi: {
    label: "Akurasi",
    fields: ["Tanggal_uji", "Akurasi_kV", "Akurasi_waktu"],
  },
  linearitas: {
    label: "Linearitas & Reproduksibilitas",
    fields: ["Tanggal_uji", "Linearitas", "Reproduksibilitas", "Reproduksibilitas_kV", "Reproduksibilitas_waktu"],
  },
  hvl: {
    label: "HVL & Kebocoran",
    fields: ["Tanggal_uji", "HVL", "HVL_80", "Kebocoran"],
  },
  aec: {
    label: "AEC (Timer, Uniformitas, Penjejakan)",
    fields: [
      "Tanggal_uji",
      "Timer_darurat_mAs",
      "Timer_darurat_s",
      "Uniformitas_mAs",
      "Uniformitas_EI",
      "Penjejakan_ketebalan",
      "Penjejakan_kV",
      "Penjejakan_kombinasi",
      "Waktu_respon_min",
    ],
  },
};

const fieldLabels: Record<keyof DataUji, string> = {
  id_parameter: "ID",
  Tanggal_uji: "Tanggal Uji",
  Merk: "Merk",
  Model: "Model",
  No_Seri: "No Seri",
  Iluminasi: "Iluminasi",
  Kolimasi_deltaX: "Kolimasi ΔX",
  Kolimasi_deltaY: "Kolimasi ΔY",
  Ketegaklurusan: "Ketegaklurusan",
  Akurasi_kV: "Akurasi kV",
  Akurasi_waktu: "Akurasi waktu",
  Linearitas: "Linearitas",
  Reproduksibilitas: "Repro Kerma",
  Reproduksibilitas_kV: "Repro kV",
  Reproduksibilitas_waktu: "Repro waktu",
  HVL: "HVL 70kV",
  HVL_80: "HVL 80kV",
  Kebocoran: "Kebocoran",
  Timer_darurat_mAs: "Timer Darurat (mAs)",
  Timer_darurat_s: "Timer Darurat (s)",
  Uniformitas_mAs: "Uniformitas (mAs)",
  Uniformitas_EI: "Uniformitas (EI)",
  Penjejakan_ketebalan: "Penjejakan Tebal",
  Penjejakan_kV: "Penjejakan kV",
  Penjejakan_kombinasi: "Penjejakan Kombinasi",
  Waktu_respon_min: "Waktu Respon Min",
};

export default function Test3Page() {
  const [activeTab, setActiveTab] = useState<CategoryKey>("kolimasi");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Data Uji Pesawat Sinar-X</h1>
          <p className="text-slate-600">
            Tabbed sections untuk menampilkan data uji berdasarkan kategori pengujian
          </p>
        </header>

        {/* Tabbed Sections */}
        <div className="border-2 border-emerald-300 rounded-lg overflow-hidden bg-white shadow-md">
          {/* Tab Buttons */}
          <div className="flex flex-wrap bg-emerald-100 border-b-2 border-emerald-300">
            {(Object.keys(categories) as CategoryKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === key
                    ? "bg-emerald-500 text-white"
                    : "text-emerald-700 hover:bg-emerald-200"
                }`}
              >
                {categories[key].label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            <h3 className="font-semibold mb-3 text-emerald-700">{categories[activeTab].label}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="px-3 py-2 text-left">#</th>
                    {categories[activeTab].fields.map((field) => (
                      <th key={field} className="px-3 py-2 text-left">
                        {fieldLabels[field]}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData.map((d, i) => (
                    <tr key={d.id_parameter} className="border-b border-emerald-100">
                      <td className="px-3 py-2">{++i}</td>
                      {categories[activeTab].fields.map((field) => (
                        <td key={field} className="px-3 py-2">
                          {d[field]}
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                            <Pencil size={14} />
                          </button>
                          <button className="p-1 bg-red-500 hover:bg-red-600 text-white rounded">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
