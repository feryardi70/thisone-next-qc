import { useState, useEffect } from "react";
import { getDataUjiByUserIdnSpecId } from "../repository/spec-repository";

interface Machine {
  id_parameter: number;
  Iluminasi: number;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
  Akurasi_kV: number;
  Akurasi_waktu: number;
  Linearitas: number;
  Reproduksibilitas: number;
  HVL: number;
  Kebocoran: number;
  Tanggal_uji: string;
  id_user: number;
  email: string;
  jenis_pesawat: string;
  id_spesifikasi: number;
  Merk: string;
  Model: string;
  No_Seri: string;
}

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
  };
}

export const useFetchDataUjiByUserIdnSpecId = ({ payloadQueryParams }: RadProps) => {
  const [dataUji, setDataUji] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const fetchDataUji = async () => {
    try {
      setIsLoading(true);  
      const data = await getDataUjiByUserIdnSpecId({payloadQueryParams});
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg('An error occurred, please try again later!');
    }
  };

  useEffect(() => {
    fetchDataUji();
  }, []);

    return { dataUji, isLoading, errorMsg };
};