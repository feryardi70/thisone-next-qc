import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface ParameterUji1st {
  Kolimasi_deltaX: string;
  Kolimasi_deltaY: string;
  Titik_pusat: string;
  Akurasi_kV: string;
  Waktu_Fluoroskopik: string;
  HVL: string;
  HVL_80: string;
  Esd: string;
  Dmax: string;
  Dmax_high: string;
  Input_II_a: string;
  Input_II_b: string;
  Input_II_c: string;
  Low_contrast: string;
  High_contrast_d1: string;
  High_contrast_d2: string;
  High_contrast_d3: string;
  High_contrast_d4: string;
  High_contrast_d5: string;
  High_contrast_d6: string;
  Tanggal_uji: string;
  id_user: number;
  id_spesifikasi: number;
}

interface ParameterUji2nd {
  ASX: number;
  deviasi_ASX_AEM: number;
  jarak_pusat: number;
  kV: number;
  timer_flo: number;
  Qberkas: number;
  Qberkas_80: number;
  ESD: number;
  Dmax_normal: number;
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
  id_spesifikasi: number;
}

export const addDataUjiFlo = async (dataUjiData: ParameterUji1st) => {
  const saveResponse = await fetch(`${baseUrl}/qc/fluoroskopi/parameter-uji`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const response = await saveResponse.json();

  return { saveResponse, response };
};

export const saveDataUjiFlo = async (data: ParameterUji2nd) => {
  const saveResponse = await fetch(`${externalApiUrl}/qc-data-fluoroskopi/parameter-uji`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return saveResponse;
};
