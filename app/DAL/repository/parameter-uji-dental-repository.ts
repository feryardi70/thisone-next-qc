import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface ParameterUji1st {
  Kolimasi_deltaX: string | number;
  Akurasi_kV: string | number;
  Akurasi_waktu: string | number;
  Linearitas: string | number;
  Reproduksibilitas: string | number;
  Reproduksibilitas_kV: string | number;
  Reproduksibilitas_waktu: string | number;
  HVL: string | number;
  HVL_80: string | number;
  Tanggal_uji: string;
  id_user: number;
  id_spesifikasi: number;
}

export const addDataDentalIntraoral = async (dataUjiData: ParameterUji1st) => {
  const saveResponse = await fetch(`${baseUrl}/qc/dental/parameter-uji`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const response = await saveResponse.json();

  return { saveResponse, response };
};

export const saveDataUjiDentalIntraoral = async (data: ParameterUji1st) => {
  const saveResponse = await fetch(`${externalApiUrl}/qc-data-radiografi/parameter-uji`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return saveResponse;
};
