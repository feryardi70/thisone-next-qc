import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface ParameterUji1st {
  Iluminasi: string;
  Kolimasi_deltaX: string;
  Kolimasi_deltaY: string;
  Ketegaklurusan: string;
  Akurasi_kV: string;
  Akurasi_waktu: string;
  Linearitas: string;
  Reproduksibilitas: string;
  Reproduksibilitas_kV: string;
  Reproduksibilitas_waktu: string;
  HVL: string;
  HVL_80: string;
  Kebocoran: string;
  Timer_darurat_mAs: string;
  Timer_darurat_s: string;
  Uniformitas_mAs: string;
  Uniformitas_EI: string;
  Penjejakan_ketebalan: string;
  Penjejakan_kV: string;
  Penjejakan_kombinasi: string;
  Waktu_respon_min: string;
  Tanggal_uji: string;
  id_user: number;
  id_spesifikasi: number;
}

interface ParameterUji2nd {
  ilum: number;
  deltaX: number;
  deltaY: number;
  Ketegaklurusan: string;
  kV: number;
  time: number;
  linear: number;
  repro: number;
  repro_kV: number;
  repro_time: number;
  Qberkas: number;
  Qberkas_80: number;
  leakage: number;
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
  id_spesifikasi: number;
}

interface ParameterUji3rd {
  id_parameter: string;
  Iluminasi: string;
  Kolimasi_deltaX: string;
  Kolimasi_deltaY: string;
  Ketegaklurusan: string;
  Akurasi_kV: string;
  Akurasi_waktu: string;
  Linearitas: string;
  Reproduksibilitas: string;
  Reproduksibilitas_kV: string;
  Reproduksibilitas_waktu: string;
  HVL: string;
  HVL_80: string;
  Kebocoran: string;
  Timer_darurat_mAs: string;
  Timer_darurat_s: string;
  Uniformitas_mAs: string;
  Uniformitas_EI: string;
  Penjejakan_ketebalan: string;
  Penjejakan_kV: string;
  Penjejakan_kombinasi: string;
  Waktu_respon_min: string;
  Tanggal_uji: string;
  id_user: string;
  id_spesifikasi: string;
}

interface ParameterUji4th {
  ilum: number;
  deltaX: number;
  deltaY: number;
  Ketegaklurusan: string;
  kV: number;
  time: number;
  linear: number;
  repro: number;
  repro_kV: number;
  repro_time: number;
  Qberkas: number;
  Qberkas_80: number;
  leakage: number;
  Timer_darurat_mAs: number;
  Timer_darurat_s: number;
  Uniformitas_mAs: number;
  Uniformitas_EI: number;
  Penjejakan_ketebalan: number;
  Penjejakan_kV: number;
  Penjejakan_kombinasi: number;
  Waktu_respon_min: number;
  Tanggal_uji: string;
  id_user: number | string;
  id_spesifikasi: number | string;
}

export const addDataUji = async (dataUjiData: ParameterUji1st) => {
  const saveResponse = await fetch(`${baseUrl}/qc/radiografi/parameter-uji`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const response = await saveResponse.json();

  return { saveResponse, response };
};

export const saveDataUji = async (data: ParameterUji2nd) => {
  const saveResponse = await fetch(
    `${externalApiUrl}/qc-data-radiografi/parameter-uji`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return saveResponse;
};

export const updateDataUjiByIdParameter = async (
  data: ParameterUji4th,
  id_parameter: string
) => {
  const updateResponse = await fetch(
    `${externalApiUrl}/qc-data-radiografi/parameter-uji/${id_parameter}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return updateResponse;
};

export const getDataUjiByIdParameter = async (id_parameter: number) => {
  const response = await fetch(
    `${baseUrl}/qc/radiografi/parameter-uji/${id_parameter}`
  );
  const data = await response.json();

  return data;
};

export const deleteDataUjiByIdParameter = async (
  selectedParameterId: number | null
) => {
  const response = await fetch(
    `${baseUrl}/qc/radiografi/parameter-uji/${selectedParameterId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};

export const readDataUjiByIdParameter = async (
  id_parameter: string | number
) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/parameter-uji/${id_parameter}`
  );
  const dataUji = await response.json();

  return dataUji;
};

export const removeDataUjiByIdParameter = async (
  id_parameter: string | number
) => {
  const result = await fetch(
    `${externalApiUrl}/qc-data-radiografi/parameter-uji/${id_parameter}`,
    {
      method: "DELETE",
    }
  );
  const deletedData = await result.json();

  return deletedData;
};

export const editDataUjiByIdParameter = async (dataUjiData: ParameterUji3rd) => {
  const editResponse = await fetch(`${baseUrl}/qc/radiografi/parameter-uji`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const editResult = await editResponse.json();

  return { editResponse, editResult };
};
