import { baseUrl, externalApiUrl } from "../../lib/constant";

interface FloProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
  };
}

export const readDataUjiByUserIdnSpecIdFromExtApi = async (id_user: string, id_spesifikasi: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-fluoroskopi/ukes/data?id_user=${id_user}&id_spesifikasi=${id_spesifikasi}`);
  const qcData = await response.json();

  return qcData;
};

export const getDataUjiByUserIdnSpecId = async ({ payloadQueryParams }: FloProps) => {
  const response = await fetch(`${baseUrl}/qc/fluoroskopi/spesifikasi?id_spesifikasi=${payloadQueryParams.spesifikasiId}&id_user=${payloadQueryParams.userId}`);
  const data = await response.json();

  return data;
};
