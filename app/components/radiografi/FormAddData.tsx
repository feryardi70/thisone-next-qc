"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../Sidebar";
import Header from "../Header";
import { toast } from "sonner";
import { addDataUji } from "@/app/DAL/repository/parameter-uji-repository";

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
    email: string;
  };
}

export default function AddNewDataUjiForm({ payloadQueryParams }: RadProps) {
  const router = useRouter();
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
    // Handle form submission logic
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
      id_user: payloadQueryParams.userId,
      id_spesifikasi: payloadQueryParams.spesifikasiId,
    };

    try {
      const { saveResponse, response} = await addDataUji(dataUjiData);
      
      if (saveResponse.status !== 200) {
        setLoading(false);  
        // alert("successfully Adding New Data Uji!");
        toast("Failed to add data");
        return;
      }
  
      setLoading(false);
      alert("successfully Adding New Data Uji!");
      // toast("successfully Adding New Data Uji!", {
      //   action: {
      //         label: "OK",
      //         onClick: () => router.push(`/radiografi/parameter-uji?id_spesifikasi=${response.data.id_spesifikasi}&id_user=${response.data.id_user}`),
      //       },
      // });
      router.push(`/radiografi/parameter-uji?id_spesifikasi=${response.data.id_spesifikasi}&id_user=${response.data.id_user}`);
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
      <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        <SideBar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header email={payloadQueryParams.email} />

          <main className="mt-3 flex justify-center items-center">
            <div className="px-5 py-5 shadow-md max-w-3xl min-h-screen w-full border-t-4 border-green-500">
              <h2 className="mb-5 text-center text-3xl">Form Add Data Uji</h2>

              <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
                <div className="flex justify-between gap-5">
                  <div className="flex flex-col w-[33%]">
                    <label htmlFor="Iluminasi" className="mb-1 text-slate-500">
                      Iluminasi
                    </label>
                    <input
                      type="number"
                      className="px-2 py-2 mb-5 border-2 border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Iluminasi"
                      name="Iluminasi"
                      value={dataUji.Iluminasi || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, Iluminasi: e.target.value })
                      }
                      placeholder="100"
                      aria-describedby="Iluminasi"
                    />

                    <label
                      htmlFor="Kolimasi_deltaX"
                      className="mb-1 text-slate-500"
                    >
                      Kolimasi ΔX
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Kolimasi_deltaX"
                      name="Kolimasi_deltaX"
                      value={dataUji.Kolimasi_deltaX || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Kolimasi_deltaX: e.target.value,
                        })
                      }
                      placeholder="2.0"
                      aria-describedby="Kolimasi_deltaX"
                    />

                    <label
                      htmlFor="Kolimasi_deltaY"
                      className="mb-1 text-slate-500"
                    >
                      Kolimasi ΔY
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Kolimasi_deltaY"
                      name="Kolimasi_deltaY"
                      value={dataUji.Kolimasi_deltaY || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Kolimasi_deltaY: e.target.value,
                        })
                      }
                      placeholder="2.0"
                      aria-describedby="Kolimasi_deltaY"
                    />

                    <label
                      htmlFor="Ketegaklurusan"
                      className="mb-1 text-slate-500"
                    >
                      Ketegaklurusan
                    </label>
                    <input
                      type="text"
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Ketegaklurusan"
                      name="Ketegaklurusan"
                      value={dataUji.Ketegaklurusan || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Ketegaklurusan: e.target.value,
                        })
                      }
                      placeholder="< 1.5"
                      aria-describedby="Ketegaklurusan"
                    />

                    <label htmlFor="Akurasi_kV" className="mb-1 text-slate-500">
                      Akurasi kV
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Akurasi_kV"
                      name="Akurasi_kV"
                      value={dataUji.Akurasi_kV || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, Akurasi_kV: e.target.value })
                      }
                      placeholder="10.0"
                      aria-describedby="Akurasi_kV"
                    />

                    <label
                      htmlFor="Akurasi_waktu"
                      className="mb-1 text-slate-500"
                    >
                      Akurasi waktu
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Akurasi_waktu"
                      name="Akurasi_waktu"
                      value={dataUji.Akurasi_waktu || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Akurasi_waktu: e.target.value,
                        })
                      }
                      placeholder="10.0"
                      aria-describedby="Akurasi_waktu"
                    />

                    <label htmlFor="Linearitas" className="mb-1 text-slate-500">
                      Linearitas
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Linearitas"
                      name="Linearitas"
                      value={dataUji.Linearitas || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, Linearitas: e.target.value })
                      }
                      placeholder="0.01"
                      aria-describedby="Linearitas"
                    />
                  </div>

                  <div className="flex flex-col w-[33%]">
                    <label
                      htmlFor="Reproduksibilitas"
                      className="mb-1 text-slate-500"
                    >
                      Reproduksibilitas Kerma
                    </label>
                    <input
                      type="number"
                      step={0.001}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Reproduksibilitas"
                      name="Reproduksibilitas"
                      value={dataUji.Reproduksibilitas || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Reproduksibilitas: e.target.value,
                        })
                      }
                      placeholder="0.000"
                      aria-describedby="Reproduksibilitas"
                    />

                    <label
                      htmlFor="Reproduksibilitas_kV"
                      className="mb-1 text-slate-500"
                    >
                      Reproduksibilitas kV
                    </label>
                    <input
                      type="number"
                      step={0.001}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Reproduksibilitas_kV"
                      name="Reproduksibilitas_kV"
                      value={dataUji.Reproduksibilitas_kV || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Reproduksibilitas_kV: e.target.value,
                        })
                      }
                      placeholder="0.000"
                      aria-describedby="Reproduksibilitas_kV"
                    />

                    <label
                      htmlFor="Reproduksibilitas_waktu"
                      className="mb-1 text-slate-500"
                    >
                      Reproduksibilitas waktu
                    </label>
                    <input
                      type="number"
                      step={0.001}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Reproduksibilitas_waktu"
                      name="Reproduksibilitas_waktu"
                      value={dataUji.Reproduksibilitas_waktu || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Reproduksibilitas_waktu: e.target.value,
                        })
                      }
                      placeholder="0.000"
                      aria-describedby="Reproduksibilitas_waktu"
                    />

                    <label htmlFor="HVL" className="mb-1 text-slate-500">
                      HVL pada 70kV
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="HVL"
                      name="HVL"
                      value={dataUji.HVL || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, HVL: e.target.value })
                      }
                      placeholder="2.1"
                      aria-describedby="HVL"
                    />

                    <label htmlFor="HVL_80" className="mb-1 text-slate-500">
                      HVL pada 80kV
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="HVL_80"
                      name="HVL_80"
                      value={dataUji.HVL_80 || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, HVL_80: e.target.value })
                      }
                      placeholder="2.3"
                      aria-describedby="HVL_80"
                    />

                    <label htmlFor="Kebocoran" className="mb-1 text-slate-500">
                      Kebocoran
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Kebocoran"
                      name="Kebocoran"
                      value={dataUji.Kebocoran || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, Kebocoran: e.target.value })
                      }
                      placeholder="0.01"
                      aria-describedby="Kebocoran"
                    />

                    <label
                      htmlFor="Tanggal_uji"
                      className="mb-1 text-slate-500"
                    >
                      Tanggal Uji
                    </label>
                    <input
                      type="date"
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Tanggal_uji"
                      name="Tanggal_uji"
                      value={dataUji.Tanggal_uji || ""}
                      onChange={(e) =>
                        setDataUji({ ...dataUji, Tanggal_uji: e.target.value })
                      }
                      aria-describedby="Tanggal_uji"
                    />
                  </div>

                  <div className="flex flex-col w-[33%]">
                    <label
                      htmlFor="Timer_darurat_mAs"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Timer Darurat (mAs)
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Timer_darurat_mAs"
                      name="Timer_darurat_mAs"
                      value={dataUji.Timer_darurat_mAs || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Timer_darurat_mAs: e.target.value,
                        })
                      }
                      placeholder="600"
                      aria-describedby="Timer_darurat_mAs"
                    />

                    <label
                      htmlFor="Timer_darurat_s"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Timer Darurat (s)
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Timer_darurat_s"
                      name="Timer_darurat_s"
                      value={dataUji.Timer_darurat_s || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Timer_darurat_s: e.target.value,
                        })
                      }
                      placeholder="6"
                      aria-describedby="Timer_darurat_s"
                    />

                    <label
                      htmlFor="Uniformitas_mAs"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Densitas Standar & Uniformitas (Error mAs)
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Uniformitas_mAs"
                      name="Uniformitas_mAs"
                      value={dataUji.Uniformitas_mAs || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Uniformitas_mAs: e.target.value,
                        })
                      }
                      placeholder="20"
                      aria-describedby="Uniformitas_mAs"
                    />

                    <label
                      htmlFor="Uniformitas_EI"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Densitas Standar & Uniformitas (Error EI)
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Uniformitas_EI"
                      name="Uniformitas_EI"
                      value={dataUji.Uniformitas_EI || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Uniformitas_EI: e.target.value,
                        })
                      }
                      placeholder="10"
                      aria-describedby="Uniformitas_EI"
                    />

                    <label
                      htmlFor="Penjejakan_ketebalan"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Penjejakan Ketebalan
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Penjejakan_ketebalan"
                      name="Penjejakan_ketebalan"
                      value={dataUji.Penjejakan_ketebalan || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Penjejakan_ketebalan: e.target.value,
                        })
                      }
                      placeholder="10"
                      aria-describedby="Penjejakan_ketebalan"
                    />

                    <label
                      htmlFor="Penjejakan_kV"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Penjejakan kV
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Penjejakan_kV"
                      name="Penjejakan_kV"
                      value={dataUji.Penjejakan_kV || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Penjejakan_kV: e.target.value,
                        })
                      }
                      placeholder="15"
                      aria-describedby="Penjejakan_kV"
                    />

                    <label
                      htmlFor="Penjejakan_kombinasi"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Penjejakan kombinasi
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Penjejakan_kombinasi"
                      name="Penjejakan_kombinasi"
                      value={dataUji.Penjejakan_kombinasi || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Penjejakan_kombinasi: e.target.value,
                        })
                      }
                      placeholder="20"
                      aria-describedby="Penjejakan_kombinasi"
                    />

                    <label
                      htmlFor="Waktu_respon_min"
                      className="mb-1 text-slate-500"
                    >
                      AEC - Waktu Respon Minimum
                    </label>
                    <input
                      type="number"
                      step={0.01}
                      className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                      id="Waktu_respon_min"
                      name="Waktu_respon_min"
                      value={dataUji.Waktu_respon_min || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Waktu_respon_min: e.target.value,
                        })
                      }
                      placeholder="3"
                      aria-describedby="Waktu_respon_min"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-2 py-2 bg-gradient-to-r from-lime-500 to-green-500 hover:from-fuchsia-600 hover:to-pink-300 rounded text-white"
                >
                  {loading ? "Adding New Data... Please wait..." : "Add Data"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
