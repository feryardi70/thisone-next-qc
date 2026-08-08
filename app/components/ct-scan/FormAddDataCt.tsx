"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../Sidebar";
import Header from "../Header";
import { toast } from "sonner";
import { addDataRad } from "@/app/DAL/repository/spec-repository";

interface RadProps {
  payloadQueryParams: {
    userId: number;
    email: string;
  };
}

export default function AddNewDataCtForm({ payloadQueryParams }: RadProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState({
    jenis_pesawat: "CT Scan",
    Merk: "",
    Model: "",
    No_Seri: "",
    id_user: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataUjiData = {
      jenis_pesawat: dataUji.jenis_pesawat,
      Merk: dataUji.Merk,
      Model: dataUji.Model,
      No_Seri: dataUji.No_Seri,
      id_user: payloadQueryParams.userId,
    };

    try {
      const { saveResponse, response } = await addDataRad(dataUjiData);

      if (saveResponse.status !== 200) {
        setLoading(false);
        toast("Failed to add data");
        return;
      }

      setLoading(false);
      alert("successfully Adding New Data Pesawat CT Scan");
      router.push(`/dashboard/ct-scan/kolimasi?No_Seri=${response.data.No_Seri}&id=${response.data.id_user}`);
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
      <div className="flex min-h-screen overflow-hidden bg-linear-to-br from-slate-800 to-slate-500">
        <SideBar />

        <div className="flex-1 flex flex-col min-w-0">
          <Header email={payloadQueryParams.email} />

          <main className="mt-3 flex justify-center items-center text-black">
            <div className="px-5 py-5 shadow-md max-w-xl min-h-screen w-full border-t-4 border-slate-500 bg-white/90">
              <h2 className="mb-5 text-center text-3xl">Form Add Data CT Scan</h2>

              <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex flex-col w-[48%]">
                    <label htmlFor="Merk" className="mb-1 text-slate-700">
                      Merk
                    </label>
                    <input
                      type="text"
                      className="px-2 py-2 mb-5 border-2 border-slate-300 focus:border-slate-700 rounded-md outline-none"
                      id="Merk"
                      name="Merk"
                      value={dataUji.Merk || ""}
                      onChange={(e) => setDataUji({ ...dataUji, Merk: e.target.value })}
                      placeholder=""
                      aria-describedby="Merk"
                    />

                    <label htmlFor="Model" className="mb-1 text-slate-700">
                      Model
                    </label>
                    <input
                      type="text"
                      className="px-2 py-2 mb-5 border border-slate-300 focus:border-slate-700 rounded-md outline-none"
                      id="Model"
                      name="Model"
                      value={dataUji.Model || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          Model: e.target.value,
                        })
                      }
                      placeholder=""
                      aria-describedby="Model"
                    />
                  </div>

                  <div className="flex flex-col w-[48%]">
                    <label htmlFor="No_Seri" className="mb-1 text-slate-700">
                      Nomor Seri
                    </label>
                    <input
                      type="text"
                      className="px-2 py-2 mb-5 border border-slate-300 focus:border-slate-700 rounded-md outline-none"
                      id="No_Seri"
                      name="No_Seri"
                      value={dataUji.No_Seri || ""}
                      onChange={(e) => setDataUji({ ...dataUji, No_Seri: e.target.value })}
                      placeholder=""
                      aria-describedby="No_Seri"
                    />

                    <input
                      type="hidden"
                      id="jenis_pesawat"
                      name="jenis_pesawat"
                      value={dataUji.jenis_pesawat || ""}
                      onChange={(e) =>
                        setDataUji({
                          ...dataUji,
                          jenis_pesawat: e.target.value,
                        })
                      }
                      aria-describedby="jenis_pesawat"
                    />
                  </div>
                </div>

                <button type="submit" className="px-2 py-2 bg-linear-to-r from-slate-700 to-slate-900 hover:from-slate-900 hover:to-slate-700 rounded text-white">
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
