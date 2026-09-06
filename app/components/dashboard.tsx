"use client";

import SideBar from "../components/Sidebar";
import { useFetchDataUjiByUserEmail } from "../DAL/service/fetch-data-uji-by-userEmail";
import Header from "./Header";
import { TriangleAlert } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import HeadingMobileView from "./mobile-view/Heading";
import Heading from "./Heading";
import ModalitySection from "./radiografi/ModalitySection";
import ParameterUjiSection, { type ParameterUjiItem } from "./radiografi/ParameterUjiSection";
import IluminasiChart from "./PerformanceIlumData";
import ChartSection from "./radiografi/ChartSection";
import DaftarPesawatXRay from "./radiografi/DaftarPesawatXRay";
import type { Pesawat } from "./radiografi/ModalitySection";

export default function Dashboard({ email }: { email: string }) {
  const { allDataUji, dataUji, isLoading, errorMsg, refetch } = useFetchDataUjiByUserEmail(email);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentId = searchParams.get("id");
  const currentNoSeri = searchParams.get("No_Seri");

  const dataLength = allDataUji.length;
  const tanggalUji = allDataUji[dataLength - 1]?.Tanggal_uji;

  const identifikasiPesawat: Pesawat[] = allDataUji.map(({ id_user, jenis_pesawat, id_spesifikasi, Merk, Model, No_Seri }) => ({
    id_user,
    jenis_pesawat,
    id_spesifikasi,
    Merk,
    Model,
    No_Seri,
  }));

  const identifikasiPesawatUnik = identifikasiPesawat.filter((value, index, self) => index === self.findIndex((t) => t.id_user === value.id_user && t.Merk === value.Merk && t.Model === value.Model && t.No_Seri === value.No_Seri));

  const current = dataUji[0];
  const baseParams = current ? `?id_user=${current.id_user}&No_Seri=${current.No_Seri}` : "";

  const items: ParameterUjiItem[] = [
    { label: "Iluminasi", href: "/dashboard" },
    { label: "Kolimasi", href: `/dashboard/radiografi/kolimasi/${baseParams}` },
    { label: "Akurasi kVp", href: `/dashboard/radiografi/akurasi-kvp/${baseParams}` },
    { label: "Akurasi Waktu", href: `/dashboard/radiografi/akurasi-waktu/${baseParams}` },
    { label: "Linearitas", href: `/dashboard/radiografi/linearitas/${baseParams}` },
    { label: "Reproduksibilitas", href: `/dashboard/radiografi/reproduksibilitas/${baseParams}` },
    { label: "HVL", href: `/dashboard/radiografi/hvl/${baseParams}` },
    { label: "Kebocoran Tabung", href: `/dashboard/radiografi/kebocoran-tabung/${baseParams}` },
    { label: "AEC - Timer Darurat", href: `/dashboard/radiografi/timer-darurat/${baseParams}` },
    { label: "AEC - Densitas Standar dan Uniformitas", href: `/dashboard/radiografi/uniformitas/${baseParams}` },
    { label: "AEC - Penjejakan", href: `/dashboard/radiografi/penjejakan/${baseParams}` },
    { label: "AEC - Waktu Respon Minimum", href: `/dashboard/radiografi/trespon-min/${baseParams}` },
  ];

  const performanceData = dataUji
    .map(({ Tanggal_uji, Iluminasi }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Iluminasi,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const checkDS = allDataUji[0]?.id_spesifikasi != null ? 1 : 0;
  const checkTglUji = tanggalUji != null ? 1 : 0;

  return (
    <div className="dark:bg-gray-950">
      <div className="flex h-screen overflow-hidden bg-linear-to-b from-green-200 to-green-300 dark:from-green-950 dark:to-gray-950">
        <SideBar />

        <div className="flex-1 flex flex-col">
          <Header email={email} />

          <main className="flex-1 p-3 overflow-y-auto">
            <div className="flex flex-col items-center">
              {errorMsg.length == 0 ? null : (
                <div className="flex flex-row bg-red-300 text-rose-950 mt-1 rounded-lg px-10 py-2">
                  <div>
                    <TriangleAlert />
                  </div>
                  <div className="inline ml-1 text-xl">{errorMsg}</div>
                </div>
              )}

              <HeadingMobileView />

              <Heading />

              <div className="w-[75%]">
                <ModalitySection identifikasiPesawatUnik={identifikasiPesawatUnik} pathname={pathname} currentId={currentId} currentNoSeri={currentNoSeri} />
              </div>
              {checkTglUji ? (
                <div>
                  <ParameterUjiSection items={items} pathname={pathname} />
                </div>
              ) : null}
            </div>

            {checkTglUji ? (
              <ChartSection title="Iluminasi Tren" dataUji={dataUji} performanceData={performanceData} chartComponent={IluminasiChart} variant="dark" />
            ) : null}

            <DaftarPesawatXRay identifikasiPesawatUnik={identifikasiPesawatUnik} dataUji={dataUji} allDataUji={allDataUji} checkDS={checkDS} isLoading={isLoading} onSuccess={refetch} variant="dashboard" />
          </main>
        </div>
      </div>
    </div>
  );
}
