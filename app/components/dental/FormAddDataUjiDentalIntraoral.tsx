"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../Sidebar";
import Header from "../Header";
import { toast } from "sonner";
import { addDataDentalIntraoral } from "@/app/DAL/repository/parameter-uji-dental-repository";

interface DentalProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
    email: string;
  };
}

export default function AddNewDataUjiDentalIntraoralForm({ payloadQueryParams }: DentalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState({
    jenis_pesawat: "Dental",
    Merk: "",
    Model: "",
    No_Seri: "",
    id_user: payloadQueryParams.userId,
    id_spesifikasi: payloadQueryParams.spesifikasiId,
    Kolimasi_deltaX: "",
    Akurasi_kV: "",
    Akurasi_waktu: "",
    Linearitas: "",
    Reproduksibilitas: "",
    Reproduksibilitas_kV: "",
    Reproduksibilitas_waktu: "",
    HVL: "",
    HVL_80: "",
    Tanggal_uji: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataUjiData = {
      jenis_pesawat: dataUji.jenis_pesawat,
      id_user: payloadQueryParams.userId,
      id_spesifikasi: payloadQueryParams.spesifikasiId,
      Kolimasi_deltaX: dataUji.Kolimasi_deltaX,
      Akurasi_kV: dataUji.Akurasi_kV,
      Akurasi_waktu: dataUji.Akurasi_waktu,
      Linearitas: dataUji.Linearitas,
      Reproduksibilitas: dataUji.Reproduksibilitas,
      Reproduksibilitas_kV: dataUji.Reproduksibilitas_kV,
      Reproduksibilitas_waktu: dataUji.Reproduksibilitas_waktu,
      HVL: dataUji.HVL,
      HVL_80: dataUji.HVL_80,
      Tanggal_uji: dataUji.Tanggal_uji,
    };

    try {
      const { saveResponse, response } = await addDataDentalIntraoral(dataUjiData);

      if (saveResponse.status !== 200) {
        setLoading(false);
        toast("Failed to add data");
        return;
      }

      setLoading(false);
      alert("successfully Adding New Dental Intraoral Data");
      router.push(`/dental/parameter-uji?id_spesifikasi=${response.data.id_spesifikasi}&id_user=${response.data.id_user}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast("Failed to add data", {
        className: "bg-red-400 text-black",
      });
    }
  };

  return (
    <div>
      <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-blue-100">
        <SideBar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header email={payloadQueryParams.email} />

          <main className="mt-3 flex justify-center items-center">
            <div className="px-5 py-5 shadow-md max-w-3xl min-h-screen w-full border-t-4 border-cyan-500 text-black">
              <h2 className="mb-5 text-center text-3xl">Form Add Data Uji Dental Intraoral</h2>

              <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="Kolimasi_deltaX" className="mb-1 text-slate-500">
                      Kolimasi ΔX
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Kolimasi_deltaX"
                      name="Kolimasi_deltaX"
                      value={dataUji.Kolimasi_deltaX}
                      onChange={(e) => setDataUji({ ...dataUji, Kolimasi_deltaX: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Akurasi_kV" className="mb-1 text-slate-500">
                      Akurasi kV
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Akurasi_kV"
                      name="Akurasi_kV"
                      value={dataUji.Akurasi_kV}
                      onChange={(e) => setDataUji({ ...dataUji, Akurasi_kV: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Akurasi_waktu" className="mb-1 text-slate-500">
                      Akurasi waktu
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Akurasi_waktu"
                      name="Akurasi_waktu"
                      value={dataUji.Akurasi_waktu}
                      onChange={(e) => setDataUji({ ...dataUji, Akurasi_waktu: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Linearitas" className="mb-1 text-slate-500">
                      Linearitas
                    </label>
                    <input
                      type="number"
                      step={0.0001}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Linearitas"
                      name="Linearitas"
                      value={dataUji.Linearitas}
                      onChange={(e) => setDataUji({ ...dataUji, Linearitas: e.target.value })}
                      placeholder="0.0000"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Reproduksibilitas" className="mb-1 text-slate-500">
                      Reproduksibilitas
                    </label>
                    <input
                      type="number"
                      step={0.001}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Reproduksibilitas"
                      name="Reproduksibilitas"
                      value={dataUji.Reproduksibilitas}
                      onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas: e.target.value })}
                      placeholder="0.000"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Reproduksibilitas_kV" className="mb-1 text-slate-500">
                      Reproduksibilitas kV
                    </label>
                    <input
                      type="number"
                      step={0.001}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Reproduksibilitas_kV"
                      name="Reproduksibilitas_kV"
                      value={dataUji.Reproduksibilitas_kV}
                      onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_kV: e.target.value })}
                      placeholder="0.000"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Reproduksibilitas_waktu" className="mb-1 text-slate-500">
                      Reproduksibilitas waktu
                    </label>
                    <input
                      type="number"
                      step={0.001}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Reproduksibilitas_waktu"
                      name="Reproduksibilitas_waktu"
                      value={dataUji.Reproduksibilitas_waktu}
                      onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_waktu: e.target.value })}
                      placeholder="0.000"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="HVL" className="mb-1 text-slate-500">
                      HVL
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="HVL"
                      name="HVL"
                      value={dataUji.HVL}
                      onChange={(e) => setDataUji({ ...dataUji, HVL: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="HVL_80" className="mb-1 text-slate-500">
                      HVL 80
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="HVL_80"
                      name="HVL_80"
                      value={dataUji.HVL_80}
                      onChange={(e) => setDataUji({ ...dataUji, HVL_80: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Tanggal_uji" className="mb-1 text-slate-500">
                      Tanggal Uji
                    </label>
                    <input
                      type="date"
                      className="px-2 py-2 border-2 border-cyan-200 focus:border-cyan-700 rounded-md outline-none"
                      id="Tanggal_uji"
                      name="Tanggal_uji"
                      value={dataUji.Tanggal_uji}
                      onChange={(e) => setDataUji({ ...dataUji, Tanggal_uji: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded text-white">
                  {loading ? "Adding New Data... Please wait..." : "Add Dental Intraoral Data"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
