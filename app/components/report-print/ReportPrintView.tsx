"use client";

import { useEffect } from "react";
import { Printer, Download } from "lucide-react";
import ReportCover from "./ReportCover";
import ReportChartSection from "./ReportChartSection";
import ReportSummary from "./ReportSummary";
import PerformanceIlumChart from "../PerformanceIlumData";
import PerformanceAkurkVChart from "../PerformanceAkurKVData";
import PerformanceAkurWaktuChart from "../PerformanceAkurWaktuData";
import PerformanceKolimChart from "../PerformanceKolimData";
import PerformanceLinearitasChart from "../PerformanceLinearityData";
import PerformanceReproChart from "../PerformanceReproData";
import PerformanceReproWaktuChart from "../PerformanceReproWaktuData";
import PerformanceHVLChart from "../PerformanceHVLData";

interface Machine {
  id_parameter: number;
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
  Tanggal_uji: string;
  id_user: number;
  email: string;
  jenis_pesawat: string;
  id_spesifikasi: number;
  Merk: string;
  Model: string;
  No_Seri: string;
}

interface MachineMeta {
  jenis_pesawat?: string;
  Merk?: string;
  Model?: string;
  No_Seri?: string;
  id_user?: number;
  id_spesifikasi?: number;
}

interface ReportPrintViewProps {
  dataUji: Machine[];
  machine: MachineMeta | null;
  startDate: string;
  endDate: string;
}

export default function ReportPrintView({ dataUji, machine, startDate, endDate }: ReportPrintViewProps) {
  useEffect(() => {
    // Make sure charts re-render at print resolution
    const handleAfterPrint = () => {
      // no-op
    };
    window.addEventListener("afterprint", handleAfterPrint);
    return () => window.removeEventListener("afterprint", handleAfterPrint);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const performanceIlumData = dataUji
    .map(({ Tanggal_uji, Iluminasi }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Iluminasi,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const performanceAkurkVData = dataUji
    .map(({ Tanggal_uji, Akurasi_kV }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Akurasi_kV,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const performanceAkurwaktuData = dataUji
    .map(({ Tanggal_uji, Akurasi_waktu }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Akurasi_waktu,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const performanceKolimData = dataUji
    .map(({ Tanggal_uji, Kolimasi_deltaX, Kolimasi_deltaY }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Kolimasi_deltaX,
      y1: Kolimasi_deltaY,
    }))
    .filter(
      (d) =>
        d.y !== null &&
        d.y !== undefined &&
        d.y1 !== null &&
        d.y1 !== undefined
    );

  const performanceLinearitasData = dataUji
    .map(({ Tanggal_uji, Linearitas }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Linearitas,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const performanceReproData = dataUji
    .map(({ Tanggal_uji, Reproduksibilitas, Reproduksibilitas_kV }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Reproduksibilitas,
      y1: Reproduksibilitas_kV,
    }))
    .filter(
      (d) =>
        d.y !== null &&
        d.y !== undefined &&
        d.y1 !== null &&
        d.y1 !== undefined
    );

  const performanceReproWaktuData = dataUji
    .map(({ Tanggal_uji, Reproduksibilitas_waktu }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Reproduksibilitas_waktu,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const performanceHVLData = dataUji
    .map(({ Tanggal_uji, HVL, HVL_80 }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: HVL,
      y1: HVL_80,
    }))
    .filter(
      (d) =>
        d.y !== null &&
        d.y !== undefined &&
        d.y1 !== null &&
        d.y1 !== undefined
    );

  return (
    <div className="report-print-root min-h-screen bg-gray-100 text-gray-900">
      {/* Floating toolbar - hidden when printing */}
      <div className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-emerald-800">
              QC Performance Report
            </h1>
            <p className="text-xs text-gray-500">
              Siap di-export. Klik tombol di kanan untuk membuka dialog print browser, lalu pilih <span className="font-semibold">&quot;Save as PDF&quot;</span> sebagai tujuan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow-sm transition"
            >
              <Download size={16} />
              Save as PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md shadow-sm transition"
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Document body */}
      <article className="report-document max-w-5xl mx-auto bg-white shadow-sm my-6 print:my-0 print:shadow-none">
        <div className="p-8 print:p-0">
          <ReportCover
            startDate={startDate}
            endDate={endDate}
            machine={machine}
          />

          <section className="print:break-before-page pt-4 space-y-6">
            <header className="mb-4 pb-2 border-b-2 border-emerald-600">
              <h2 className="text-2xl font-bold text-emerald-800 uppercase tracking-wide">
                Data Performa
              </h2>
              <p className="text-xs text-gray-600 italic mt-1">
                Grafik tren pengukuran QC berdasarkan periode yang dipilih.
              </p>
            </header>

            <ReportChartSection
              title="Iluminasi"
              description="Tren iluminasi (lux) selama periode pengujian."
            >
              <PerformanceIlumChart dataPoints={performanceIlumData} />
            </ReportChartSection>

            <ReportChartSection
              title="Kolimasi"
              description="Penyimpangan kolimasi terhadap sumbu X dan Y."
            >
              <PerformanceKolimChart data={performanceKolimData} />
            </ReportChartSection>

            <ReportChartSection
              title="Akurasi kV"
              description="Tren akurasi tegangan tabung (kV)."
            >
              <PerformanceAkurkVChart dataPoints={performanceAkurkVData} />
            </ReportChartSection>

            <ReportChartSection
              title="Akurasi Waktu"
              description="Tren akurasi waktu eksposi (detik)."
            >
              <PerformanceAkurWaktuChart
                dataPoints={performanceAkurwaktuData}
              />
            </ReportChartSection>

            <ReportChartSection
              title="Linearitas"
              description="Tren linearitas keluaran tabung."
            >
              <PerformanceLinearitasChart
                dataPoints={performanceLinearitasData}
              />
            </ReportChartSection>

            <ReportChartSection
              title="Reproduksibilitas"
              description="Tren reproduksibilitas kerma dan kV, serta reproduksibilitas waktu."
            >
              <PerformanceReproChart data={performanceReproData} />
              <div className="mt-4">
                <PerformanceReproWaktuChart
                  dataPoints={performanceReproWaktuData}
                />
              </div>
            </ReportChartSection>

            <ReportChartSection
              title="HVL"
              description="Tren Half Value Layer (HVL) pada kV standar dan 80 kV."
            >
              <PerformanceHVLChart data={performanceHVLData} />
            </ReportChartSection>
          </section>

          <ReportSummary
            startDate={startDate}
            endDate={endDate}
            machineName={machine?.jenis_pesawat}
          />
        </div>
      </article>
    </div>
  );
}
