import { useState, useEffect } from "react";
import { getDataRadByUserIdnSNNumber, getDataRadForCollimationByUserIdnSNNumber } from "../repository/radiografi-repository";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

interface Machine {
  email: string;
  id_user: number;
  id_spesifikasi:  number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Iluminasi: number;
  Tanggal_uji: string;
}

interface Machine2nd {
  email: string;
  id_user: number;
  id_spesifikasi:  number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
  Tanggal_uji: string;
}

export const useFetchRadMachineByUserIdnSNNumber = ({ payloadQueryParams }: DashboardRadProps) => {
    const [dataUji, setDataUji] = useState<Machine[]>([]);
    const [allDataUji, setAllDataUji] = useState<Machine[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const fetchDataUji = async () => {
        try {
          setIsLoading(true)  
          const data = await getDataRadByUserIdnSNNumber({payloadQueryParams});
          //const data = await response.json();
          //console.log(data.data);
          setDataUji(data.selectedData);
          setAllDataUji(data.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setErrorMsg('An error occurred, please try again later!');
        }
      };
    
      useEffect(() => {
        fetchDataUji();
      }, [payloadQueryParams.No_Seri, payloadQueryParams.id_user]);

      return { dataUji, allDataUji, isLoading, errorMsg }
}

export const useFetchRadMachineByUserIdnSNNumberForCollimation = ({ payloadQueryParams }: DashboardRadProps) => {
    const [dataUji, setDataUji] = useState<Machine2nd[]>([]);
    const [allDataUji, setAllDataUji] = useState<Machine2nd[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const fetchDataUji = async () => {
        try {
          setIsLoading(true)  
          const data = await getDataRadForCollimationByUserIdnSNNumber({payloadQueryParams});
          //const data = await response.json();
          console.log(data.data);
          setDataUji(data.selectedData);
          setAllDataUji(data.data);
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

      return { dataUji, allDataUji, isLoading, errorMsg }
}