"use client";

import SideBar from "../Sidebar";
import { Plus, TriangleAlert } from "lucide-react";
import SpinnerCss from "../spinner-css";
import { useState } from "react";
import Link from "next/link";
import Header from "../Header";
import { useFetchDataUjiByUserIdnSpecId } from "@/app/DAL/service/parameter-uji-client-service";
import { deleteDataUjiByIdParameter } from "@/app/DAL/repository/parameter-uji-repository";
import { toast } from "sonner";

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
  };
}

export default function DataUjiPesawatRad({ payloadQueryParams }: RadProps) {
  //console.log(payloadQueryParams);
  const [selectedParameterId, setSelectedParameterId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dataUji, isLoading, errorMsg } = useFetchDataUjiByUserIdnSpecId({payloadQueryParams});

  const openModal = (id: number) => {
    setSelectedParameterId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParameterId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteDataUjiByIdParameter(selectedParameterId);

      if (response.status == 200) {
        alert("successfully delete data uji");
      }
    } catch (error) {
      console.error("Error deleting data pesawat sinar-x:", error);
      toast("failed to delete Data Uji")
    } finally {
      closeModal();
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const renderDataUji = () => {
    return dataUji.map((d, i) => {
      return (
        <tr key={d.id_parameter}>
          <td className="text-center w-7 px-3 py-2">{++i}</td>
          <td className="hidden">{d.id_parameter}</td>
          <td className="text-center px-3 py-2">{d.Iluminasi}</td>
          <td className="text-center px-3 py-2">{d.Kolimasi_deltaX}</td>
          <td className="text-center px-3 py-2">{d.Kolimasi_deltaY}</td>
          <td className="text-center px-3 py-2">{d.Akurasi_kV}</td>
          <td className="text-center px-3 py-2">{d.Akurasi_waktu}</td>
          <td className="text-center px-3 py-2">{d.Linearitas}</td>
          <td className="text-center px-3 py-2">{d.Reproduksibilitas}</td>
          <td className="text-center px-3 py-2">{d.HVL}</td>
          <td className="text-center px-3 py-2">{d.Kebocoran}</td>
          <td className="hidden">{d.id_user}</td>
          <td className="hidden">{d.id_spesifikasi}</td>
          <td className="text-center px-3 py-2">
            <span className="px-2 bg-green-400 rounded-lg hover:bg-green-500 hover:underline">
              <Link
                href={`/radiografi/parameter-uji/${d.id_parameter}`}
              >
                edit
              </Link>
            </span>
            <span className="px-2 bg-red-400 rounded-lg ml-1 hover:bg-red-600 hover:underline">
              <button onClick={() => openModal(d.id_parameter)}>
                Delete
              </button>
            </span>
          </td>
        </tr>
      );
    });
  };

  const checkPU = dataUji[0]?.id_parameter != null ? 1 : 0;

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        {/* Sidebar */}
        <SideBar />
        {/* // */}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header email={dataUji[0] ? dataUji[0].email : ''} />

          {/* Content */}
          <main className="flex-1 p-3 mt-2 overflow-y-auto">
            {/* <div>Email: {currentEmail}</div> */}

            {/* <div className="mt-0 flex flex-col items-center p-1 gap-1">
              <h1 className="text-2xl font-bold">Data Pengujian</h1>
              <p>
                <small>
                  {dataUji[0]
                    ? `${dataUji[0].Merk} - ${dataUji[0].Model} - ${dataUji[0].No_Seri}`
                    : "Loading..."}
                </small>
              </p>
            </div> */}
            
            {/* Cards */}
            <div className="flex flex-col items-center">
              {errorMsg.length == 0 ? null : <div className="flex flex-row bg-red-300 text-rose-950 mt-1 rounded-lg px-10 py-2">
                <div><TriangleAlert /></div>
                <div className="inline ml-1 text-xl">{errorMsg}</div>
              </div>}
              <div className="mt-1 w-[85%] shadow-md rounded-xl p-8 bg-white border border-green-700">
                <div>
                  <div className="text-xl text-green-900 mb-1"><small>Data Uji - 
                  {dataUji[0]
                    ? ` ${dataUji[0].Merk} ${dataUji[0].Model} ${dataUji[0].No_Seri}`
                    : "Loading..."}
                </small></div>
                </div>
                
                {checkPU ? (<div className="overflow-x-auto w-full">
                  <table className="my-4 w-full border-collapse">
                    <thead className="text-lg mb-5 bg-green-100 py-5">
                      <tr className="py-5 border-b-2 border-green-200">
                        <th className="text-center w-7 px-3">#</th>
                        <th className="hidden">Parameter ID</th>
                        <th className="text-center px-3">Iluminasi</th>
                        <th className="text-center px-3">Kolimasi ΔX</th>
                        <th className="text-center px-3">Kolimasi ΔY</th>
                        <th className="text-center px-3">Akurasi kV</th>
                        <th className="text-center px-3">Akurasi waktu</th>
                        <th className="text-center px-3">Linearitas</th>
                        <th className="text-center px-3">Reproduksibilitas</th>
                        <th className="text-center px-3">HVL</th>
                        <th className="text-center px-3">Kebocoran</th>
                        <th className="hidden">User ID</th>
                        <th className="hidden">Spesifikasi ID</th>
                        <th className="text-center px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-xl">
                      {renderDataUji()}
                    </tbody>
                  </table>
                </div>) : (<div>No data available</div>)}
                
                
                {isLoading ? <SpinnerCss /> : null}
                <div className="mt-4 flex justify-center items-center">
                  <Link className="bg-green-400 hover:bg-fuchsia-300 px-2 py-1 rounded-lg flex flex-row" href={dataUji[0]
                    ? `/radiografi/parameter-uji/add?id_user=${dataUji[0].id_user}&id_spesifikasi=${dataUji[0].id_spesifikasi}`
                    : "#"}>
                    <Plus /><span>Add New Data</span>
                  </Link>
                </div>
                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md z-50">
                    <div className="bg-white backdrop-blur-md border-2 border-green-500 p-6 rounded-lg shadow-lg w-1/3">
                      <h3 className="text-lg font-semibold mb-4">
                        Are you sure you want to delete this data uji?
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
