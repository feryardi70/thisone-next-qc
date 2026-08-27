"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addDataUji } from "@/app/DAL/repository/parameter-uji-repository";

interface AddDataUjiModalProps {
  id_user: number;
  id_spesifikasi: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDataUjiModal({ id_user, id_spesifikasi, onClose, onSuccess }: AddDataUjiModalProps) {
  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState({
    Iluminasi: "",
    Kolimasi_deltaX: "",
    Kolimasi_deltaY: "",
    Ketegaklurusan: "",
    Akurasi_kV: "",
    Akurasi_waktu: "",
    Linearitas: "",
    Reproduksibilitas: "",
    Reproduksibilitas_kV: "",
    Reproduksibilitas_waktu: "",
    HVL: "",
    HVL_80: "",
    Kebocoran: "",
    Timer_darurat_mAs: "",
    Timer_darurat_s: "",
    Uniformitas_mAs: "",
    Uniformitas_EI: "",
    Penjejakan_ketebalan: "",
    Penjejakan_kV: "",
    Penjejakan_kombinasi: "",
    Waktu_respon_min: "",
    Tanggal_uji: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataUjiData = {
      Iluminasi: dataUji.Iluminasi,
      Kolimasi_deltaX: dataUji.Kolimasi_deltaX,
      Kolimasi_deltaY: dataUji.Kolimasi_deltaY,
      Ketegaklurusan: dataUji.Ketegaklurusan,
      Akurasi_kV: dataUji.Akurasi_kV,
      Akurasi_waktu: dataUji.Akurasi_waktu,
      Linearitas: dataUji.Linearitas,
      Reproduksibilitas: dataUji.Reproduksibilitas,
      Reproduksibilitas_kV: dataUji.Reproduksibilitas_kV,
      Reproduksibilitas_waktu: dataUji.Reproduksibilitas_waktu,
      HVL: dataUji.HVL,
      HVL_80: dataUji.HVL_80,
      Kebocoran: dataUji.Kebocoran,
      Timer_darurat_mAs: dataUji.Timer_darurat_mAs,
      Timer_darurat_s: dataUji.Timer_darurat_s,
      Uniformitas_mAs: dataUji.Uniformitas_mAs,
      Uniformitas_EI: dataUji.Uniformitas_EI,
      Penjejakan_ketebalan: dataUji.Penjejakan_ketebalan,
      Penjejakan_kV: dataUji.Penjejakan_kV,
      Penjejakan_kombinasi: dataUji.Penjejakan_kombinasi,
      Waktu_respon_min: dataUji.Waktu_respon_min,
      Tanggal_uji: dataUji.Tanggal_uji,
      id_user,
      id_spesifikasi,
    };

    try {
      const { saveResponse } = await addDataUji(dataUjiData);

      if (saveResponse.status !== 200) {
        setLoading(false);
        toast.error("Failed to add data");
        return;
      }

      onClose();
      onSuccess();
      toast.success("Successfully add new data uji");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to add data");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 z-50">
      <div className="bg-emerald-900 text-white p-6 rounded-lg shadow-lg w-[95%] md:w-[90%] lg:w-[80%] max-h-[90vh] overflow-y-auto">
        <h2 className="mb-5 text-center text-xl font-semibold">Form Add Data Uji</h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between gap-5">
            <div className="flex flex-col w-[33%]">
              <label htmlFor="modal-Iluminasi" className="mb-1 text-slate-500">
                Iluminasi
              </label>
              <input
                type="number"
                className="px-2 py-2 mb-5 border-2 border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Iluminasi"
                name="Iluminasi"
                value={dataUji.Iluminasi || ""}
                onChange={(e) => setDataUji({ ...dataUji, Iluminasi: e.target.value })}
                placeholder="100"
              />

              <label htmlFor="modal-Kolimasi_deltaX" className="mb-1 text-slate-500">
                Kolimasi ΔX
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Kolimasi_deltaX"
                name="Kolimasi_deltaX"
                value={dataUji.Kolimasi_deltaX || ""}
                onChange={(e) => setDataUji({ ...dataUji, Kolimasi_deltaX: e.target.value })}
                placeholder="2.0"
              />

              <label htmlFor="modal-Kolimasi_deltaY" className="mb-1 text-slate-500">
                Kolimasi ΔY
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Kolimasi_deltaY"
                name="Kolimasi_deltaY"
                value={dataUji.Kolimasi_deltaY || ""}
                onChange={(e) => setDataUji({ ...dataUji, Kolimasi_deltaY: e.target.value })}
                placeholder="2.0"
              />

              <label htmlFor="modal-Ketegaklurusan" className="mb-1 text-slate-500">
                Ketegaklurusan
              </label>
              <input
                type="text"
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Ketegaklurusan"
                name="Ketegaklurusan"
                value={dataUji.Ketegaklurusan || ""}
                onChange={(e) => setDataUji({ ...dataUji, Ketegaklurusan: e.target.value })}
                placeholder="< 1.5"
              />

              <label htmlFor="modal-Akurasi_kV" className="mb-1 text-slate-500">
                Akurasi kV
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Akurasi_kV"
                name="Akurasi_kV"
                value={dataUji.Akurasi_kV || ""}
                onChange={(e) => setDataUji({ ...dataUji, Akurasi_kV: e.target.value })}
                placeholder="10.0"
              />

              <label htmlFor="modal-Akurasi_waktu" className="mb-1 text-slate-500">
                Akurasi waktu
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Akurasi_waktu"
                name="Akurasi_waktu"
                value={dataUji.Akurasi_waktu || ""}
                onChange={(e) => setDataUji({ ...dataUji, Akurasi_waktu: e.target.value })}
                placeholder="10.0"
              />

              <label htmlFor="modal-Linearitas" className="mb-1 text-slate-500">
                Linearitas
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Linearitas"
                name="Linearitas"
                value={dataUji.Linearitas || ""}
                onChange={(e) => setDataUji({ ...dataUji, Linearitas: e.target.value })}
                placeholder="0.01"
              />
            </div>

            <div className="flex flex-col w-[33%]">
              <label htmlFor="modal-Reproduksibilitas" className="mb-1 text-slate-500">
                Reproduksibilitas Kerma
              </label>
              <input
                type="number"
                step={0.001}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Reproduksibilitas"
                name="Reproduksibilitas"
                value={dataUji.Reproduksibilitas || ""}
                onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas: e.target.value })}
                placeholder="0.000"
              />

              <label htmlFor="modal-Reproduksibilitas_kV" className="mb-1 text-slate-500">
                Reproduksibilitas kV
              </label>
              <input
                type="number"
                step={0.001}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Reproduksibilitas_kV"
                name="Reproduksibilitas_kV"
                value={dataUji.Reproduksibilitas_kV || ""}
                onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_kV: e.target.value })}
                placeholder="0.000"
              />

              <label htmlFor="modal-Reproduksibilitas_waktu" className="mb-1 text-slate-500">
                Reproduksibilitas waktu
              </label>
              <input
                type="number"
                step={0.001}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Reproduksibilitas_waktu"
                name="Reproduksibilitas_waktu"
                value={dataUji.Reproduksibilitas_waktu || ""}
                onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_waktu: e.target.value })}
                placeholder="0.000"
              />

              <label htmlFor="modal-HVL" className="mb-1 text-slate-500">
                HVL pada 70kV
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-HVL"
                name="HVL"
                value={dataUji.HVL || ""}
                onChange={(e) => setDataUji({ ...dataUji, HVL: e.target.value })}
                placeholder="2.1"
              />

              <label htmlFor="modal-HVL_80" className="mb-1 text-slate-500">
                HVL pada 80kV
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-HVL_80"
                name="HVL_80"
                value={dataUji.HVL_80 || ""}
                onChange={(e) => setDataUji({ ...dataUji, HVL_80: e.target.value })}
                placeholder="2.3"
              />

              <label htmlFor="modal-Kebocoran" className="mb-1 text-slate-500">
                Kebocoran
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Kebocoran"
                name="Kebocoran"
                value={dataUji.Kebocoran || ""}
                onChange={(e) => setDataUji({ ...dataUji, Kebocoran: e.target.value })}
                placeholder="0.01"
              />

              <label htmlFor="modal-Tanggal_uji" className="mb-1 text-slate-500">
                Tanggal Uji
              </label>
              <input
                type="date"
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Tanggal_uji"
                name="Tanggal_uji"
                value={dataUji.Tanggal_uji || ""}
                onChange={(e) => setDataUji({ ...dataUji, Tanggal_uji: e.target.value })}
              />
            </div>

            <div className="flex flex-col w-[33%]">
              <label htmlFor="modal-Timer_darurat_mAs" className="mb-1 text-slate-500">
                AEC - Timer Darurat (mAs)
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Timer_darurat_mAs"
                name="Timer_darurat_mAs"
                value={dataUji.Timer_darurat_mAs || ""}
                onChange={(e) => setDataUji({ ...dataUji, Timer_darurat_mAs: e.target.value })}
                placeholder="600"
              />

              <label htmlFor="modal-Timer_darurat_s" className="mb-1 text-slate-500">
                AEC - Timer Darurat (s)
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Timer_darurat_s"
                name="Timer_darurat_s"
                value={dataUji.Timer_darurat_s || ""}
                onChange={(e) => setDataUji({ ...dataUji, Timer_darurat_s: e.target.value })}
                placeholder="6"
              />

              <label htmlFor="modal-Uniformitas_mAs" className="mb-1 text-slate-500">
                AEC - Densitas Standar & Uniformitas (Error mAs)
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Uniformitas_mAs"
                name="Uniformitas_mAs"
                value={dataUji.Uniformitas_mAs || ""}
                onChange={(e) => setDataUji({ ...dataUji, Uniformitas_mAs: e.target.value })}
                placeholder="20"
              />

              <label htmlFor="modal-Uniformitas_EI" className="mb-1 text-slate-500">
                AEC - Densitas Standar & Uniformitas (Error EI)
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Uniformitas_EI"
                name="Uniformitas_EI"
                value={dataUji.Uniformitas_EI || ""}
                onChange={(e) => setDataUji({ ...dataUji, Uniformitas_EI: e.target.value })}
                placeholder="10"
              />

              <label htmlFor="modal-Penjejakan_ketebalan" className="mb-1 text-slate-500">
                AEC - Penjejakan Ketebalan
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Penjejakan_ketebalan"
                name="Penjejakan_ketebalan"
                value={dataUji.Penjejakan_ketebalan || ""}
                onChange={(e) => setDataUji({ ...dataUji, Penjejakan_ketebalan: e.target.value })}
                placeholder="10"
              />

              <label htmlFor="modal-Penjejakan_kV" className="mb-1 text-slate-500">
                AEC - Penjejakan kV
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Penjejakan_kV"
                name="Penjejakan_kV"
                value={dataUji.Penjejakan_kV || ""}
                onChange={(e) => setDataUji({ ...dataUji, Penjejakan_kV: e.target.value })}
                placeholder="15"
              />

              <label htmlFor="modal-Penjejakan_kombinasi" className="mb-1 text-slate-500">
                AEC - Penjejakan kombinasi
              </label>
              <input
                type="number"
                step={0.1}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Penjejakan_kombinasi"
                name="Penjejakan_kombinasi"
                value={dataUji.Penjejakan_kombinasi || ""}
                onChange={(e) => setDataUji({ ...dataUji, Penjejakan_kombinasi: e.target.value })}
                placeholder="20"
              />

              <label htmlFor="modal-Waktu_respon_min" className="mb-1 text-slate-500">
                AEC - Waktu Respon Minimum
              </label>
              <input
                type="number"
                step={0.01}
                className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                id="modal-Waktu_respon_min"
                name="Waktu_respon_min"
                value={dataUji.Waktu_respon_min || ""}
                onChange={(e) => setDataUji({ ...dataUji, Waktu_respon_min: e.target.value })}
                placeholder="3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50">
              {loading ? "Adding New Data... Please wait..." : "Add Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
