import { ShieldX } from "lucide-react";
import { SubmitVerificationButton } from "./SubmitVerificationButton";
import { sendVerificationAction } from "../action/send-verification";

export default function UnverifiedEmptyState({ feedback }: { feedback?: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-slate-100 p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <ShieldX className="mx-auto h-16 w-16 text-gray-950 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Akun Anda Belum Diverifikasi</h1>
        <p className="mb-6 text-gray-600">Silakan periksa email Anda dan klik tautan verifikasi untuk mengakses dashboard.</p>
        <form action={sendVerificationAction}>
          <SubmitVerificationButton className="w-full hover:bg-green-200" />
        </form>
        {feedback === "sent" && <p className="mt-4 text-sm text-green-600">Email verifikasi telah dikirim. Silakan periksa inbox Anda.</p>}
        {feedback === "error" && <p className="mt-4 text-sm text-red-600">Gagal mengirim email verifikasi. Silakan coba lagi beberapa saat lagi.</p>}
      </div>
    </div>
  );
}
