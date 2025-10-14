import { useState, useEffect } from "react";
import { getDataRadByUserEmail } from "../repository/radiografi-repository";

interface Machine {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Iluminasi: number;
  Tanggal_uji: string;
}

export const useFetchDataUjiByUserEmail = (email: string) => {
  const [dataUji, setDataUji] = useState<Machine[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
      try {
        setIsLoading(true);
        const data = await getDataRadByUserEmail(email);
        //const data = await response.json();
        //console.log(data);
        const allDataUji = await data.data;
        const dataUji = await data.selectedData;
        setAllDataUji(allDataUji || []);
        //console.log(dataUji);
        setDataUji(dataUji || []);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg("An error occurred, please try again later!");
      }
    };
    fetchDataUji();
  }, []);

  return { allDataUji, dataUji, isLoading, errorMsg };
};
