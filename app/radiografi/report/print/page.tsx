import { redirect } from "next/navigation";
import getSession from "@/app/action/session";
import { fetchReportDataServer, fetchMachineMetaBySpecIdServer } from "@/app/DAL/repository/report-repository";
import ReportPrintView from "@/app/components/report-print/ReportPrintView";
import "@/app/components/report-print/print.css"; // Import the print-specific CSS

interface MachineRow {
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

interface PageProps {
  searchParams: Promise<{
    id_user?: string;
    id_spesifikasi?: string;
    start_date?: string;
    end_date?: string;
  }>;
}

export default async function PrintReportPage({ searchParams }: PageProps) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const params = await searchParams;
  const idUser = parseInt(params.id_user ?? "", 10);
  const idSpesifikasi = parseInt(params.id_spesifikasi ?? "", 10);
  const startDate = params.start_date ?? "";
  const endDate = params.end_date ?? "";

  if (Number.isNaN(idUser) || Number.isNaN(idSpesifikasi) || !startDate || !endDate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow rounded-lg p-8 max-w-md text-center">
          <h1 className="text-xl font-semibold text-red-600 mb-2">Parameter tidak lengkap</h1>
          <p className="text-sm text-gray-600">Mohon buka halaman report terlebih dahulu dan pilih rentang tanggal sebelum membuka laporan.</p>
        </div>
      </div>
    );
  }

  // Fetch report data and machine metadata in parallel
  const [reportPayload, machinePayload] = await Promise.all([fetchReportDataServer(idUser, idSpesifikasi, startDate, endDate), fetchMachineMetaBySpecIdServer(idSpesifikasi)]);

  const dataUji: MachineRow[] = Array.isArray(reportPayload?.data) ? reportPayload.data : [];
  const machine: MachineMeta | null = (machinePayload?.data?.[0] ?? null) as MachineMeta | null;

  if (!dataUji || dataUji.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow rounded-lg p-8 max-w-md text-center">
          <h1 className="text-xl font-semibold text-amber-600 mb-2">Tidak ada data</h1>
          <p className="text-sm text-gray-600">
            Tidak ditemukan data QC untuk rentang tanggal {startDate} sampai {endDate}.
          </p>
        </div>
      </div>
    );
  }

  return <ReportPrintView dataUji={dataUji} machine={machine} startDate={startDate} endDate={endDate} />;
}
