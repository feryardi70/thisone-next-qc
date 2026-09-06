"use client";

import SideBar from "../components/Sidebar";
import { useFetchRadMachineByUserIdnSNNumber } from "../DAL/service/radiografi-service";
import Header from "./Header";
import { TriangleAlert } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import HeadingMobileView from "./mobile-view/Heading";
import Heading from "./Heading";
import ModalitySection from "./radiografi/ModalitySection";
import ParameterUjiSection, { type ParameterUjiItem } from "./radiografi/ParameterUjiSection";
import PerformanceChart from "./PerformanceIlumData";
import ChartSection from "./radiografi/ChartSection";
import DaftarPesawatXRay from "./radiografi/DaftarPesawatXRay";
import type { Pesawat } from "./radiografi/ModalitySection";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export default function DashboardRad({ payloadQueryParams }: DashboardRadProps) {
  const { dataUji, allDataUji, isLoading, errorMsg } = useFetchRadMachineByUserIdnSNNumber({ payloadQueryParams });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentId = searchParams.get("id");
  const currentNoSeri = searchParams.get("No_Seri");

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
    { label: "Iluminasi", href: `/dashboard?No_Seri=${currentNoSeri}&id=${currentId}` },
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

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-800 to-green-500">
        <SideBar />

        <div className="flex-1 flex flex-col">
          <Header email={allDataUji[0] ? allDataUji[0].email : ""} />

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
              <div>
                <ParameterUjiSection items={items} pathname={pathname} />
              </div>
            </div>

            <ChartSection title="Iluminasi Tren" dataUji={dataUji} performanceData={performanceData} chartComponent={PerformanceChart} variant="light" />

            <DaftarPesawatXRay identifikasiPesawatUnik={identifikasiPesawatUnik} dataUji={dataUji} allDataUji={allDataUji} checkDS={checkDS} isLoading={isLoading} variant="dashboardRad" />
          </main>
        </div>
      </div>
    </div>
  );
}
