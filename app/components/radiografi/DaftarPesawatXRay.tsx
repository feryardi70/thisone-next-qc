"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { deleteDataRadByIdSpec } from "@/app/DAL/repository/spec-repository";
import SpinnerCss from "../spinner-css";
import AddDataRadModal from "./AddDataRadModal";
import EditDataRadDrawer from "./EditDataRadDrawer";
import type { Pesawat } from "./ModalitySection";

export type DaftarPesawatXRayVariant = "dashboard" | "dashboardRad";

interface DaftarPesawatXRayProps {
  identifikasiPesawatUnik: Pesawat[];
  dataUji: { jenis_pesawat?: string }[];
  allDataUji: { id_user: number }[];
  checkDS: number;
  isLoading?: boolean;
  onSuccess?: () => void;
  variant?: DaftarPesawatXRayVariant;
}

export default function DaftarPesawatXRay({
  identifikasiPesawatUnik,
  dataUji,
  allDataUji,
  checkDS,
  isLoading,
  onSuccess,
  variant = "dashboard",
}: DaftarPesawatXRayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editSerial, setEditSerial] = useState<string | null>(null);
  const [selectedSpecId, setSelectedSpecId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isDashboard = variant === "dashboard";

  const openModal = (id: number) => {
    setSelectedSpecId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpecId(null);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteDataRadByIdSpec(selectedSpecId);

      if (response.status == 200) {
        closeModal();
        if (isDashboard) {
          onSuccess?.();
          toast.success("Successfully Delete Pesawat Sinar-X data");
        } else {
          alert("successfully delete data pesawat sinar-x");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error deleting data pesawat sinar-x:", error);
      closeModal();
      if (isDashboard) {
        toast.error("Failed to add data", {
          className: "bg-red-400 text-black",
        });
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const rows = identifikasiPesawatUnik.map((machine, i) => (
    <tr key={machine.id_spesifikasi} className="odd:bg-green-50 even:bg-green-100 text-green-800">
      <td className="text-center w-7 px-3 py-2">{++i}</td>
      <td className="hidden">{machine.id_spesifikasi}</td>
      <td className="text-center px-3 py-2">{machine.Merk}</td>
      <td className="text-center px-3 py-2">{machine.Model}</td>
      <td className="text-center px-3 py-2">{machine.No_Seri}</td>
      <td className="hidden">{machine.id_user}</td>
      <td className="hidden">{machine.jenis_pesawat}</td>
      <td className="text-center px-3 py-2">
        {isDashboard ? (
          <span className="px-2 pb-1 bg-green-300 rounded-lg hover:bg-gray-300 hover:underline">
            <button onClick={() => setEditSerial(machine.No_Seri)}>
              <small>Edit</small>
            </button>
          </span>
        ) : (
          <span className="px-2 pb-1 bg-green-300 rounded-lg hover:bg-gray-300 hover:underline">
            <Link href={`/radiografi/${machine.No_Seri}`}>
              <small>Edit</small>
            </Link>
          </span>
        )}
        <span className="px-2 pb-1 bg-red-500 rounded-lg ml-1 hover:bg-rose-300">
          <button className="hover:underline" onClick={() => openModal(machine.id_spesifikasi)}>
            <small>Delete</small>
          </button>
        </span>
        <span className="px-2 pb-1 bg-green-500 rounded-lg ml-1 hover:bg-gray-300 hover:underline">
          <Link href={`/radiografi/parameter-uji?id_spesifikasi=${machine.id_spesifikasi}&id_user=${machine.id_user}`} target="blank">
            <small>manage</small>
          </Link>
        </span>
        <span className="px-2 pb-1 bg-lime-400 rounded-lg ml-1 hover:bg-gray-300 hover:underline">
          <Link href={`/radiografi/report?id_spesifikasi=${machine.id_spesifikasi}`} target="blank">
            <small>report</small>
          </Link>
        </span>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-4 dark:text-gray-400">
        <div className="md:hidden">Unsupported Table</div>
        <div className="italic md:hidden">gunakan pc/tablet untuk melihat tabel</div>
        <div className="italic md:hidden">atau ubah tampilan menjadi desktop view</div>
      </div>

      <div className="hidden md:flex flex-col items-center overflow-x-auto w-full">
        <div className="w-[85%] shadow-md rounded-xl p-4 bg-white dark:bg-gray-900 px-10 py-10 border border-green-700 dark:border-green-800">
          <div>
            <div className="text-xl mb-3 text-green-700 dark:text-green-400">Daftar Pesawat Sinar-X {dataUji[0] ? `${dataUji[0].jenis_pesawat}` : null}</div>
          </div>

          {checkDS ? (
            <div className="overflow-x-auto w-full">
              <table className="my-4 w-full border-collapse">
                <thead className="text-lg mb-5 bg-green-100 dark:bg-green-900/50 py-5">
                  <tr className="py-5 border-b-2 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
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
                <tbody className="text-xl dark:text-gray-200">{rows}</tbody>
              </table>
            </div>
          ) : (
            <div className="text-green-800 dark:text-green-400">No data available</div>
          )}

          {isLoading ? <SpinnerCss /> : null}
          <div className="mt-4 flex justify-center items-center">
            {isDashboard ? (
              <button
                className="bg-green-400 hover:bg-fuchsia-300 px-2 py-1 rounded-lg flex flex-row dark:bg-green-700 dark:hover:bg-fuchsia-700 dark:text-white"
                onClick={() => allDataUji[0] && setIsAddModalOpen(true)}
              >
                <Plus />
                <span>Add New Data</span>
              </button>
            ) : (
              <Link
                className="bg-green-400 hover:bg-fuchsia-300 px-2 py-1 rounded-lg flex flex-row"
                href={allDataUji[0] ? `/radiografi/add?id_user=${allDataUji[0].id_user}` : "#"}
              >
                <Plus />
                <span>Add New Data</span>
              </Link>
            )}
          </div>

          {isDashboard && isAddModalOpen && allDataUji[0] && (
            <AddDataRadModal id_user={allDataUji[0].id_user} onClose={() => setIsAddModalOpen(false)} onSuccess={() => onSuccess?.()} />
          )}
          {isDashboard && <EditDataRadDrawer open={editSerial !== null} No_Seri={editSerial} onClose={() => setEditSerial(null)} onSuccess={() => onSuccess?.()} />}

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-white/10 dark:bg-black/50 backdrop-blur-md z-50">
              {isDashboard ? (
                <div className="bg-gray-900 dark:bg-gray-800 backdrop-blur-md border-2 p-6 rounded-lg shadow-lg w-1/3">
                  <h3 className="text-lg font-semibold mb-2 text-white">Are you sure you want to delete this data?</h3>
                  <p className="mb-3 text-gray-500">
                    <small>This action cannot be undone!</small>
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 py-2 rounded">
                      {isDeleting ? "Menghapus..." : "Yes"}
                    </button>
                    <button onClick={closeModal} disabled={isDeleting} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-200">
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white backdrop-blur-md border-2 border-green-500 p-6 rounded-lg shadow-lg w-1/3">
                  <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this data?</h3>
                  <div className="flex justify-end space-x-4">
                    <button onClick={handleDelete} className="bg-fuchsia-500 text-white px-4 py-2 rounded">
                      Yes
                    </button>
                    <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
