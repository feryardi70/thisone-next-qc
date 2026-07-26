import { useState, useEffect } from "react";
import { getDataDentalByUserEmail, getDataDentalForCollimationByUserIdnSNNumber } from "../repository/dental-repository";

interface Machine {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Tanggal_uji: string;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
}

interface Params {
  id_user?: number | undefined;
  No_Seri?: string | string[] | undefined;
  email: string;
}

export const useFetchDentalByParams = ({ id_user, No_Seri, email }: Params) => {
  const [dataUji, setDataUji] = useState<Machine[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchByEmail = async () => {
      try {
        setIsLoading(true);
        const data = await getDataDentalByUserEmail(email, signal);
        const all = data.data;
        const selected = data.selectedData;
        setAllDataUji(all || []);
        setDataUji(selected || []);
      } catch (err) {
        const e = err as Error;
        if (e.name !== "AbortError") setErrorMsg("An error occurred, please try again later!");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchById = async () => {
      try {
        setIsLoading(true);
        const data = await getDataDentalForCollimationByUserIdnSNNumber({ payloadQueryParams: { id_user: id_user as number, No_Seri } });
        setDataUji(data.selectedData || []);
        setAllDataUji(data.data || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("An error occurred, please try again later!");
      } finally {
        setIsLoading(false);
      }
    };

    if (id_user != null) {
      fetchById();
    } else {
      fetchByEmail();
    }

    return () => controller.abort();
  }, [id_user, No_Seri, email]);

  return { allDataUji, dataUji, isLoading, errorMsg };
};

export default useFetchDentalByParams;
