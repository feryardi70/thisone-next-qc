import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dataUji", "rad", "bySpecAndUser", payloadQueryParams.spesifikasiId, payloadQueryParams.userId],
    queryFn: ({ signal }) => getDataUjiByUserIdnSpecIdRad({ payloadQueryParams, signal }),
    enabled: !!payloadQueryParams?.spesifikasiId && !!payloadQueryParams?.userId,
    select: (res) => (res.data ?? []) as Machine[],
  });

  return {
    dataUji: data ?? [],
    isLoading,
    errorMsg: error ? "An error occurred, please try again later!" : "",
    refetch,
  };
};

export const useFetchDataUjiByUserIdnSpecIdforFlo = ({ payloadQueryParams }: RadProps) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dataUji", "flo", "bySpecAndUser", payloadQueryParams.spesifikasiId, payloadQueryParams.userId],
    queryFn: ({ signal }) => getDataUjiByUserIdnSpecIdFlo({ payloadQueryParams, signal }),
    enabled: !!payloadQueryParams?.spesifikasiId && !!payloadQueryParams?.userId,
    select: (res) => (res.data ?? []) as Machine2nd[],
  });

  return {
    dataUji: data ?? [],
    isLoading,
    errorMsg: error ? "An error occurred, please try again later!" : "",
    refetch,
  };
};

export const useFetchDataUjiByUserIdnSpecIdforDentalIntraoral = ({ payloadQueryParams }: RadProps) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dataUji", "dental", "bySpecAndUser", payloadQueryParams.spesifikasiId, payloadQueryParams.userId],
    queryFn: ({ signal }) => getDataUjiByUserIdnSpecIdDentalIntraoral({ payloadQueryParams, signal }),
    enabled: !!payloadQueryParams?.spesifikasiId && !!payloadQueryParams?.userId,
    select: (res) => (res.data ?? []) as MachineDental[],
  });

  return {
    dataUji: data ?? [],
    isLoading,
    errorMsg: error ? "An error occurred, please try again later!" : "",
    refetch,
  };
};
