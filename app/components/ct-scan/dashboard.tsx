"use client";

import Link from "next/link";
import SideBar from "../Sidebar";
import Header from "../Header";
import SpinnerCss from "../spinner-css";
import PerformanceHVLChart from "./PerformanceHVLData";
import { useState } from "react";
import { TriangleAlert, Plus } from "lucide-react";
import { useFetchCTByParams } from "../../DAL/service/useFetchCTByParams";
import { deleteDataRadByIdSpec } from "../../DAL/repository/spec-repository";
import { usePathname, useSearchParams } from "next/navigation";
import HeadingMobileView from "../mobile-view/Heading";
import Heading from "../heading-other-modality/HeadingCt";

export default function DashboardCT({ email }: { email: string }) {
  const searchParams = useSearchParams();
  const currentId = searchParams.get("id");
  const currentNoSeri = searchParams.get("No_Seri");

  const { allDataUji, dataUji, isLoading, errorMsg } = useFetchCTByParams({
    id_user: currentId ? Number(currentId) : undefined,
    No_Seri: currentNoSeri || undefined,
    email,
  });

  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);

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
    { label: "HVL", href: "/dashboard/ct/hvl" },
    { label: "Reproduksibilitas", href: `/dashboard/ct/reproduksibilitas/${baseParams}` },
    { label: "Linearitas", href: `/dashboard/ct-scan/linearitas/${baseParams}` },
    { label: "CTDI Udara", href: `/dashboard/ct-scan/ctdi-udara/${baseParams}` },
    { label: "CTDI Head", href: `/dashboard/ct-scan/ctdi-head/${baseParams}` },
    { label: "CTDI Body", href: `/dashboard/ct-scan/ctdi-body/${baseParams}` },
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
    .map(({ Tanggal_uji, HVL }) => ({
      x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
      y: HVL,
    }))
    .filter((d) => d.y !== null && d.y !== undefined);

  const renderModality = () => {
    return (
      <div className="flex flex-wrap justify-center gap-1 mb-4">
        {identifikasiPesawatUnik.map((item, index) => {
          const href = tanggalUji == null ? "#" : index === 0 ? `/dashboard/ct-scan/kolimasi` : `/dashboard/ct-scan/kolimasi?No_Seri=${item.No_Seri}&id=${item.id_user}`;

          const isDefault = currentId === null && currentNoSeri === null;
          const isCurrent = currentId === String(item.id_user) && currentNoSeri === String(item.No_Seri);
          const isActive = index === 0 ? isDefault : isCurrent;

          return (
            <div key={index} className="w-3/4 md:w-2/3 lg:w-[45%]">
              <div
                className={`relative p-2.5 rounded-[35px]
            bg-[#e8e8e8]
            shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]
            transition-all duration-200`}
              >
                <Link href={href}>
                  <div
                    className={`flex flex-col justify-center items-center
                h-63.5 rounded-[30px] overflow-hidden text-center
                font-mono font-black space-y-1 bg-[#9bcda1]
                ${isActive ? "text-teal-800" : "text-gray-400 hover:text-green-900"}`}
                  >
                    <span className="text-4xl md:text-6xl lg:text-7xl">{item.Merk}</span>
                    <span className="mt-1 text-base">
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
      <div className="flex flex-row flex-wrap gap-1 w-full justify-center">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href.split("?")[0]);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-lg border text-sm transition-all ${
                isActive ? "px-3 py-1 bg-gray-950 text-green-400 border-green-700 shadow-lg shadow-slate-300" : "px-2 py-1 bg-green-100 text-gray-400 border-green-700 hover:text-green-800 hover:underline"
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
        <tr key={machine.id_spesifikasi} className="odd:bg-green-50 even:bg-green-100 text-green-800">
          <td className="text-center w-7 px-3 py-2">{++i}</td>
          <td className="hidden">{machine.id_spesifikasi}</td>
          <td className="text-center px-3 py-2">{machine.Merk}</td>
          <td className="text-center px-3 py-2">{machine.Model}</td>
          <td className="text-center px-3 py-2">{machine.No_Seri}</td>
          <td className="hidden">{machine.id_user}</td>
          <td className="hidden">{machine.jenis_pesawat}</td>
          <td className="text-center px-3 py-2">
            <span className="px-2 pb-1 bg-green-300 rounded-lg hover:bg-gray-300 hover:underline">
              <Link href={`/ct-scan/${machine.No_Seri}`}>
                <small>Edit</small>
              </Link>
            </span>
            <span className="px-2 pb-1 bg-red-500 rounded-lg ml-1 hover:bg-rose-300">
              <button className="hover:underline" onClick={() => openModal(machine.id_spesifikasi)}>
                <small>Delete</small>
              </button>
            </span>
            <span className="px-2 pb-1 bg-green-500 rounded-lg ml-1 hover:bg-gray-300 hover:underline">
              <Link href={`/ct-scan/parameter-uji?id_spesifikasi=${machine.id_spesifikasi}&id_user=${machine.id_user}`} target="blank">
                <small>manage</small>
              </Link>
            </span>
            <span className="px-2 pb-1 bg-lime-400 rounded-lg ml-1 hover:bg-gray-300 hover:underline">
              <Link href={`/ct-scan/report?id_spesifikasi=${machine.id_spesifikasi}`} target="blank">
                <small>report</small>
              </Link>
            </span>
          </td>
        </tr>
      );
    });
  };

  const checkDS = allDataUji[0]?.id_spesifikasi != null ? 1 : 0;

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-linear-to-b from-green-800 to-green-400">
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

              <div className="w-[75%]">{renderModality()}</div>
              <div>{renderParameterUji()}</div>
            </div>

            <div className="mt-4 flex flex-col items-center p-8 gap-1">
              <h1 className="text-2xl font-bold">Half Value Layer Tren</h1>
              <p>
                <small>{dataUji[0] ? `${dataUji[0].Merk} - ${dataUji[0].Model} - ${dataUji[0].No_Seri}` : "Loading..."}</small>
              </p>
              <div className="md:hidden">Unsupported Chart</div>
              <PerformanceHVLChart dataPoints={performanceData} />
            </div>

            <div className="hidden md:flex flex-col items-center overflow-x-auto w-full">
              <div className="w-[85%] shadow-md rounded-xl p-4 bg-white px-10 py-10 border border-green-700">
                <div>
                  <div className="text-xl mb-3 text-green-700">Daftar Pesawat Sinar-X {dataUji[0] ? `${dataUji[0].jenis_pesawat}` : null}</div>
                </div>

                {checkDS ? (
                  <div className="overflow-x-auto w-full">
                    <table className="my-4 w-full border-collapse">
                      <thead className="text-lg mb-5 bg-green-100 py-5">
                        <tr className="py-5 border-b-2 border-green-200 text-green-800">
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
                  <div className="text-green-800">No data available</div>
                )}

                {isLoading ? <SpinnerCss /> : null}
                <div className="mt-4 flex justify-center items-center">
                  <Link className="bg-green-400 hover:bg-fuchsia-300 px-2 py-1 rounded-lg flex flex-row" href={allDataUji[0] ? `/ct-scan/add?id_user=${allDataUji[0].id_user}` : "#"}>
                    <Plus />
                    <span>Add New Data</span>
                  </Link>
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center text-black bg-white/10 backdrop-blur-md z-50">
                    <div className="bg-white backdrop-blur-md border-2 border-green-500 p-6 rounded-lg shadow-lg w-1/3">
                      <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this data?</h3>
                      <div className="flex justify-end space-x-2">
                        <button onClick={handleDelete} className="bg-green-600 hover:bg-red-500 text-white px-4 py-2 rounded">
                          Yes
                        </button>
                        <button onClick={closeModal} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded">
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
