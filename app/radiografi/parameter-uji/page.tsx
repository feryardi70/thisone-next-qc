// "use client";

//import AuthLayer from "../components/auth-layer";
import getSession from "@/app/action/session";
import DataUjiPesawatRad from "@/app/components/radiografi/dataUjiPesawatRadiografi";
import { redirect } from "next/navigation";

export default async function DaftarPesawatRadiografiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const { id_spesifikasi, id_user } = await searchParams;
  const payloadQueryParams = {
    spesifikasiId: parseInt(id_spesifikasi as string, 10),
    userId: parseInt(id_user as string, 10),
  }

  return <div>
    <DataUjiPesawatRad payloadQueryParams={payloadQueryParams} />
  </div>;
}
