import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface DashboardProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export const getDataCtByUserEmail = async (email: string, signal: AbortSignal) => {
  const response = await fetch(`${baseUrl}/qc/ct?email=${email}`, { signal });
  const data = await response.json();

  return data;
};

export const getDataCtForHvlByUserIdnSNNumber = async ({ payloadQueryParams }: DashboardProps) => {
  const response = await fetch(`${baseUrl}/qc/ct/hvl/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`);
  const data = await response.json();

  return data;
};

export const readDataCtByUserEmail = async (email: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-ct/${email}`);
  const qcData = await response.json();

  return qcData;
};

export const readDataCtForHvlByUserIdnSNNumber = async (id_user: number, No_Seri: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-ct/hvl?id_user=${id_user}&No_Seri=${No_Seri}`);
  const qcData = await response.json();

  return qcData;
};
