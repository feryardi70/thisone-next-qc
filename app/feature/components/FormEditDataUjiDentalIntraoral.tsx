"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import { toast } from "sonner";
import { getDataUjiByIdParameter } from "@/app/DAL/repository/parameter-uji-repository";
import { editDataUjiDentalIntraoralByIdParameter } from "@/app/DAL/repository/parameter-uji-dental-repository";

interface DentalProps {
  payloadQueryParams: {
    parameterId: number;
    email: string;
  };
}

interface ParameterUjiDental {
  id_parameter: string;
  Kolimasi_deltaX: string;
  Akurasi_kV: string;
  Akurasi_waktu: string;
  Linearitas: string;
  Reproduksibilitas: string;
  Reproduksibilitas_kV: string;
  Reproduksibilitas_waktu: string;
  HVL: string;
  Tanggal_uji: string;
  id_user: string;
  id_spesifikasi: string;
}

export default function EditDataUjiDentalIntraoralForm({ payloadQueryParams }: DentalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState<ParameterUjiDental>({
    id_parameter: "",
    Kolimasi_deltaX: "",
    Akurasi_kV: "",
    Akurasi_waktu: "",
    Linearitas: "",
    Reproduksibilitas: "",
    Reproduksibilitas_kV: "",
    Reproduksibilitas_waktu: "",
    HVL: "",
    Tanggal_uji: "",
    id_user: "",
    id_spesifikasi: "",
  });

  useEffect(() => {
    const fetchDataUjiById = async () => {
      try {
        const data = await getDataUjiByIdParameter(payloadQueryParams.parameterId);
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

    if (raw.length === 0) {
      dateOnly = "";
    } else {
      dateOnly = new Date(raw).toLocaleDateString("en-CA");
    }

    return (
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-[33%]">
          <label htmlFor="Kolimasi_deltaX" className="mb-1 text-slate-950">
            Kolimasi
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Kolimasi_deltaX"
            name="Kolimasi_deltaX"
            value={dataUji.Kolimasi_deltaX || ""}
            onChange={(e) => setDataUji({ ...dataUji, Kolimasi_deltaX: e.target.value })}
            placeholder="0.00"
            aria-describedby="Kolimasi_deltaX"
          />

          <label htmlFor="Akurasi_kV" className="mb-1 text-slate-950">
            Akurasi kV
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Akurasi_kV"
            name="Akurasi_kV"
            value={dataUji.Akurasi_kV || ""}
            onChange={(e) => setDataUji({ ...dataUji, Akurasi_kV: e.target.value })}
            placeholder="0.00"
            aria-describedby="Akurasi_kV"
          />

          <label htmlFor="Akurasi_waktu" className="mb-1 text-slate-950">
            Akurasi waktu
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Akurasi_waktu"
            name="Akurasi_waktu"
            value={dataUji.Akurasi_waktu || ""}
            onChange={(e) => setDataUji({ ...dataUji, Akurasi_waktu: e.target.value })}
            placeholder="0.00"
            aria-describedby="Akurasi_waktu"
          />
        </div>

        <div className="flex flex-col w-[33%]">
          <label htmlFor="Linearitas" className="mb-1 text-slate-950">
            Linearitas
          </label>
          <input
            type="number"
            step={0.0001}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Linearitas"
            name="Linearitas"
            value={dataUji.Linearitas || ""}
            onChange={(e) => setDataUji({ ...dataUji, Linearitas: e.target.value })}
            placeholder="0.0000"
            aria-describedby="Linearitas"
          />

          <label htmlFor="Reproduksibilitas" className="mb-1 text-slate-950">
            Reproduksibilitas
          </label>
          <input
            type="number"
            step={0.001}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Reproduksibilitas"
            name="Reproduksibilitas"
            value={dataUji.Reproduksibilitas || ""}
            onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas: e.target.value })}
            placeholder="0.000"
            aria-describedby="Reproduksibilitas"
          />

          <label htmlFor="Reproduksibilitas_kV" className="mb-1 text-slate-950">
            Reproduksibilitas kV
          </label>
          <input
            type="number"
            step={0.001}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Reproduksibilitas_kV"
            name="Reproduksibilitas_kV"
            value={dataUji.Reproduksibilitas_kV || ""}
            onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_kV: e.target.value })}
            placeholder="0.000"
            aria-describedby="Reproduksibilitas_kV"
          />
        </div>

        <div className="flex flex-col w-[33%]">
          <label htmlFor="Reproduksibilitas_waktu" className="mb-1 text-slate-950">
            Reproduksibilitas waktu
          </label>
          <input
            type="number"
            step={0.001}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Reproduksibilitas_waktu"
            name="Reproduksibilitas_waktu"
            value={dataUji.Reproduksibilitas_waktu || ""}
            onChange={(e) => setDataUji({ ...dataUji, Reproduksibilitas_waktu: e.target.value })}
            placeholder="0.000"
            aria-describedby="Reproduksibilitas_waktu"
          />

          <label htmlFor="HVL" className="mb-1 text-slate-950">
            HVL
          </label>
          <input
            type="number"
            step={0.01}
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="HVL"
            name="HVL"
            value={dataUji.HVL || ""}
            onChange={(e) => setDataUji({ ...dataUji, HVL: e.target.value })}
            placeholder="2.10"
            aria-describedby="HVL"
          />

          <label htmlFor="Tanggal_uji" className="mb-1 text-slate-950">
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

    const dataUjiData = {
      id_parameter: dataUji.id_parameter,
      Kolimasi_deltaX: dataUji.Kolimasi_deltaX,
      Akurasi_kV: dataUji.Akurasi_kV,
      Akurasi_waktu: dataUji.Akurasi_waktu,
      Linearitas: dataUji.Linearitas,
      Reproduksibilitas: dataUji.Reproduksibilitas,
      Reproduksibilitas_kV: dataUji.Reproduksibilitas_kV,
      Reproduksibilitas_waktu: dataUji.Reproduksibilitas_waktu,
      HVL: dataUji.HVL,
      Tanggal_uji: dataUji.Tanggal_uji,
      id_user: dataUji.id_user,
      id_spesifikasi: dataUji.id_spesifikasi,
    };

    const { editResponse, editResult } = await editDataUjiDentalIntraoralByIdParameter(dataUjiData);

    if (editResponse.status == 200) {
      setLoading(false);
      alert("successfully Update Data Uji Dental Intraoral!");
      router.push(`/dental/parameter-uji?id_spesifikasi=${editResult.data.id_spesifikasi}&id_user=${editResult.data.id_user}`);
    } else {
      console.error("Failed to edit dental data uji");
      setLoading(false);
      toast.error("failed to edit Data Uji Dental");
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
              <h2 className="mb-5 text-center text-3xl">Form Edit Data Uji Dental Intraoral</h2>

              <form onSubmit={(e) => handleEdit(e)} className="flex flex-col gap-5">
                {renderDataUji()}

                <button type="submit" className="px-2 py-2 bg-gradient-to-r from-lime-600 to-green-700 hover:from-fuchsia-600 hover:to-pink-300 rounded text-white">
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
