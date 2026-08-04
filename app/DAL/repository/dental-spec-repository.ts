import { baseUrl, externalApiUrl } from "../../lib/constant";

interface DentalProps {
  payloadQueryParams: {
    spesifikasiId: number;
    userId: number;
  };
}

export const getDataUjiByUserIdnSpecIdDentalIntraoral = async ({ payloadQueryParams }: DentalProps) => {
  const response = await fetch(`${baseUrl}/qc/dental/spesifikasi?id_spesifikasi=${payloadQueryParams.spesifikasiId}&id_user=${payloadQueryParams.userId}`);
  const data = await response.json();

  return data;
};

export const readDataUjiByUserIdnSpecIdFromExtApi = async (id_user: string, id_spesifikasi: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-dental/ukes/data?id_user=${id_user}&id_spesifikasi=${id_spesifikasi}`);
  const qcData = await response.json();

  return qcData;
};
