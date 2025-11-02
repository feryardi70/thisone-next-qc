"use client";

import Link from "next/link";
import SideBar from "../components/Sidebar";
import PerformanceChart from "./PerformanceIlumData";
import { useFetchRadMachineByUserIdnSNNumber } from "../DAL/service/radiografi-service";
import Header from "./Header";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert, Plus } from "lucide-react";
import { useState } from "react";
import SpinnerCss from "./spinner-css";
import { deleteDataRadByIdSpec } from "../DAL/repository/spec-repository";
import { useSearchParams } from "next/navigation";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export default function DashboardRad({
  payloadQueryParams,
}: DashboardRadProps) {
  const { dataUji, allDataUji, isLoading, errorMsg } =
    useFetchRadMachineByUserIdnSNNumber({ payloadQueryParams });

  const searchParams = useSearchParams();

  const currentId = searchParams.get("id");
  const currentNoSeri = searchParams.get("No_Seri");
  console.log(currentId, currentNoSeri);

  const identifikasiPesawat = allDataUji.map(
    ({ id_user, jenis_pesawat, id_spesifikasi, Merk, Model, No_Seri }) => ({
      id_user,
      jenis_pesawat,
      id_spesifikasi,
      Merk,
      Model,
      No_Seri,
    })
  );
  //console.log(identifikasiPesawat);

  const identifikasiPesawatUnik = identifikasiPesawat.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.id_user === value.id_user &&
          t.Merk === value.Merk &&
          t.Model === value.Model &&
          t.No_Seri === value.No_Seri
      )
  );

  const performanceData = dataUji.map(({ Tanggal_uji, Iluminasi }) => ({
    x: new Date(Tanggal_uji).toLocaleDateString("en-CA"),
    y: Iluminasi,
  }))
  .filter((d) => d.y !== null && d.y !== undefined);

  const renderModality = () => {
    return identifikasiPesawatUnik.map((item, index) => {
      const href =
        index === 0
          ? `/dashboard`
          : `/dashboard/radiografi?No_Seri=${item.No_Seri}&id=${item.id_user}`;

      return (
        <div
          key={index}
          className="w-full min-w-0 relative p-2.5 rounded-[35px] bg-[#e8e8e8] shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px,rgba(10,37,64,0.35)_0px_-2px_6px_0px_inset]"
        >
          <Link href={href}>
            <div className="flex flex-col justify-center items-center w-full min-w-[300px] h-[254px] rounded-[30px] bg-[#e2e0e0] overflow-hidden text-center font-mono font-black space-y-1 text-green-700 hover:text-green-900">
              <span className="text-7xl">{item.Merk}</span>
              <span className="mt-1 text-base">
                {item.Model} - {item.No_Seri}
              </span>
            </div>
          </Link>
        </div>
      );
    });
  };

  const renderParameterUji = () => {
    return (
      <div className="flex flex-row gap-1">
        <Link
          href={dataUji[0]
              ? `/dashboard/radiografi?No_Seri=${dataUji[0].No_Seri}&id=${dataUji[0].id_user}`
              : "#"}
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Iluminasi</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/kolimasi/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Kolimasi</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/akurasi-kvp/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Akurasi kVp</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/akurasi-waktu/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Akurasi Waktu</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/linearitas/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Linearitas</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/reproduksibilitas/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Reproduksibilitas</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/hvl/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>HVL</small>
        </Link>
        <Link
          href={
            dataUji[0]
              ? `/dashboard/radiografi/kebocoran-tabung/?id_user=${dataUji[0].id_user}&No_Seri=${dataUji[0].No_Seri}`
              : "#"
          }
          className="py-1 px-2 rounded-lg bg-gray-100 text-green-700 border border-green-700 hover:text-green-800 hover:underline"
        >
          <small>Kebocoran Tabung</small>
        </Link>
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(
    null
  );

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

  const renderDaftarPesawatXRay = () => {
    return identifikasiPesawatUnik.map((machine, i) => {
      return (
        <tr key={machine.id_spesifikasi}>
          <td className="text-center w-7 px-3 py-2">{++i}</td>
          <td className="hidden">{machine.id_spesifikasi}</td>
          <td className="text-center px-3 py-2">{machine.Merk}</td>
          <td className="text-center px-3 py-2">{machine.Model}</td>
          <td className="text-center px-3 py-2">{machine.No_Seri}</td>
          <td className="hidden">{machine.id_user}</td>
          <td className="hidden">{machine.jenis_pesawat}</td>
          <td className="text-center px-3 py-2">
            <span className="px-2 bg-green-400 rounded-lg hover:bg-green-500 hover:underline">
              <Link
                href={`/radiografi/${machine.No_Seri}`}
              >
                edit
              </Link>
            </span>
            <span className="px-2 bg-red-400 rounded-lg ml-1 hover:bg-red-600 hover:underline">
              <button onClick={() => openModal(machine.id_spesifikasi)}>
                Delete
              </button>
            </span>
            <span className="px-2 bg-gray-400 rounded-lg ml-1 hover:bg-gray-300 hover:underline">
              <Link
                href={`/radiografi/parameter-uji?id_spesifikasi=${machine.id_spesifikasi}&id_user=${machine.id_user}`}
              >
                manage
              </Link>
            </span>
          </td>
        </tr>
      );
    });
  };

  const checkDS = allDataUji[0]?.id_spesifikasi != null ? 1 : 0;
  //console.log("checkDS:", checkDS);

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        {/* Sidebar */}
        <SideBar />
        {/* // */}

        {/* Main */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header email={allDataUji[0] ? allDataUji[0].email : ""} />

          {/* Content */}
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
              <div className="mt-2 flex flex-row gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="text-green-700 border-green-700 hover:text-green-800 hover:underline"
                >
                  Radiografi Umum/Mobile
                </Badge>
                <Badge className=" bg-green-800 text-yellow-200 hover:text-yellow-300 hover:underline">
                  Fluroskopi
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600 hover:text-gray-200 hover:underline"
                >
                  CT Scan
                </Badge>
                <Badge
                  variant="destructive"
                  className="text-orange-100 hover:text-orange-200 hover:underline"
                >
                  Dental
                </Badge>
                <Badge
                  variant="default"
                  className="text-fuchsia-300 hover:text-fuchsia-400 hover:underline"
                >
                  Mammografi
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-1 mb-4">{renderModality()}</div>
              <div>{renderParameterUji()}</div>
            </div>

            {/* Cards */}
            <div className="mt-4 flex flex-col items-center p-8 gap-1">
              <h1 className="text-2xl font-bold">Iluminasi Tren</h1>
              <p>
                <small>
                  {dataUji[0]
                    ? `${dataUji[0].Merk} - ${dataUji[0].Model} - ${dataUji[0].No_Seri}`
                    : "Loading..."}
                </small>
              </p>
              <PerformanceChart dataPoints={performanceData} />
            </div>

            <div className="flex flex-col items-center ">
              <div className="w-[85%] shadow-md rounded-xl p-4 bg-white  px-10 py-10 border border-green-700">
                <div>
                  <div className="text-xl mb-3">
                    Daftar Pesawat Sinar-X{" "}
                    {dataUji[0] ? `${dataUji[0].jenis_pesawat}` : null}
                  </div>
                </div>

                {checkDS ? (<div className="overflow-x-auto w-full">
                  <table className="my-4 w-full border-collapse">
                    <thead className="text-lg mb-5 bg-green-100 py-5">
                      <tr className="py-5 border-b-2 border-green-200">
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
                    <tbody className="text-xl">
                      {renderDaftarPesawatXRay()}
                    </tbody>
                  </table>
                </div>) : (<div>No data available</div>)}    
                
                {isLoading ? <SpinnerCss /> : null}
                <div className="mt-4 flex justify-center items-center">
                  <Link className="bg-green-400 hover:bg-fuchsia-300 px-2 py-1 rounded-lg flex flex-row" href={allDataUji[0]
                    ? `/radiografi/add?id_user=${allDataUji[0].id_user}`
                    : "#"}>
                    <Plus /><span>Add New Data</span>
                  </Link>
                </div>
                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md z-50">
                    <div className="bg-white backdrop-blur-md border-2 border-green-500 p-6 rounded-lg shadow-lg w-1/3">
                      <h3 className="text-lg font-semibold mb-4">
                        Are you sure you want to delete this data?
                      </h3>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={handleDelete}
                          className="bg-fuchsia-500 text-white px-4 py-2 rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-gray-300 px-4 py-2 rounded"
                        >
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
