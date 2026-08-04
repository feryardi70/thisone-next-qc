import getSession from "@/app/action/session";
import DataUjiPesawatDentalIntaoral from "@/app/components/dental/dataUjiPesawatDentalIntaoral";
import { redirect } from "next/navigation";

export default async function DaftarPesawatDentalParameterUjiPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { id_spesifikasi, id_user } = await searchParams;
  const payloadQueryParams = {
    spesifikasiId: id_spesifikasi ? parseInt(id_spesifikasi as string, 10) : 0,
    userId: id_user ? parseInt(id_user as string, 10) : 0,
  };

  return (
    <div>
      <DataUjiPesawatDentalIntaoral payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
