"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addDataRad } from "@/app/DAL/repository/spec-repository";

interface AddDataRadModalProps {
  id_user: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddDataRadModal({ id_user, onClose, onSuccess }: AddDataRadModalProps) {
  const [loading, setLoading] = useState(false);
  const [dataUji, setDataUji] = useState({
    jenis_pesawat: "Radiografi Umum",
    Merk: "",
    Model: "",
    No_Seri: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataUjiData = {
      jenis_pesawat: dataUji.jenis_pesawat,
      Merk: dataUji.Merk,
      Model: dataUji.Model,
      No_Seri: dataUji.No_Seri,
      id_user,
    };

    try {
      const { saveResponse } = await addDataRad(dataUjiData);

      if (saveResponse.status !== 200) {
        setLoading(false);
        toast("Failed to add data");
        return;
      }

      setLoading(false);
      onClose();
      onSuccess();
      toast.success("successfully Adding New Data Pesawat Sinar-X");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast("Failed to add data", {
        className: "bg-red-400 text-black",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md z-50">
      <div className="bg-emerald-900 p-6 rounded-lg shadow-lg w-[90%] md:w-1/2 lg:w-1/3">
        <h2 className="mb-5 text-center text-xl font-semibold text-white">Form Add Data Radiografi</h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="Merk" className="mb-1 text-lime-500">
            Merk
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Merk"
            name="Merk"
            value={dataUji.Merk || ""}
            onChange={(e) => setDataUji({ ...dataUji, Merk: e.target.value })}
            aria-describedby="Merk"
          />

          <label htmlFor="Model" className="mb-1 text-lime-500">
            Model
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="Model"
            name="Model"
            value={dataUji.Model || ""}
            onChange={(e) => setDataUji({ ...dataUji, Model: e.target.value })}
            aria-describedby="Model"
          />

          <label htmlFor="No_Seri" className="mb-1 text-lime-500">
            Nomor Seri
          </label>
          <input
            type="text"
            className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
            id="No_Seri"
            name="No_Seri"
            value={dataUji.No_Seri || ""}
            onChange={(e) => setDataUji({ ...dataUji, No_Seri: e.target.value })}
            aria-describedby="No_Seri"
          />

          <div className="flex justify-end space-x-2 mt-2">
            <button type="button" onClick={onClose} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded disabled:opacity-50">
              {loading ? "Adding New Data..." : "Add Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
