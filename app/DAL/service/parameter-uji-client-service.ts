import { useState, useEffect } from "react";
import { getDataUjiByUserIdnSpecId as getDataUjiByUserIdnSpecIdRad } from "../repository/spec-repository";
import { getDataUjiByUserIdnSpecId as getDataUjiByUserIdnSpecIdFlo } from "../repository/fluoroskopi-spec-repository";
import { getDataUjiByUserIdnSpecIdDentalIntraoral } from "../repository/dental-spec-repository";

interface Machine {
  id_parameter: number;
  Iluminasi: number;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
  Ketegaklurusan: string;
  Akurasi_kV: number;
  Akurasi_waktu: number;
  Linearitas: number;
  Reproduksibilitas: number;
  Reproduksibilitas_kV: number;
  Reproduksibilitas_waktu: number;
  HVL: number;
  HVL_80: number;
  Kebocoran: number;
  Timer_darurat_mAs: number;
  Timer_darurat_s: number;
  Uniformitas_mAs: number;
  Uniformitas_EI: number;
  Penjejakan_ketebalan: number;
  Penjejakan_kV: number;
  Penjejakan_kombinasi: number;
  Waktu_respon_min: number;
  Tanggal_uji: string;
  id_user: number;
  email: string;
  jenis_pesawat: string;
  id_spesifikasi: number;
  Merk: string;
  Model: string;
  No_Seri: string;
}

interface Machine2nd {
  id_parameter: number;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
  Titik_pusat: string;
  Akurasi_kV: number;
  Waktu_Fluoroskopik: number;
  HVL: number;
  HVL_80: number;
  Esd: number;
  Dmax: number;
  Dmax_high: number;
  Input_II_a: number;
  Input_II_b: number;
  Input_II_c: number;
  Low_contrast: number;
  High_contrast_d1: number;
  High_contrast_d2: number;
  High_contrast_d3: number;
  High_contrast_d4: number;
  High_contrast_d5: number;
  High_contrast_d6: number;
  Tanggal_uji: string;
  id_user: number;
  email: string;
  jenis_pesawat: string;
  id_spesifikasi: number;
  Merk: string;
  Model: string;
  No_Seri: string;
}

interface MachineDental {
  id_parameter: number;
  Kolimasi_deltaX?: number;
  Akurasi_kV?: number;
  Akurasi_waktu?: number;
  Linearitas?: number;
  Reproduksibilitas?: number;
  Reproduksibilitas_kV?: number;
  Reproduksibilitas_waktu?: number;
  HVL?: number;
  Tanggal_uji?: string;
  id_user: number;
  email?: string;
  jenis_pesawat?: string;
  id_spesifikasi: number;
  Merk?: string;
  Model?: string;
  No_Seri?: string;
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
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataUjiByUserIdnSpecIdRad({ payloadQueryParams });
      setDataUji(data.data);
    } catch (error) {
      console.log(error);
      setErrorMsg("An error occurred, please try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataUji();
  }, []);

  return { dataUji, isLoading, errorMsg, refetch: fetchDataUji };
};

export const useFetchDataUjiByUserIdnSpecIdforFlo = ({ payloadQueryParams }: RadProps) => {
  const [dataUji, setDataUji] = useState<Machine2nd[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
      try {
        setIsLoading(true);
        const data = await getDataUjiByUserIdnSpecIdFlo({ payloadQueryParams });
        setDataUji(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg("An error occurred, please try again later!");
      }
    };
    fetchDataUji();
  }, []);

  return { dataUji, isLoading, errorMsg };
};

export const useFetchDataUjiByUserIdnSpecIdforDentalIntraoral = ({ payloadQueryParams }: RadProps) => {
  const [dataUji, setDataUji] = useState<MachineDental[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
      try {
        setIsLoading(true);
        const data = await getDataUjiByUserIdnSpecIdDentalIntraoral({ payloadQueryParams });
        setDataUji(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg("An error occurred, please try again later!");
      }
    };
    fetchDataUji();
  }, []);

  return { dataUji, isLoading, errorMsg };
};
