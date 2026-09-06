"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

interface DataUjiForm {
  Merk: string;
  Model: string;
  No_Seri: string;
  jenis_pesawat: string;
  id_user: string;
  id_spesifikasi: string;
}

const emptyDataUji: DataUjiForm = {
  Merk: "",
  Model: "",
  No_Seri: "",
  jenis_pesawat: "",
  id_user: "",
  id_spesifikasi: "",
};

export default function EditDataRadDrawer({ open, No_Seri, onClose, onSuccess }: EditDataRadDrawerProps) {
  const queryClient = useQueryClient();
  const [dataUji, setDataUji] = useState<DataUjiForm>(emptyDataUji);

  const { data: fetchedData, isFetching } = useQuery({
    queryKey: ["dataRad", "bySN", No_Seri],
    queryFn: ({ signal }) => getDataRadBySN(No_Seri as string, signal),
    enabled: open && !!No_Seri,
    select: (res) => (res?.data?.[0] ?? null) as DataUjiForm | null,
  });

  useEffect(() => {
    if (fetchedData) {
      setDataUji({
        Merk: fetchedData.Merk ?? "",
        Model: fetchedData.Model ?? "",
        No_Seri: fetchedData.No_Seri ?? "",
        jenis_pesawat: fetchedData.jenis_pesawat ?? "",
        id_user: fetchedData.id_user ?? "",
        id_spesifikasi: fetchedData.id_spesifikasi ?? "",
      });
    }
  }, [fetchedData]);

  const editMutation = useMutation({
    mutationFn: editDataRadByIdSpec,
    onSuccess: ({ editResponse }) => {
      if (editResponse.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["dataRad"] });
        queryClient.invalidateQueries({ queryKey: ["dataUji", "rad"] });

        toast.success("successfully Update Data Pesawat Sinar-X");

        onSuccess();
        onClose();
      } else {
        toast.error("failed to edit Data");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("failed to edit Data");
    },
  });

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editMutation.mutate({
      Merk: dataUji.Merk,
      Model: dataUji.Model,
      No_Seri: dataUji.No_Seri,
      jenis_pesawat: dataUji.jenis_pesawat,
      id_user: dataUji.id_user,
      id_spesifikasi: dataUji.id_spesifikasi,
    });
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

          {isFetching ? (
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
                <button type="submit" disabled={editMutation.isPending} className="px-2 py-2 bg-gradient-to-r from-lime-500 to-green-500 hover:from-fuchsia-600 hover:to-pink-300 rounded text-white disabled:opacity-50">
                  {editMutation.isPending ? "Updating Data... Please wait..." : "Update Data"}
                </button>
                <button type="button" onClick={onClose} disabled={editMutation.isPending} className="bg-gray-400 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50">
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
