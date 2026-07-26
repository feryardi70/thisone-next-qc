import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface DashboardDentalProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export const getDataDentalByUserEmail = async (email: string, signal: AbortSignal) => {
  const response = await fetch(`${baseUrl}/qc/dental?email=${email}`, { signal });
  const data = await response.json();

  return data;
};

export const readDataDentalByUserEmail = async (email: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-dental/${email}`);
  const qcData = await response.json();

  return qcData;
};

export const getDataDentalForCollimationByUserIdnSNNumber = async ({ payloadQueryParams }: DashboardDentalProps) => {
  const response = await fetch(`${baseUrl}/qc/dental/kolimasi/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`);
  const data = await response.json();

  return data;
};
