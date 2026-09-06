import dayjs from "dayjs";

interface ReportSummaryProps {
  startDate: string;
  endDate: string;
  machineName?: string;
}

export default function ReportSummary({ startDate, endDate, machineName }: ReportSummaryProps) {
  return (
    <section className="report-page report-summary print:break-before-page pt-8">
	      <header className="mb-6 pb-3 border-b-2 border-emerald-600">
	        <h2 className="text-2xl font-bold text-emerald-800 uppercase tracking-wide">
	          Kesimpulan
	        </h2>
	      </header>

	      <div className="space-y-4 text-gray-800 text-sm leading-relaxed">
	        <p>
	          Berdasarkan hasil pengujian quality control (QC) yang dilakukan pada
	          pesawat <span className="font-semibold">{machineName || "Sinar-X"}</span>{" "}
	          selama periode{" "}
	          <span className="font-semibold">
	            {dayjs(startDate).format("DD MMMM YYYY")} sampai {dayjs(endDate).format("DD MMMM YYYY")}
	          </span>
	          , dapat disimpulkan bahwa secara umum kinerja pesawat berada dalam
	          batas toleransi yang diizinkan.
	        </p>
	        <p>
	          Seluruh parameter performa yang diuji - meliputi iluminasi, kolimasi,
	          akurasi kV, akurasi waktu, linearitas, reproduksibilitas, dan HVL -
	          memenuhi syarat QC internal yang telah ditetapkan.
	        </p>
	        <p>
	          Rekomendasi: pengujian QC tetap dilakukan secara berkala sesuai
	          dengan pedoman yang berlaku untuk memastikan konsistensi kinerja pesawat.
	        </p>
	      </div>

	      <div className="mt-16 grid grid-cols-2 gap-8 text-sm">
	        <div className="text-center">
	          <p className="mb-20">Disusun oleh,</p>
	          <p className="font-semibold border-t border-gray-400 pt-1">Fisika Medis</p>
	          <p className="italic text-gray-600">Fery Ardiansyah</p>
	        </div>
	        <div className="text-center">
	          <p className="mb-20">Disetujui oleh,</p>
	          <p className="font-semibold border-t border-gray-400 pt-1">Kepala Instalasi</p>
	          <p className="italic text-gray-600">______________________</p>
	        </div>
	      </div>
	    </section>
	  );
}
