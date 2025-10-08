import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface RadProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
  };
}

interface DataUji1st {
  Merk: string;
  Model: string;
  No_Seri: string;
  jenis_pesawat: string;
  id_user: string;
  id_spesifikasi: string;
}

interface DataUji2nd {
  Merk: string;
  Model: string;
  No_Seri: string;
  jenis_pesawat: string;
  userId: number;
}

interface DataUji3rd {
  jenis_pesawat: string;
  Merk: string;
  Model: string;
  No_Seri: string;
  id_user: number;
}

export const getDataUjiByUserIdnSpecId = async ({
  payloadQueryParams,
}: RadProps) => {
  const response = await fetch(
    `${baseUrl}/qc/radiografi/spesifikasi?id_spesifikasi=${payloadQueryParams.spesifikasiId}&id_user=${payloadQueryParams.userId}`
  );
  const data = await response.json();
  //console.log(data);

  return data;
};

export const readDataUjiByUserIdnSpecIdFromExtApi = async (
  id_user: string,
  id_spesifikasi: string
) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/ukes/data?id_user=${id_user}&id_spesifikasi=${id_spesifikasi}`
  );
  const qcData = await response.json();

  return qcData;
};

export const getDataRadBySN = async (No_Seri: string) => {
  const response = await fetch(
    `${baseUrl}/qc/radiografi/spesifikasi/${No_Seri}`
  );
  const data = await response.json();

  return data;
};

export const readDataRadBySN = async (No_Seri: string) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/spesifikasi/rad/${No_Seri}`
  );
  const dataUji = await response.json();

  return dataUji;
};

export const readDataRadByIdSpec = async (id_spesifikasi: string) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/spesifikasi/${id_spesifikasi}`
  );
  const dataUji = await response.json();

  return dataUji;
};

export const editDataRadByIdSpec = async (dataUjiData: DataUji1st) => {
  const editResponse = await fetch(`${baseUrl}/qc/radiografi/spesifikasi`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const editResult = await editResponse.json();

  return { editResponse, editResult };
};

export const updateDataRadByIdSpec = async (
  data: DataUji2nd,
  id_spesifikasi: string
) => {
  const updateResponse = await fetch(
    `${externalApiUrl}/qc-data-radiografi/spesifikasi/${id_spesifikasi}`,
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

export const addDataRad = async (dataUjiData: DataUji3rd) => {
  const saveResponse = await fetch(`${baseUrl}/qc/radiografi/spesifikasi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUjiData),
  });
  const response = await saveResponse.json();

  return { saveResponse, response };
};

export const saveDataRad = async (data: DataUji3rd) => {
  const saveResponse = await fetch(
    `${externalApiUrl}/qc-data-radiografi/spesifikasi`,
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

export const deleteDataRadByIdSpec = async (selectedSpecId: number | null) => {
  const response = await fetch(
    `${baseUrl}/qc/radiografi/spesifikasi?id_spesifikasi=${selectedSpecId}`,
    {
      method: "DELETE",
    }
  );

  return response;
};

export const removeDataRadByIdSpec = async (id_parameter: string | number) => {
  const result = await fetch(
    `${externalApiUrl}/qc-data-radiografi/spesifikasi/${id_parameter}`,
    {
      method: "DELETE",
    }
  );
  const deletedData = await result.json();

  return deletedData;
};
