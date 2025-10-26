import { useState, useEffect } from "react";
import { getDataRadByIdSpec } from "../repository/spec-repository";

interface Machine {
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  id_user: number;
}

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
  };
}

export const useFetchDataRadBySpecId = ({
  payloadQueryParams,
}: RadProps) => {
  const [dataRad, setDataRad] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataRad = async () => {
      try {
        setIsLoading(true);
        const data = await getDataRadByIdSpec(payloadQueryParams.spesifikasiId);
        setDataRad(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg("An error occurred, please try again later!");
      }
    };
    fetchDataRad();
  }, []);

  return { dataRad, isLoading, errorMsg };
};
