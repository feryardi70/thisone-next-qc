"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { editDataUjiByIdParameter, getDataUjiByIdParameter } from "@/app/DAL/repository/parameter-uji-repository";
import SpinnerCss from "../spinner-css";

interface EditDataUjiDrawerProps {
  open: boolean;
  id_parameter: number | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditDataUjiDrawer({ open, id_parameter, onClose, onSuccess }: EditDataUjiDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
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
    id_parameter: "",
    id_user: "",
    id_spesifikasi: "",
  });

  useEffect(() => {
    const fetchDataUjiById = async () => {
      setFetching(true);
      try {
        const data = await getDataUjiByIdParameter(id_parameter as number);
        setDataUji(data.data[0]);
      } catch (error) {
        console.log(error);
        toast.error("failed to load data");
      } finally {
        setFetching(false);
      }
    };

    if (open && id_parameter) {
      fetchDataUjiById();
    }
  }, [open, id_parameter]);

  const rawDate = dataUji?.Tanggal_uji;
  let dateOnly = "";
  if (rawDate && rawDate.length > 0) {
    dateOnly = new Date(rawDate).toLocaleDateString("en-CA");
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataUjiData = {
      id_parameter: dataUji.id_parameter,
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
      id_user: dataUji.id_user,
      id_spesifikasi: dataUji.id_spesifikasi,
    };

    try {
      const { editResponse } = await editDataUjiByIdParameter(dataUjiData);

      if (editResponse.status == 200) {
        setLoading(false);
        onClose();
        onSuccess();
        toast.success("Successfully update Data Uji");
      } else {
        setLoading(false);
        toast.error("failed to edit Data Uji");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("failed to edit Data Uji");
    }
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[92vh] bg-green-900/70 backdrop-blur-sm">
        <div className="overflow-y-auto px-6 pb-6">
          <DrawerHeader className="p-0 pt-5 text-center">
            <DrawerTitle className="text-2xl">Form Edit Data Uji Pesawat Sinar-X Radiografi</DrawerTitle>
            <DrawerDescription>
              <small className="italic">Edit parameter uji pesawat sinar-x</small>
            </DrawerDescription>
          </DrawerHeader>

          {fetching ? (
            <SpinnerCss />
          ) : (
            <form onSubmit={handleEdit} className="mt-5 flex flex-col">
              <div className="flex justify-between gap-3">
                <div className="flex w-[33%] flex-col">
                  <label htmlFor="drawer-Iluminasi" className="mb-1 text-lime-300">
                    Iluminasi
                  </label>
                  <input
                    type="number"
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Iluminasi"
                    name="Iluminasi"
                    value={dataUji.Iluminasi || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Iluminasi: e.target.value })}
                    placeholder="100"
                  />

                  <label htmlFor="drawer-Kolimasi_deltaX" className="mb-1 text-lime-300">
                    Kolimasi ΔX
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Kolimasi_deltaX"
                    name="Kolimasi_deltaX"
                    value={dataUji.Kolimasi_deltaX || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Kolimasi_deltaX: e.target.value })}
                    placeholder="2.0"
                  />

                  <label htmlFor="drawer-Kolimasi_deltaY" className="mb-1 text-lime-300">
                    Kolimasi ΔY
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Kolimasi_deltaY"
                    name="Kolimasi_deltaY"
                    value={dataUji.Kolimasi_deltaY || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Kolimasi_deltaY: e.target.value })}
                    placeholder="2.0"
                  />

                  <label htmlFor="drawer-Ketegaklurusan" className="mb-1 text-lime-300">
                    Ketegaklurusan
                  </label>
                  <input
                    type="text"
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Ketegaklurusan"
                    name="Ketegaklurusan"
                    value={dataUji.Ketegaklurusan || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Ketegaklurusan: e.target.value })}
                    placeholder="< 1.5"
                  />

                  <label htmlFor="drawer-Akurasi_kV" className="mb-1 text-lime-300">
                    Akurasi kV
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Akurasi_kV"
                    name="Akurasi_kV"
                    value={dataUji.Akurasi_kV || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Akurasi_kV: e.target.value })}
                    placeholder="10.0"
                  />

                  <label htmlFor="drawer-Akurasi_waktu" className="mb-1 text-lime-300">
                    Akurasi waktu
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Akurasi_waktu"
                    name="Akurasi_waktu"
                    value={dataUji.Akurasi_waktu || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Akurasi_waktu: e.target.value })}
                    placeholder="10.0"
                  />

                  <label htmlFor="drawer-Linearitas" className="mb-1 text-lime-300">
                    Linearitas
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Linearitas"
                    name="Linearitas"
                    value={dataUji.Linearitas || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Linearitas: e.target.value })}
                    placeholder="0.01"
                  />
                </div>

                <div className="flex w-[33%] flex-col">
                  <label htmlFor="drawer-Reproduksibilitas" className="mb-1 text-lime-300">
                    Reproduksibilitas Kerma
                  </label>
                  <input
                    type="number"
                    step={0.001}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Reproduksibilitas"
                    name="Reproduksibilitas"
                    value={dataUji.Reproduksibilitas || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas: e.target.value })}
                    placeholder="0.000"
                  />

                  <label htmlFor="drawer-Reproduksibilitas_kV" className="mb-1 text-lime-300">
                    Reproduksibilitas kV
                  </label>
                  <input
                    type="number"
                    step={0.001}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Reproduksibilitas_kV"
                    name="Reproduksibilitas_kV"
                    value={dataUji.Reproduksibilitas_kV || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_kV: e.target.value })}
                    placeholder="0.000"
                  />

                  <label htmlFor="drawer-Reproduksibilitas_waktu" className="mb-1 text-lime-300">
                    Reproduksibilitas waktu
                  </label>
                  <input
                    type="number"
                    step={0.001}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Reproduksibilitas_waktu"
                    name="Reproduksibilitas_waktu"
                    value={dataUji.Reproduksibilitas_waktu || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_waktu: e.target.value })}
                    placeholder="0.000"
                  />

                  <label htmlFor="drawer-HVL" className="mb-1 text-lime-300">
                    HVL pada 70kV
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-HVL"
                    name="HVL"
                    value={dataUji.HVL || ""}
                    onChange={(e) => setDataUji({ ...dataUji, HVL: e.target.value })}
                    placeholder="2.1"
                  />

                  <label htmlFor="drawer-HVL_80" className="mb-1 text-lime-300">
                    HVL pada 80kV
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-HVL_80"
                    name="HVL_80"
                    value={dataUji.HVL_80 || ""}
                    onChange={(e) => setDataUji({ ...dataUji, HVL_80: e.target.value })}
                    placeholder="2.3"
                  />

                  <label htmlFor="drawer-Kebocoran" className="mb-1 text-lime-300">
                    Kebocoran
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Kebocoran"
                    name="Kebocoran"
                    value={dataUji.Kebocoran || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Kebocoran: e.target.value })}
                    placeholder="0.01"
                  />

                  <label htmlFor="drawer-Tanggal_uji" className="mb-1 text-lime-300">
                    Tanggal Uji
                  </label>
                  <input
                    type="date"
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Tanggal_uji"
                    name="Tanggal_uji"
                    value={dateOnly}
                    onChange={(e) => setDataUji({ ...dataUji, Tanggal_uji: e.target.value })}
                  />
                </div>

                <div className="flex w-[33%] flex-col">
                  <label htmlFor="drawer-Timer_darurat_mAs" className="mb-1 text-lime-300">
                    AEC - Timer Darurat (mAs)
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Timer_darurat_mAs"
                    name="Timer_darurat_mAs"
                    value={dataUji.Timer_darurat_mAs || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Timer_darurat_mAs: e.target.value })}
                    placeholder="600"
                  />

                  <label htmlFor="drawer-Timer_darurat_s" className="mb-1 text-lime-300">
                    AEC - Timer Darurat (s)
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Timer_darurat_s"
                    name="Timer_darurat_s"
                    value={dataUji.Timer_darurat_s || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Timer_darurat_s: e.target.value })}
                    placeholder="6"
                  />

                  <label htmlFor="drawer-Uniformitas_mAs" className="mb-1 text-lime-300">
                    AEC - Densitas Standar & Uniformitas (Error mAs)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Uniformitas_mAs"
                    name="Uniformitas_mAs"
                    value={dataUji.Uniformitas_mAs || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Uniformitas_mAs: e.target.value })}
                    placeholder="20"
                  />

                  <label htmlFor="drawer-Uniformitas_EI" className="mb-1 text-lime-300">
                    AEC - Densitas Standar & Uniformitas (Error EI)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Uniformitas_EI"
                    name="Uniformitas_EI"
                    value={dataUji.Uniformitas_EI || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Uniformitas_EI: e.target.value })}
                    placeholder="10"
                  />

                  <label htmlFor="drawer-Penjejakan_ketebalan" className="mb-1 text-lime-300">
                    AEC - Penjejakan Ketebalan
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Penjejakan_ketebalan"
                    name="Penjejakan_ketebalan"
                    value={dataUji.Penjejakan_ketebalan || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Penjejakan_ketebalan: e.target.value })}
                    placeholder="10"
                  />

                  <label htmlFor="drawer-Penjejakan_kV" className="mb-1 text-lime-300">
                    AEC - Penjejakan kV
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Penjejakan_kV"
                    name="Penjejakan_kV"
                    value={dataUji.Penjejakan_kV || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Penjejakan_kV: e.target.value })}
                    placeholder="15"
                  />

                  <label htmlFor="drawer-Penjejakan_kombinasi" className="mb-1 text-lime-300">
                    AEC - Penjejakan kombinasi
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Penjejakan_kombinasi"
                    name="Penjejakan_kombinasi"
                    value={dataUji.Penjejakan_kombinasi || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Penjejakan_kombinasi: e.target.value })}
                    placeholder="20"
                  />

                  <label htmlFor="drawer-Waktu_respon_min" className="mb-1 text-lime-300">
                    AEC - Waktu Respon Minimum
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                    id="drawer-Waktu_respon_min"
                    name="Waktu_respon_min"
                    value={dataUji.Waktu_respon_min || ""}
                    onChange={(e) => setDataUji({ ...dataUji, Waktu_respon_min: e.target.value })}
                    placeholder="3"
                  />

                  <input type="hidden" name="id_parameter" value={dataUji.id_parameter || ""} />
                  <input type="hidden" name="id_user" value={dataUji.id_user || ""} />
                  <input type="hidden" name="id_spesifikasi" value={dataUji.id_spesifikasi || ""} />
                </div>
              </div>

              <DrawerFooter className="p-0 mt-2 flex flex-row justify-center gap-2">
                <button type="submit" disabled={loading} className="px-2 py-2 bg-gradient-to-r from-lime-500 to-green-500 hover:from-fuchsia-600 hover:to-pink-300 rounded text-white disabled:opacity-50">
                  {loading ? "Updating Data... Please wait..." : "Update Data"}
                </button>
                <button type="button" onClick={onClose} disabled={loading} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50">
                  Cancel
                </button>
              </DrawerFooter>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
