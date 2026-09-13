"use client";

import Link from "next/link";
import SideBar from "../Sidebar";
import PerformanceKolimChart from "./PerformanceKolimData";
import { useFetchFloByParams } from "../../DAL/service/useFetchFloByParams";
import SpinnerCss from "../spinner-css";
import { useState } from "react";
import Header from "../Header";
import { TriangleAlert, Plus } from "lucide-react";
import { deleteDataRadByIdSpec } from "../../DAL/repository/spec-repository";
import { usePathname, useSearchParams } from "next/navigation";
import HeadingMobileView from "../mobile-view/Heading";
import Heading from "../heading-other-modality/HeadingFlo";

export default function Dashboard({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");
  const currentNoSeri = searchParams.get("No_Seri");
  const { allDataUji, dataUji, isLoading, errorMsg } = useFetchFloByParams({
    id_user: currentId ? Number(currentId) : undefined,
    No_Seri: currentNoSeri || undefined,
    email: email,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);
  const pathname = usePathname();

  const dataLength = allDataUji.length;
  const tanggalUji = allDataUji[dataLength - 1]?.Tanggal_uji;

  const identifikasiPesawat = allDataUji.map(({ id_user, jenis_pesawat, id_spesifikasi, Merk, Model, No_Seri }) => ({
    id_user,
    jenis_pesawat,
    id_spesifikasi,
    Merk,
    Model,
    No_Seri,
  }));

  const identifikasiPesawatUnik = identifikasiPesawat.filter((value, index, self) => index === self.findIndex((t) => t.id_user === value.id_user && t.Merk === value.Merk && t.Model === value.Model && t.No_Seri === value.No_Seri));

  const current = dataUji[0];
  const baseParams = current ? `?id_user=${current.id_user}&id_specs=${current.id_spesifikasi}` : "";

  const items = [
    { label: "Kesesuaian Berkas Sinar-x dg Reseptor", href: "/dashboard/fluoroskopi/kolimasi" },
    { label: "Kesesuaian Titik Pusat", href: `/dashboard/fluoroskopi/titik-pusat/${baseParams}` },
    { label: "Akurasi kVp", href: `/dashboard/fluoroskopi/akurasi-kvp/${baseParams}` },
    { label: "Waktu Fluoroskopik Maksimum", href: `/dashboard/fluoroskopi/waktu-flo/${baseParams}` },
    { label: "HVL", href: `/dashboard/fluoroskopi/hvl/${baseParams}` },
    { label: "Laju Dosis Tipikal", href: `/dashboard/fluoroskopi/esd/${baseParams}` },
    { label: "Laju Dosis Maksimum", href: `/dashboard/fluoroskopi/dosis-maksimum/${baseParams}` },
    { label: "Kesesuaian Berkas Sinar-x dg Monitor", href: `/dashboard/fluoroskopi/asx-aem/${baseParams}` },
    { label: "Laju Dosis permukaaan Reseptor", href: `/dashboard/fluoroskopi/input-ii/${baseParams}` },
    { label: "Low Contrast", href: `/dashboard/fluoroskopi/low-contrast/${baseParams}` },
    { label: "High Contrast/Resolusi Spasial", href: `/dashboard/fluoroskopi/high-contrast/${baseParams}` },
  ];

  const openModal = (id: number) => {
    setSelectedSpecId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpecId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDataRadByIdSpec(selectedSpecId);

      if (response.status == 200) {
        alert("successfully delete data pesawat sinar-x");
      }
    } catch (error) {
      console.error("Error deleting data pesawat sinar-x:", error);
    } finally {
      closeModal();
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const performanceData = dataUji
    .map(({ Tanggal_uji, Kolimasi_deltaX }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: Kolimasi_deltaX,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const renderModality = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        {identifikasiPesawatUnik.map((item, index) => {
          const href = tanggalUji == null ? "#" : index === 0 ? `/dashboard/fluoroskopi/kolimasi` : `/dashboard/fluoroskopi/kolimasi?No_Seri=${item.No_Seri}&id=${item.id_user}`;

          const isDefault = currentId === null && currentNoSeri === null;
          const isCurrent = currentId === String(item.id_user) && currentNoSeri === String(item.No_Seri);
          const isActive = index === 0 ? isDefault : isCurrent;

          return (
            <div key={index} className="w-full">
              <div
                className={`relative p-2.5 rounded-[35px] transition-all duration-300 hover:scale-[1.02]
            bg-gradient-to-br from-green-800/80 to-green-900/80
            shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_4px_16px_-4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
            hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6),0_6px_20px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]
            border border-green-700/30`}
              >
                <Link href={href}>
                  <div
                    className={`flex flex-col justify-center items-center
                h-[200px] md:h-[254px] rounded-[30px] overflow-hidden text-center
                font-mono font-black space-y-1 bg-gradient-to-br from-green-600/90 to-green-700/90
                ${isActive ? "text-white shadow-lg shadow-green-500/30" : "text-green-200/70 hover:text-white"}`}
                  >
                    <span className="text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">{item.Merk}</span>
                    <span className="mt-1 text-sm md:text-base font-medium">
                      {item.Model} - {item.No_Seri}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderParameterUji = () => {
    return (
      <div className="flex flex-row flex-wrap gap-2 w-full justify-center">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href.split("?")[0]);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                isActive ? "px-3 sm:px-4 py-2 bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/30 hover:bg-emerald-500" : "px-2 sm:px-3 py-2 bg-green-900/40 text-green-200 border-green-700/50 hover:bg-green-800/60 hover:text-white hover:border-green-500"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    );
  };

  const renderDaftarPesawatXRay = () => {
    return identifikasiPesawatUnik.map((machine, i) => {
      return (
        <tr key={machine.id_spesifikasi} className="odd:bg-green-900/40 even:bg-green-950/30 text-green-100 border-b border-green-800/40 hover:bg-green-800/40 transition-colors">
          <td className="text-center w-7 px-3 py-2 text-green-200">{++i}</td>
          <td className="hidden">{machine.id_spesifikasi}</td>
          <td className="text-center px-3 py-2 font-medium">{machine.Merk}</td>
          <td className="text-center px-3 py-2 font-medium">{machine.Model}</td>
          <td className="text-center px-3 py-2 font-medium">{machine.No_Seri}</td>
          <td className="hidden">{machine.id_user}</td>
          <td className="hidden">{machine.jenis_pesawat}</td>
          <td className="text-center px-3 py-2">
            <div className="flex flex-wrap justify-center gap-1">
              <span className="px-2.5 py-1 bg-emerald-600/80 hover:bg-emerald-500 rounded-lg transition-colors inline-block">
                <Link href={`/fluoroskopi/${machine.No_Seri}`} className="text-white text-xs font-medium">
                  Edit
                </Link>
              </span>
              <span className="px-2.5 py-1 bg-red-700/80 hover:bg-red-600 rounded-lg transition-colors inline-block">
                <button className="hover:underline text-white text-xs font-medium" onClick={() => openModal(machine.id_spesifikasi)}>
                  Delete
                </button>
              </span>
              <span className="px-2.5 py-1 bg-green-600/80 hover:bg-green-500 rounded-lg transition-colors inline-block">
                <Link href={`/fluoroskopi/parameter-uji?id_spesifikasi=${machine.id_spesifikasi}&id_user=${machine.id_user}`} target="blank" className="text-white text-xs font-medium">
                  manage
                </Link>
              </span>
              <span className="px-2.5 py-1 bg-lime-600/80 hover:bg-lime-500 rounded-lg transition-colors inline-block">
                <Link href={`/fluoroskopi/report?id_spesifikasi=${machine.id_spesifikasi}`} target="blank" className="text-white text-xs font-medium">
                  report
                </Link>
              </span>
            </div>
          </td>
        </tr>
      );
    });
  };

  const checkDS = allDataUji[0]?.id_spesifikasi != null ? 1 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800">
      <div className="flex h-screen overflow-hidden">
        <SideBar />

        <div className="flex-1 flex flex-col">
          <Header email={email} />

          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto">
            <div className="flex flex-col items-center w-full px-2 sm:px-4">
              {errorMsg.length == 0 ? null : (
                <div className="flex flex-row bg-red-900/80 text-red-100 mt-2 rounded-lg px-4 sm:px-6 py-3 border border-red-700/50 max-w-2xl w-full">
                  <TriangleAlert className="text-red-400 shrink-0" />
                  <div className="inline ml-2 text-base sm:text-lg">{errorMsg}</div>
                </div>
              )}

              <div className="w-full flex flex-col items-center gap-3 mb-6">
                <HeadingMobileView />
                <Heading />
              </div>

              <div className="w-full max-w-7xl">{renderModality()}</div>
              <div className="w-full max-w-7xl mt-4">{renderParameterUji()}</div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center p-4 sm:p-6 gap-3 w-full max-w-6xl mx-auto">
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-50 drop-shadow-lg">Kesesuaian Berkas Sinar-x dg Reseptor Tren</h1>
                <p className="text-green-200/80 mt-1">
                  <small>{dataUji[0] ? `${dataUji[0].Merk} - ${dataUji[0].Model} - ${dataUji[0].No_Seri}` : "Loading..."}</small>
                </p>
              </div>
              <div className="w-full flex justify-center overflow-x-auto">
                <PerformanceKolimChart dataPoints={performanceData} />
              </div>
            </div>

            <div className="flex flex-col items-center mb-6 w-full px-2 sm:px-4">
              <div className="w-full max-w-6xl mx-auto overflow-x-auto rounded-xl border border-green-700/50 shadow-lg shadow-black/20">
                <table className="min-w-full bg-green-900/30 backdrop-blur-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-800/80 to-green-900/80 text-green-50">
                      <th className="text-center w-10 sm:w-12 px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm">#</th>
                      <th className="hidden">Spesification ID</th>
                      <th className="text-center px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm">Merk</th>
                      <th className="text-center px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm">Model</th>
                      <th className="text-center px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm">No Seri</th>
                      <th className="hidden">Jenis Pesawat</th>
                      <th className="hidden">Modality ID</th>
                      <th className="text-center px-3 sm:px-4 py-3 font-semibold text-xs sm:text-sm">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-base sm:text-lg md:text-xl">{renderDaftarPesawatXRay()}</tbody>
                </table>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-center overflow-x-auto w-full">
              <div className="w-full max-w-6xl shadow-2xl rounded-2xl p-6 bg-gradient-to-br from-green-900/60 to-green-950/60 px-6 lg:px-8 py-8 border border-green-700/40 backdrop-blur-sm">
                <div className="text-xl mb-3 text-green-100 font-semibold">
                  Daftar Pesawat Sinar-X {dataUji[0] ? `${dataUji[0].jenis_pesawat}` : null}
                </div>

                {checkDS ? (
                  <div className="overflow-x-auto w-full">
                    <table className="my-4 w-full border-collapse">
                      <thead className="text-lg mb-5 bg-green-800/50 py-5">
                        <tr className="py-5 border-b-2 border-green-600/50 text-green-100">
                          <th className="text-center w-7 px-3">#</th>
                          <th className="hidden">Spesification ID</th>
                          <th className="text-center px-3">Merk</th>
                          <th className="text-center px-3">Model</th>
                          <th className="text-center px-3">No Seri</th>
                          <th className="hidden">Jenis Pesawat</th>
                          <th className="hidden">Modality ID</th>
                          <th className="text-center px-3">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="text-xl">{renderDaftarPesawatXRay()}</tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-green-200/70 italic">No data available</div>
                )}

                {isLoading ? <SpinnerCss /> : null}
                <div className="mt-6 flex justify-center items-center">
                  <Link className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 px-4 py-2 rounded-lg flex flex-row items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all duration-200" href={allDataUji[0] ? `/fluoroskopi/add?id_user=${allDataUji[0].id_user}` : "#"}>
                    <Plus />
                    <span>Add New Data</span>
                  </Link>
                </div>
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center text-black bg-black/60 backdrop-blur-md z-50">
                    <div className="bg-gradient-to-br from-green-900 to-green-950 backdrop-blur-md border-2 border-emerald-500/50 p-6 rounded-xl shadow-2xl shadow-emerald-500/20 w-full max-w-md mx-4">
                      <h3 className="text-lg font-semibold mb-4 text-green-50">Are you sure you want to delete this data?</h3>
                      <div className="flex justify-end space-x-3">
                        <button onClick={handleDelete} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-200">
                          Yes
                        </button>
                        <button onClick={closeModal} className="bg-green-800/60 hover:bg-green-700/80 text-green-100 px-5 py-2 rounded-lg border border-green-700/50 transition-all duration-200">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
