"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
//import { editDataUjiByIdParameter } from "@/app/DAL/repository/parameter-uji-repository";
import { toast } from "sonner";
import { editDataRadByIdSpec, getDataRadBySN } from "@/app/DAL/repository/spec-repository";

interface RadProps {
  payloadQueryParams: {
    No_Seri: string;
    email: string;
  };
}

export default function EditDataRadForm({ payloadQueryParams }: RadProps) {
  const router = useRouter();
  //const { dataUji, loading } = useFetchDataUjiByIdParameter(payloadQueryParams.parameterId)
  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState({
    Merk: "",
    Model: "",
    No_Seri: "",
    jenis_pesawat: "",
    id_user: "",
    id_spesifikasi: "",
  });

  useEffect(() => {
    const fetchDataUjiById = async () => {
      try {
        const data = await getDataRadBySN(payloadQueryParams.No_Seri);
        console.log(data.data);
        setDataUji(data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataUjiById();
  }, [payloadQueryParams.No_Seri]);

  const renderDataUji = () => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="Merk" className="mb-1 text-slate-500">
            Merk
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border-2 border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Merk"
            name="Merk"
            value={dataUji.Merk || ""}
            onChange={(e) =>
              setDataUji({ ...dataUji, Merk: e.target.value })
            }
            placeholder="Philips"
            aria-describedby="Merk"
          />

          <label htmlFor="Model" className="mb-1 text-slate-500">
            Model
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Model"
            name="Model"
            value={dataUji.Model || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                Model: e.target.value,
              })
            }
            placeholder="1234"
            aria-describedby="Model"
          />
        </div>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="No_Seri" className="mb-1 text-slate-500">
            No_Seri
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="No_Seri"
            name="No_Seri"
            value={dataUji.No_Seri || ""}
            onChange={(e) =>
              setDataUji({ ...dataUji, No_Seri: e.target.value })
            }
            placeholder="1234"
            aria-describedby="No_Seri"
          />

          <label htmlFor="jenis_pesawat" className="mb-1 text-slate-500">
            Jenis Pesawat
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="jenis_pesawat"
            name="jenis_pesawat"
            value={dataUji.jenis_pesawat || ""}
            onChange={(e) =>
              setDataUji({
                ...dataUji,
                jenis_pesawat: e.target.value,
              })
            }
            placeholder="Radiografi"
            aria-describedby="jenis_pesawat"
            disabled
          />

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
      Merk: dataUji.Merk,
      Model: dataUji.Model,
      No_Seri: dataUji.No_Seri,
      jenis_pesawat: dataUji.jenis_pesawat,
      id_user: dataUji.id_user,
      id_spesifikasi: dataUji.id_spesifikasi,
    };

    const { editResponse, editResult } = await editDataRadByIdSpec(dataUjiData);
    //const response = await saveResponse.json();

    if (editResponse.status == 200) {
      setLoading(false);
      alert("successfully Update Data Pesawat Sinar-X");
      router.push(
        `/dashboard/radiografi?No_Seri=${editResult.data.No_Seri}&id=${editResult.data.id_user}`
      );
    } else {
      console.error("Failed to edit data");
      setLoading(false);
      toast("failed to edit Data")
    }
    //router.push("/departure");
  };

  return (
    <div>
      <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
        <SideBar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header email={payloadQueryParams.email} />

          <main className="mt-3 flex justify-center items-center">
            <div className="px-5 py-5 shadow-md max-w-xl min-h-screen w-full border-t-4 border-green-500">
              <h2 className="mb-5 text-center text-3xl">Form Edit Data Uji</h2>

              <form onSubmit={(e) => handleEdit(e)} className="flex flex-col">
                {renderDataUji()}

                <button
                  type="submit"
                  className="px-2 py-2 bg-gradient-to-r from-lime-500 to-green-500 hover:from-fuchsia-600 hover:to-pink-300 rounded text-white"
                >
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
