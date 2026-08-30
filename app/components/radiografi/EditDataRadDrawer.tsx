"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { editDataRadByIdSpec, getDataRadBySN } from "@/app/DAL/repository/spec-repository";
import SpinnerCss from "../spinner-css";

interface EditDataRadDrawerProps {
  open: boolean;
  No_Seri: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditDataRadDrawer({ open, No_Seri, onClose, onSuccess }: EditDataRadDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
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
      setFetching(true);
      try {
        const data = await getDataRadBySN(No_Seri as string);
        setDataUji(data.data[0]);
      } catch (error) {
        console.log(error);
        toast.error("failed to load data");
      } finally {
        setFetching(false);
      }
    };

    if (open && No_Seri) {
      fetchDataUjiById();
    }
  }, [open, No_Seri]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataUjiData = {
      Merk: dataUji.Merk,
      Model: dataUji.Model,
      No_Seri: dataUji.No_Seri,
      jenis_pesawat: dataUji.jenis_pesawat,
      id_user: dataUji.id_user,
      id_spesifikasi: dataUji.id_spesifikasi,
    };

    try {
      const { editResponse } = await editDataRadByIdSpec(dataUjiData);

      if (editResponse.status == 200) {
        setLoading(false);
        onClose();
        onSuccess();
        toast.success("successfully Update Data Pesawat Sinar-X");
      } else {
        setLoading(false);
        toast.error("failed to edit Data");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("failed to edit Data");
    }
  };

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="max-h-[92vh] bg-green-900/70 backdrop-blur-sm">
        <div className="overflow-y-auto px-6 pb-6">
          <DrawerHeader className="p-0 pt-5 text-center">
            <DrawerTitle className="text-2xl text-white">Form Edit Data Pesawat Sinar-X Radiografi</DrawerTitle>
            <DrawerDescription>
              <small className="italic text-white">Edit spesifikasi pesawat sinar-x</small>
            </DrawerDescription>
          </DrawerHeader>

          {fetching ? (
            <SpinnerCss />
          ) : (
          <form onSubmit={handleEdit} className="mt-5 flex flex-col">
            <div className="flex justify-between">
              <div className="flex w-[48%] flex-col">
                <label htmlFor="drawer-Merk" className="mb-1 text-lime-300">
                  Merk
                </label>
                <input
                  type="text"
                  className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                  id="drawer-Merk"
                  name="Merk"
                  value={dataUji.Merk || ""}
                  onChange={(e) => setDataUji({ ...dataUji, Merk: e.target.value })}
                  placeholder="Philips"
                  aria-describedby="Merk"
                />

                <label htmlFor="drawer-Model" className="mb-1 text-lime-300">
                  Model
                </label>
                <input
                  type="text"
                  className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                  id="drawer-Model"
                  name="Model"
                  value={dataUji.Model || ""}
                  onChange={(e) => setDataUji({ ...dataUji, Model: e.target.value })}
                  placeholder="1234"
                  aria-describedby="Model"
                />
              </div>

              <div className="flex w-[48%] flex-col">
                <label htmlFor="drawer-No_Seri" className="mb-1 text-lime-300">
                  No Seri
                </label>
                <input
                  type="text"
                  className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                  id="drawer-No_Seri"
                  name="No_Seri"
                  value={dataUji.No_Seri || ""}
                  onChange={(e) => setDataUji({ ...dataUji, No_Seri: e.target.value })}
                  placeholder="1234"
                  aria-describedby="No_Seri"
                />

                <label htmlFor="drawer-jenis_pesawat" className="mb-1 text-lime-300">
                  Jenis Pesawat
                </label>
                <input
                  type="text"
                  className="px-2 py-2 mb-5 border text-white border-fuchsia-200 focus:border-green-700 rounded-md outline-none"
                  id="drawer-jenis_pesawat"
                  name="jenis_pesawat"
                  value={dataUji.jenis_pesawat || ""}
                  placeholder="Radiografi"
                  aria-describedby="jenis_pesawat"
                  disabled
                />
              </div>
            </div>

            <DrawerFooter className="p-0 flex flex-row justify-center gap-2">
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
