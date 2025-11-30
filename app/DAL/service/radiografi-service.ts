import { useState, useEffect } from "react";
import {
  getDataRadByUserIdnSNNumber,
  getDataRadForAkurKVByUserIdnSNNumber,
  getDataRadForAkurWaktuByUserIdnSNNumber,
  getDataRadForCollimationByUserIdnSNNumber,
  getDataRadForHVLByUserIdnSNNumber,
  getDataRadForKebocoranByUserIdnSNNumber,
  getDataRadForLinearitasByUserIdnSNNumber,
  getDataRadForReproByUserIdnSNNumber,
  getDataRadForTimerDaruratByUserIdnSNNumber,
  getDataRadForAECUniformitasByUserIdnSNNumber,
  getDataRadForPenjejakanByUserIdnSNNumber,
  getDataRadForWaktuResponMinByUserIdnSNNumber,
} from "../repository/radiografi-repository";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

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

interface Machine2nd {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Kolimasi_deltaX: number;
  Kolimasi_deltaY: number;
  Ketegaklurusan: string;
  Tanggal_uji: string;
}

interface Machine3rd {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Akurasi_kV: number;
  Tanggal_uji: string;
}

interface Machine4th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Akurasi_waktu: number;
  Tanggal_uji: string;
}

interface Machine5th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Linearitas: number;
  Tanggal_uji: string;
}

interface Machine6th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Kebocoran: number;
  Tanggal_uji: string;
}

interface Machine7th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Reproduksibilitas: number;
  Reproduksibilitas_kV: number;
  Reproduksibilitas_waktu: number;
  Tanggal_uji: string;
}

interface Machine8th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  HVL: number;
  HVL_80: number;
  Tanggal_uji: string;
}

interface Machine9th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Timer_darurat_mAs: number;
  Timer_darurat_s: number;
  Tanggal_uji: string;
}

interface Machine10th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  Uniformitas_mAs: number;
  Uniformitas_EI: number;
  Tanggal_uji: string;
}

interface Machine11th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  penjejakan_ketebalan: number;
  penjejakan_kV: number;
  penjejakan_kombinasi: number;
  Tanggal_uji: string;
}

interface Machine12th {
  email: string;
  id_user: number;
  id_spesifikasi: number;
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  waktu_respon_min: number;
  Tanggal_uji: string;
}

export const useFetchRadMachineByUserIdnSNNumber = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
      try {
        setIsLoading(true);
        const data = await getDataRadByUserIdnSNNumber({ payloadQueryParams });
        //const data = await response.json();
        console.log(data.data);
        setDataUji(data.selectedData);
        setAllDataUji(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMsg("An error occurred, please try again later!");
      }
    };
    fetchDataUji();
  }, [payloadQueryParams.No_Seri, payloadQueryParams.id_user]);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForCollimation = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine2nd[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine2nd[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForCollimationByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForAkurKV = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine3rd[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine3rd[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForAkurKVByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForAkurWaktu = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine4th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine4th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForAkurWaktuByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForLinearitas = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine5th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine5th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForLinearitasByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForRepro = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine7th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine7th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForReproByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForHVL = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine8th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine8th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForHVLByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForKebocoran = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine6th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine6th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForKebocoranByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForTimerDarurat = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine9th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine9th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForTimerDaruratByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForAECUniformitas = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine10th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine10th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForAECUniformitasByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForPenjejakan = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine11th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine11th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForPenjejakanByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      //console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};

export const useFetchRadMachineByUserIdnSNNumberForWaktuResponMin = ({
  payloadQueryParams,
}: DashboardRadProps) => {
  const [dataUji, setDataUji] = useState<Machine12th[]>([]);
  const [allDataUji, setAllDataUji] = useState<Machine12th[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchDataUji = async () => {
    try {
      setIsLoading(true);
      const data = await getDataRadForWaktuResponMinByUserIdnSNNumber({
        payloadQueryParams,
      });
      //const data = await response.json();
      console.log(data.data);
      setDataUji(data.selectedData);
      setAllDataUji(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMsg("An error occurred, please try again later!");
    }
  };
    fetchDataUji();
  }, []);

  return { dataUji, allDataUji, isLoading, errorMsg };
};