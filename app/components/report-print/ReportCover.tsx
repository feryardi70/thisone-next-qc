import dayjs from "dayjs";

interface MachineMeta {
  jenis_pesawat?: string;
  Merk?: string;
  Model?: string;
  No_Seri?: string;
}

interface ReportCoverProps {
  startDate: string;
  endDate: string;
  machine: MachineMeta | null;
}

export default function ReportCover({ startDate, endDate, machine }: ReportCoverProps) {
  return (
    <section className="report-page report-cover print:break-after-page flex flex-col items-center justify-center min-h-[80vh] text-center px-8">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-8 print:shadow-none print:border print:border-emerald-600">
        QC
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-900 uppercase">
        QC Performance Report
      </h1>
      <p className="mt-2 text-sm tracking-widest text-emerald-700 font-semibold uppercase">
        Radiografi
      </p>

      <div className="mt-6 text-gray-700 text-base">
        <div>
          <span className="font-semibold">Periode Uji: </span>
          {dayjs(startDate).format("DD MMMM YYYY")} — {dayjs(endDate).format("DD MMMM YYYY")}
        </div>
        <div className="mt-1 text-sm text-gray-500">
          Dicetak pada {dayjs().format("DD MMMM YYYY, HH:mm")}
        </div>
      </div>

      <div className="mt-12 w-full max-w-md">
        <div className="border-2 border-emerald-600 rounded-lg p-6 text-left bg-white">
          <h2 className="text-center font-bold text-emerald-800 uppercase text-sm tracking-wider mb-4">
            Informasi Pesawat Sinar-X
          </h2>
          <dl className="grid grid-cols-3 gap-y-2 text-sm">
            <dt className="font-semibold text-gray-700">Jenis</dt>
            <dd className="col-span-2 text-gray-900">{machine?.jenis_pesawat || "-"}</dd>

            <dt className="font-semibold text-gray-700">Merk</dt>
            <dd className="col-span-2 text-gray-900">{machine?.Merk || "-"}</dd>

            <dt className="font-semibold text-gray-700">Model</dt>
            <dd className="col-span-2 text-gray-900">{machine?.Model || "-"}</dd>

            <dt className="font-semibold text-gray-700">No. Seri</dt>
            <dd className="col-span-2 text-gray-900">{machine?.No_Seri || "-"}</dd>
          </dl>
        </div>
      </div>

      <div className="mt-auto pt-16 text-xs text-gray-500 italic">
        Laporan ini digenerate otomatis oleh sistem ThisOne QC.
      </div>
    </section>
  );
}
