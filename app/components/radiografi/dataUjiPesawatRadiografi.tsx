"use client";

import SideBar from "../Sidebar";
import { Plus, TriangleAlert, SquareChevronLeftIcon } from "lucide-react";
import SpinnerCss from "../spinner-css";
import { useState } from "react";
import Header from "../Header";
import { useFetchDataUjiByUserIdnSpecId } from "@/app/DAL/service/parameter-uji-client-service";
import { deleteDataUjiByIdParameter } from "@/app/DAL/repository/parameter-uji-repository";
import { toast } from "sonner";
import AddDataUjiModal from "./AddDataUjiModal";
import EditDataUjiDrawer from "./EditDataUjiDrawer";
import TabbedDataTable from "../TabbedDataTable";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
  };
}

const tabColumns = [
  {
    key: "kolimasi",
    label: "Kolimasi",
    fields: ["Iluminasi", "Kolimasi_deltaX", "Kolimasi_deltaY", "Ketegaklurusan"] as const,
  },
  {
    key: "akurasi",
    label: "Akurasi",
    fields: ["Akurasi_kV", "Akurasi_waktu"] as const,
  },
  {
    key: "linearitas",
    label: "Linearitas & Reproduksibilitas",
    fields: ["Linearitas", "Reproduksibilitas", "Reproduksibilitas_kV", "Reproduksibilitas_waktu"] as const,
  },
  {
    key: "hvl",
    label: "HVL & Kebocoran",
    fields: ["HVL", "HVL_80", "Kebocoran"] as const,
  },
  {
    key: "aec",
    label: "AEC",
    fields: ["Timer_darurat_mAs", "Timer_darurat_s", "Uniformitas_mAs", "Uniformitas_EI", "Penjejakan_ketebalan", "Penjejakan_kV", "Penjejakan_kombinasi", "Waktu_respon_min"] as const,
  },
];

const fieldLabels: Record<string, string> = {
  Iluminasi: "Iluminasi",
  Kolimasi_deltaX: "Kolimasi ΔX",
  Kolimasi_deltaY: "Kolimasi ΔY",
  Ketegaklurusan: "Ketegaklurusan",
  Akurasi_kV: "Akurasi kV",
  Akurasi_waktu: "Akurasi waktu",
  Linearitas: "Linearitas",
  Reproduksibilitas: "Reproduksibilitas Kerma",
  Reproduksibilitas_kV: "Reproduksibilitas kV",
  Reproduksibilitas_waktu: "Reproduksibilitas waktu",
  HVL: "HVL 70kV",
  HVL_80: "HVL 80kV",
  Kebocoran: "Kebocoran",
  Timer_darurat_mAs: "Timer Darurat (mAs)",
  Timer_darurat_s: "Timer Darurat (s)",
  Uniformitas_mAs: "Uniformitas (mAs)",
  Uniformitas_EI: "Uniformitas (EI)",
  Penjejakan_ketebalan: "Penjejakan Ketebalan",
  Penjejakan_kV: "Penjejakan kV",
  Penjejakan_kombinasi: "Penjejakan Kombinasi",
  Waktu_respon_min: "Waktu Respon Minimum",
};

export default function DataUjiPesawatRad({ payloadQueryParams }: RadProps) {
  //console.log(payloadQueryParams);
  const [selectedParameterId, setSelectedParameterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { dataUji, isLoading, errorMsg, refetch } = useFetchDataUjiByUserIdnSpecId({ payloadQueryParams });

  const openModal = (id: number) => {
    setSelectedParameterId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParameterId(null);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteDataUjiByIdParameter(selectedParameterId);

      if (response.status == 200) {
        closeModal();
        refetch();
        toast.success("Successfully delete data uji");
      }
    } catch (error) {
      console.error("Error deleting data pesawat sinar-x:", error);
      toast.error("Failed to delete Data Uji");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex h-screen overflow-hidden bg-linear-to-b from-green-200 to-green-300 dark:from-green-950 dark:to-gray-950">
        {/* Sidebar */}
        <SideBar />
        {/* // */}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header email={dataUji[0] ? dataUji[0].email : ""} />

          {/* Content */}
          <main className="flex-1 p-3 mt-2 overflow-y-auto text-black">
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
              {errorMsg.length == 0 ? null : (
                <div className="flex flex-row bg-red-300 text-rose-950 mt-1 rounded-lg px-10 py-2">
                  <div>
                    <TriangleAlert />
                  </div>
                  <div className="inline ml-1 text-xl">{errorMsg}</div>
                </div>
              )}
              <div className="mt-1 w-[85%] shadow-md rounded-xl p-8 bg-white dark:bg-green-950 border border-green-700">
                <div>
                  <div className="w-fit text-xl text-green-950  mb-2">
                    <h6 className="flex flex-row dark:text-green-50">
                      <div className="mr-1 py-0.5">
                        <Tooltip>
                          <TooltipTrigger>
                            <Link href="/dashboard">
                              <SquareChevronLeftIcon />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Back to Radiografi Dashboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      Data Uji -{dataUji[0] ? ` ${dataUji[0].Merk} ${dataUji[0].Model} ${dataUji[0].No_Seri}` : "Loading..."}
                    </h6>
                  </div>
                </div>

                {isLoading ? (
                  <SpinnerCss />
                ) : dataUji.length === 0 || !dataUji[0]?.id_parameter ? (
                  <div className="text-center py-8 text-gray-500">No data available</div>
                ) : (
                  <TabbedDataTable
                    data={dataUji}
                    columns={tabColumns}
                    fieldLabels={fieldLabels}
                    keyField="id_parameter"
                    onEdit={(item) => {
                      setEditId(item.id_parameter);
                      setIsEditOpen(true);
                    }}
                    onDelete={(item) => openModal(item.id_parameter)}
                  />
                )}

                <div className="mt-4 flex justify-center items-center">
                  <button onClick={() => setIsAddModalOpen(true)} className="bg-green-400 hover:bg-fuchsia-300 px-2 py-1 rounded-lg flex flex-row">
                    <Plus />
                    <span>Add New Data</span>
                  </button>
                </div>
                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md z-50">
                    <div className="bg-white backdrop-blur-md border-2 border-green-500 p-6 rounded-lg shadow-lg w-1/3">
                      <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this data uji?</h3>
                      <div className="flex justify-end space-x-4">
                        <button onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 py-2 rounded">
                          {isDeleting ? "Menghapus..." : "Yes"}
                        </button>
                        <button onClick={closeModal} disabled={isDeleting} className="bg-gray-400 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Add Data Modal */}
                {isAddModalOpen && dataUji[0] && <AddDataUjiModal id_user={dataUji[0].id_user} id_spesifikasi={dataUji[0].id_spesifikasi} onClose={() => setIsAddModalOpen(false)} onSuccess={refetch} />}

                {/* Edit Data Drawer */}
                <EditDataUjiDrawer
                  open={isEditOpen}
                  id_parameter={editId}
                  onClose={() => {
                    setIsEditOpen(false);
                    setEditId(null);
                  }}
                  onSuccess={() => {
                    refetch();
                  }}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
