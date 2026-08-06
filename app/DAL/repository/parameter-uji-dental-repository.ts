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
  Tanggal_uji: string;
  id_user: number | string;
  id_spesifikasi: number | string;
}

interface ParameterUji2nd {
  deltaX: number;
  kV: number;
  time: number;
  linear: number;
  repro: number;
  repro_kV: number;
  repro_time: number;
  Qberkas: number;
  Tanggal_uji: string;
  id_user: string | number;
  id_spesifikasi: string | number;
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
  const saveResponse = await fetch(`${externalApiUrl}/qc-data-dental/parameter-uji`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return saveResponse;
};

export const editDataUjiDentalIntraoralByIdParameter = async (dataUjiData: ParameterUji1st) => {
  const editResponse = await fetch(`${baseUrl}/qc/dental/parameter-uji`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const editResult = await editResponse.json();

  return { editResponse, editResult };
};

export const updateDataUjiDentalIntraoralByIdParameter = async (data: ParameterUji2nd, id_parameter: string) => {
  const updateResponse = await fetch(`${externalApiUrl}/qc-data-dental/parameter-uji/${id_parameter}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return updateResponse;
};
