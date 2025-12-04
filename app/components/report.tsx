"use client";

import SideBar from "./Sidebar";
import { TriangleAlert } from "lucide-react";
import { useRef, useState } from "react";
//import Link from "next/link";
import Header from "./Header";
//import { toast } from "sonner";
import { useFetchDataRadBySpecId } from "../DAL/service/spec-client-service";
import { generatingReportDataByPostReq } from "../DAL/repository/report-repository";
import PerformanceIlumChart from './PerformanceIlumData';
import PerformanceAkurkVChart from './PerformanceAkurKVData';
import PerformanceAkurWaktuChart from './PerformanceAkurWaktuData';
import PerformanceKolimChart from './PerformanceKolimData';
import PerformanceLinearitasChart from './PerformanceLinearityData';
import PerformanceReproChart from './PerformanceReproData';
import PerformanceReproWaktuChart from './PerformanceReproWaktuData';
import PerformanceHVLChart from './PerformanceHVLData';
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import dayjs from "dayjs";
import SpinnerCss from "./spinner-css";

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    email: string;
  };
}

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

export default function ReportPerMachine({ payloadQueryParams }: RadProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataUji, setDataUji] = useState<Machine[]>([]);
  const [dataReady, setDataReady] = useState<null | string>(null);

  const { dataRad, isLoading, errorMsg } = useFetchDataRadBySpecId({payloadQueryParams});
  const id_user = dataRad[0]?.id_user;
  const id_spesifikasi = dataRad[0]?.id_spesifikasi;

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates!");
      return;
    }

    setLoading(true);
    setDataReady('collecting data according to date range...');
    try {
      const res = await generatingReportDataByPostReq(id_user, id_spesifikasi, startDate, endDate);
      const data = await res.json();
      //console.log("Fetched data:", data);
      setDataUji(data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to get data");
    } finally {
      setLoading(false);
      setDataReady('data ready, scroll down to download report');
    }
  };
  
  const performanceIlumData = dataUji.map(({ Tanggal_uji, Iluminasi }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Iluminasi,
  }))
  .filter((d) => d.y !== null && d.y !== undefined);
  //console.log(performanceIlumData);

  const performanceAkurkVData = dataUji.map(({ Tanggal_uji, Akurasi_kV }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Akurasi_kV,
  }))
  .filter((d) => d.y !== null && d.y !== undefined);
  //console.log(performanceAkurkVData);

  const performanceAkurwaktuData = dataUji.map(({ Tanggal_uji, Akurasi_waktu }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Akurasi_waktu,
  }))
  .filter((d) => d.y !== null && d.y !== undefined);
  //console.log(performanceAkurwaktuData);

  const performanceKolimData = dataUji.map(
    ({ Tanggal_uji, Kolimasi_deltaX, Kolimasi_deltaY }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Kolimasi_deltaX,
      y1: Kolimasi_deltaY,
    })
  )
  .filter(
    (d) =>
      d.y !== null &&
      d.y !== undefined &&
      d.y1 !== null &&
      d.y1 !== undefined
  );

  const performanceLinearitasData = dataUji.map(({ Tanggal_uji, Linearitas }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Linearitas,
  }))
  .filter((d) => d.y !== null && d.y !== undefined);

  const performanceReproData = dataUji.map(
    ({ Tanggal_uji, Reproduksibilitas, Reproduksibilitas_kV }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Reproduksibilitas,
      y1: Reproduksibilitas_kV,
    })
  )
  .filter(
    (d) =>
      d.y !== null &&
      d.y !== undefined &&
      d.y1 !== null &&
      d.y1 !== undefined
  );

  const performanceReproWaktuData = dataUji.map(({ Tanggal_uji, Reproduksibilitas_waktu }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Reproduksibilitas_waktu,
  }))
  .filter((d) => d.y !== null && d.y !== undefined);

  const performanceHVLData = dataUji.map(
    ({ Tanggal_uji, HVL, HVL_80 }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: HVL,
      y1: HVL_80,
    })
  )
  .filter(
    (d) =>
      d.y !== null &&
      d.y !== undefined &&
      d.y1 !== null &&
      d.y1 !== undefined
  );

  const chartRefs = {
    iluminasi: useRef<HTMLDivElement | null>(null),
    kolimasi: useRef<HTMLDivElement | null>(null),
    akurasiKV: useRef<HTMLDivElement | null>(null),
    akurasiWaktu: useRef<HTMLDivElement | null>(null),
    linearitas: useRef<HTMLDivElement | null>(null),
    reproduksibilitas: useRef<HTMLDivElement | null>(null),
    HVL: useRef<HTMLDivElement | null>(null),
  };

  const handleExportPDF = async() => {
    await new Promise((r) => setTimeout(r, 300));

    const pdf = new jsPDF("p", "mm", "a4");
    const lineHeight = 8;
    let y = 20;

    // ===== COVER PAGE + METADATA =====
    
    // Header Cover
    pdf.setFontSize(20);
    pdf.text("QC PERFORMANCE REPORT", 105, y, { align: "center" });
    y += lineHeight * 3;

    pdf.setFontSize(12);
    pdf.text(`Tanggal: ${dayjs().format("DD MMMM YYYY")}`, 105, y, {
      align: "center",
    });
    y += lineHeight * 3;

    // Logo (jika ada)
    // pdf.addImage("/logo.png", "PNG", 80, y, 50, 30);
    // y += 40;

    pdf.text("Nama Instansi / RS", 105, y, { align: "center" });
    pdf.text("______________________________", 105, y + 5, {
      align: "center",
    });
    
    // Metadata diposisikan di bagian bawah halaman
    y = 120; // Posisi untuk metadata
    
    // Box untuk metadata (opsional)
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(10, y - 5, 190, 45);
    
    pdf.setFontSize(14);
    pdf.text("INFORMASI PESAWAT SINAR-X", 15, y);
    y += 10;
    
    pdf.setFontSize(11);
    const metadata = [
      `Nama Alat: ${dataRad[0]?.jenis_pesawat}`,
      `Nomor Seri: ${dataRad[0]?.No_Seri}`, 
      "Penguji: Fery Ardiansyah",
      "Lokasi Uji: RS Sentosa"
    ];
    
    metadata.forEach(item => {
      pdf.text(item, 15, y);
      y += 8;
    });

    // ===== CHARTS =====
    for (const [key, ref] of Object.entries(chartRefs)) {
      const node = ref.current;
      if (!node) {
        console.warn(`Ref ${key} belum terpasang.`);
        continue;
      }

      const dataUrl = await htmlToImage.toPng(node, {
        backgroundColor: "#ffffff",
        pixelRatio: 2,
      });

      pdf.addPage();
      pdf.setFontSize(14);
      pdf.text(`Grafik ${key.toUpperCase()}`, 10, 20);

      const imageHeight = key === "reproduksibilitas" ? 180 : 100;
      pdf.addImage(dataUrl, "PNG", 10, 30, 190, imageHeight);
    }

    // ===== SUMMARY PAGE =====
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text("KESIMPULAN & VERIFIKASI", 10, 20);

    pdf.setFontSize(11);
    pdf.text("Hasil pengujian menunjukkan bahwa kinerja alat dalam batas toleransi.", 10, 32);
    pdf.text("Semua parameter performa memenuhi syarat QC internal.", 10, 40);

    // tanda tangan
    pdf.text("Tertanda,", 28, 80);
    pdf.text("(____________________)", 15, 120);
    pdf.text("Fisika Medis", 26, 127);

    // simpan PDF
    pdf.save("QC_Performance_Report_Full.pdf");
  }

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        {/* Sidebar */}
        <SideBar />
        {/* // */}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header email={payloadQueryParams.email} />

          {/* Content */}
          <main
            className="flex-1 p-3 mt-2 overflow-y-auto"
            // style={{ backgroundColor: "#f9fafb" }}
          >
            {/* Cards */}
            <div className="flex flex-col items-center">
              {errorMsg.length == 0 ? null : (
                <div className="flex flex-row bg-red-300 text-rose-950 mt-1 rounded-lg px-10 py-2">
                  <div>
                    <TriangleAlert />
                  </div>
                  <div className="inline ml-1 text-xl">{errorMsg}</div>
                </div>
              )}
              <div className="mb-2 text-center">
                <h1 className="text-3xl font-semibold">Reporting Page</h1>
                <div className="text-sm italic text-gray-600">
                  please select a date range
                </div>
              </div>
              <div className="flex flex-row gap-10 items-end">
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-1 py-1"
                  />
                </div>

                <div className="pb-6">to</div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-1 py-1"
                  />
                </div>
              </div>

              {isLoading ? (
                <SpinnerCss />
              ) : (
                <button
                  onClick={handleGenerate}
                  className="bg-green-600 hover:bg-fuchsia-600 text-white mt-2 px-8 py-2 rounded"
                >
                  Start generating
                </button>
              )}

              <div className="mt-2 text-sm italic text-gray-600">
                {dataReady}
              </div>
              {dataReady && (
                <div className="w-full">
                <div
                  ref={chartRefs.iluminasi}
                  style={{ backgroundColor: "#fff" }}
                  className="mt-4 p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    Iluminasi
                  </h2>
                  <PerformanceIlumChart dataPoints={performanceIlumData} />
                </div>

                <div
                  ref={chartRefs.kolimasi}
                  style={{ backgroundColor: "#fff" }}
                  className="p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    Kolimasi
                  </h2>
                  <PerformanceKolimChart data={performanceKolimData} />
                </div>

                <div
                  ref={chartRefs.akurasiKV}
                  style={{ backgroundColor: "#fff" }}
                  className="p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    Akurasi kV
                  </h2>
                  <PerformanceAkurkVChart dataPoints={performanceAkurkVData} />
                </div>

                <div
                  ref={chartRefs.akurasiWaktu}
                  style={{ backgroundColor: "#fff" }}
                  className="p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    Akurasi Waktu
                  </h2>
                  <PerformanceAkurWaktuChart
                    dataPoints={performanceAkurwaktuData}
                  />
                </div>

                <div
                  ref={chartRefs.linearitas}
                  style={{ backgroundColor: "#fff" }}
                  className="p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    Linearitas
                  </h2>
                  <PerformanceLinearitasChart
                    dataPoints={performanceLinearitasData}
                  />
                </div>

                <div
                  ref={chartRefs.reproduksibilitas}
                  style={{ backgroundColor: "#fff" }}
                  className="p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    Reproduksibilitas
                  </h2>
                  <PerformanceReproChart data={performanceReproData} />
                  <PerformanceReproWaktuChart
                    dataPoints={performanceReproWaktuData}
                  />
                </div>

                <div
                  ref={chartRefs.HVL}
                  style={{ backgroundColor: "#fff" }}
                  className="p-4 border rounded-xl shadow w-[90%]"
                >
                  <h2 className="font-semibold text-lg mb-2 text-gray-700">
                    HVL
                  </h2>
                  <PerformanceHVLChart data={performanceHVLData} />
                </div>

                {loading ? (
                  <SpinnerCss />
                ) : (
                  <button
                    onClick={handleExportPDF}
                    className="mt-2 bg-green-600 hover:bg-fuchsia-600 text-white px-8 py-2 rounded"
                  >
                    Download PDF
                  </button>
                )}
              </div>
              )}
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
