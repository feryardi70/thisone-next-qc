"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import { editDataUjiFloByIdParameter, getDataUjiFloByIdParameter } from "@/app/DAL/repository/parameter-uji-flo-repository";
import { toast } from "sonner";

interface FloProps {
  payloadQueryParams: {
    parameterId: number;
    email: string;
  };
}

export default function EditDataUjiFloForm({ payloadQueryParams }: FloProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState({
    Kolimasi_deltaX: "",
    Kolimasi_deltaY: "",
    Titik_pusat: "",
    Akurasi_kV: "",
    Waktu_Fluoroskopik: "",
    HVL: "",
    HVL_80: "",
    Esd: "",
    Dmax: "",
    Dmax_high: "",
    Input_II_a: "",
    Input_II_b: "",
    Input_II_c: "",
    Low_contrast: "",
    High_contrast_d1: "",
    High_contrast_d2: "",
    High_contrast_d3: "",
    High_contrast_d4: "",
    High_contrast_d5: "",
    High_contrast_d6: "",
    Tanggal_uji: "",
    id_parameter: "",
    id_user: "",
    id_spesifikasi: "",
  });

  useEffect(() => {
    const fetchDataUjiById = async () => {
      try {
        const data = await getDataUjiFloByIdParameter(payloadQueryParams.parameterId);
        setDataUji(data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUjiById();
  }, [payloadQueryParams.parameterId]);

  const renderDataUji = () => {
    const raw = dataUji?.Tanggal_uji;
    let dateOnly;

    if (raw.length == 0) {
      dateOnly = "";
    } else {
      dateOnly = new Date(raw).toLocaleDateString("en-CA");
    }

    return (
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-[33%]">
          <label htmlFor="Kolimasi_deltaX" className="mb-1 text-slate-500">
            Kesesuaian Berkas Sinar-x dengan Reseptor
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
            placeholder="1.5"
            aria-describedby="Kolimasi_deltaX"
          />

          <label htmlFor="Titik_pusat" className="mb-1 text-slate-500">
            Kesesuaian Titik Pusat Reseptor dengan Monitor
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Titik_pusat"
            name="Titik_pusat"
            value={dataUji.Titik_pusat || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Titik_pusat: e.target.value,
              })
            }
            placeholder="1.0"
            aria-describedby="Titik_pusat"
          />

          <label htmlFor="Kolimasi_deltaY" className="mb-1 text-slate-500">
            Kesesuaian Berkas Sinar-x dengan Monitor
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
            placeholder="1.5"
            aria-describedby="Kolimasi_deltaY"
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
            onChange={(e) => setDataUji({ ...dataUji, Akurasi_kV: e.target.value })}
            placeholder="10.0"
            aria-describedby="Akurasi_kV"
          />

          <label htmlFor="Waktu_Fluoroskopik" className="mb-1 text-slate-500">
            Waktu Fluoroskopik Maksimum
          </label>
          <input
            type="number"
            step={0.1}
            maxLength={2}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Waktu_Fluoroskopik"
            name="Waktu_Fluoroskopik"
            value={dataUji.Waktu_Fluoroskopik || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Waktu_Fluoroskopik: e.target.value,
              })
            }
            placeholder="5"
            aria-describedby="Waktu_Fluoroskopik"
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
            onChange={(e) => setDataUji({ ...dataUji, HVL: e.target.value })}
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
            onChange={(e) => setDataUji({ ...dataUji, HVL_80: e.target.value })}
            placeholder="2.3"
            aria-describedby="HVL_80"
          />

          <label htmlFor="Tanggal_uji" className="mb-1 text-slate-500">
            Tanggal Uji
          </label>
          <input
            type="date"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Tanggal_uji"
            name="Tanggal_uji"
            value={dateOnly}
            onChange={(e) => setDataUji({ ...dataUji, Tanggal_uji: e.target.value })}
            aria-describedby="Tanggal_uji"
          />
        </div>

        <div className="flex flex-col w-[33%]">
          <label htmlFor="Esd" className="mb-1 text-slate-500">
            Laju Dosis Tipikal (ESD)
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Esd"
            name="Esd"
            value={dataUji.Esd || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Esd: e.target.value,
              })
            }
            placeholder="17"
            aria-describedby="Esd"
          />

          <label htmlFor="Dmax" className="mb-1 text-slate-500">
            Laju Dosis Maksimum di Udara mode Normal
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Dmax"
            name="Dmax"
            value={dataUji.Dmax || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Dmax: e.target.value,
              })
            }
            placeholder="50"
            aria-describedby="Dmax"
          />

          <label htmlFor="Dmax_high" className="mb-1 text-slate-500">
            Laju Dosis Maksimum di Udara mode High
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Dmax_high"
            name="Dmax_high"
            value={dataUji.Dmax_high || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Dmax_high: e.target.value,
              })
            }
            placeholder="100"
            aria-describedby="Dmax_high"
          />

          <label htmlFor="Input_II_a" className="mb-1 text-slate-500">
            Laju Dosis di Permukaan Reseptor Laju Dosis di Permukaan Reseptor &#40;11 cm &le; diameter image receptor &lt; 14 cm&#41;
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Input_II_a"
            name="Input_II_a"
            value={dataUji.Input_II_a || ""}
            onChange={(e) => setDataUji({ ...dataUji, Input_II_a: e.target.value })}
            placeholder="120"
            aria-describedby="Input_II_a"
          />

          <label htmlFor="Input_II_b" className="mb-1 text-slate-500">
            Laju Dosis di Permukaan Reseptor Laju Dosis di Permukaan Reseptor &#40;14 cm &le; diameter image receptor &lt; 23 cm&#41;
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Input_II_b"
            name="Input_II_b"
            value={dataUji.Input_II_b || ""}
            onChange={(e) => setDataUji({ ...dataUji, Input_II_b: e.target.value })}
            placeholder="90"
            aria-describedby="Input_II_b"
          />

          <label htmlFor="Input_II_c" className="mb-1 text-slate-500">
            Laju Dosis di Permukaan Reseptor Laju Dosis di Permukaan Reseptor &#40;image receptor &ge; 23 cm&#41;
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Input_II_c"
            name="Input_II_c"
            value={dataUji.Input_II_c || ""}
            onChange={(e) => setDataUji({ ...dataUji, Input_II_c: e.target.value })}
            placeholder="60"
            aria-describedby="Input_II_c"
          />
        </div>

        <div className="flex flex-col w-[33%]">
          <label htmlFor="Low_contrast" className="mb-1 text-slate-500">
            Ambang kontras rendah (Low Contrast 10mm)
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Low_contrast"
            name="Low_contrast"
            value={dataUji.Low_contrast || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Low_contrast: e.target.value,
              })
            }
            placeholder="5"
            aria-describedby="Low_contrast"
          />

          <label htmlFor="High_contrast_d1" className="mb-1 text-slate-500">
            Ambang kontras tinggi/Resolusi Spasial FoV 36-40 cm
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="High_contrast_d1"
            name="High_contrast_d1"
            value={dataUji.High_contrast_d1 || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                High_contrast_d1: e.target.value,
              })
            }
            placeholder="0.7"
            aria-describedby="High_contrast_d1"
          />

          <label htmlFor="High_contrast_d2" className="mb-1 text-slate-500">
            Ambang kontras tinggi/Resolusi Spasial FoV 30-35 cm
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="High_contrast_d2"
            name="High_contrast_d2"
            value={dataUji.High_contrast_d2 || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                High_contrast_d2: e.target.value,
              })
            }
            placeholder="0.8"
            aria-describedby="High_contrast_d2"
          />

          <label htmlFor="High_contrast_d3" className="mb-1 text-slate-500">
            Ambang kontras tinggi/Resolusi Spasial FoV 25-29 cm
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="High_contrast_d3"
            name="High_contrast_d3"
            value={dataUji.High_contrast_d3 || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                High_contrast_d3: e.target.value,
              })
            }
            placeholder="0.9"
            aria-describedby="High_contrast_d3"
          />

          <label htmlFor="High_contrast_d4" className="mb-1 text-slate-500">
            Ambang kontras tinggi/Resolusi Spasial FoV 20-24 cm
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="High_contrast_d4"
            name="High_contrast_d4"
            value={dataUji.High_contrast_d4 || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                High_contrast_d4: e.target.value,
              })
            }
            placeholder="1.0"
            aria-describedby="High_contrast_d4"
          />

          <label htmlFor="High_contrast_d5" className="mb-1 text-slate-500">
            Ambang kontras tinggi/Resolusi Spasial FoV 15-18 cm
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="High_contrast_d5"
            name="High_contrast_d5"
            value={dataUji.High_contrast_d5 || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                High_contrast_d5: e.target.value,
              })
            }
            placeholder="1.25"
            aria-describedby="High_contrast_d5"
          />

          <label htmlFor="High_contrast_d6" className="mb-1 text-slate-500">
            Ambang kontras tinggi/Resolusi Spasial FoV &le; 14 cm
          </label>
          <input
            type="number"
            step={0.1}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="High_contrast_d6"
            name="High_contrast_d6"
            value={dataUji.High_contrast_d6 || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                High_contrast_d6: e.target.value,
              })
            }
            placeholder="1.6"
            aria-describedby="High_contrast_d6"
          />

          <input type="hidden" name="id_parameter" value={dataUji.id_parameter || ""} />
          <input type="hidden" name="id_user" value={dataUji.id_user || ""} />
          <input type="hidden" name="id_spesifikasi" value={dataUji.id_spesifikasi || ""} />
        </div>
      </div>
    );
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic
    const dataUjiData = {
      Kolimasi_deltaX: dataUji.Kolimasi_deltaX,
      Kolimasi_deltaY: dataUji.Kolimasi_deltaY,
      Titik_pusat: dataUji.Titik_pusat,
      Akurasi_kV: dataUji.Akurasi_kV,
      Waktu_Fluoroskopik: dataUji.Waktu_Fluoroskopik,
      HVL: dataUji.HVL,
      HVL_80: dataUji.HVL_80,
      Esd: dataUji.Esd,
      Dmax: dataUji.Dmax,
      Dmax_high: dataUji.Dmax_high,
      Input_II_a: dataUji.Input_II_a,
      Input_II_b: dataUji.Input_II_b,
      Input_II_c: dataUji.Input_II_c,
      Low_contrast: dataUji.Low_contrast,
      High_contrast_d1: dataUji.High_contrast_d1,
      High_contrast_d2: dataUji.High_contrast_d2,
      High_contrast_d3: dataUji.High_contrast_d3,
      High_contrast_d4: dataUji.High_contrast_d4,
      High_contrast_d5: dataUji.High_contrast_d5,
      High_contrast_d6: dataUji.High_contrast_d6,
      Tanggal_uji: dataUji.Tanggal_uji,
      id_parameter: dataUji.id_parameter,
      id_user: dataUji.id_user,
      id_spesifikasi: dataUji.id_spesifikasi,
    };

    const { editResponse, editResult } = await editDataUjiFloByIdParameter(dataUjiData);

    if (editResponse.status == 200) {
      setLoading(false);
      alert("successfully Update Data Uji!");
      router.push(`/fluoroskopi/parameter-uji?id_spesifikasi=${editResult.data.id_spesifikasi}&id_user=${editResult.data.id_user}`);
    } else {
      console.error("Failed to edit data");
      setLoading(false);
      toast.error("failed to edit Data Uji");
    }
  };

  return (
    <div>
      <div className="flex min-h-screen overflow-hidden bg-gradient-to-b from-green-800 to-green-400 text-black">
        <SideBar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header email={payloadQueryParams.email} />

          <main className="mt-3 flex justify-center items-center">
            <div className="px-5 py-5 shadow-md max-w-3xl min-h-screen w-full border-t-4 bg-green-100 border-fuchsia-500">
              <h2 className="mb-5 text-center text-3xl">Form Edit Data Uji</h2>

              <form onSubmit={(e) => handleEdit(e)} className="flex flex-col">
                {renderDataUji()}

                <button type="submit" className="px-2 py-2 bg-gradient-to-r from-lime-500 to-green-500 hover:from-fuchsia-600 hover:to-pink-300 rounded text-white">
                  {loading ? "Updating Data... Please wait..." : "Update Data"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
