import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export const getDataFloByUserEmail = async (email: string, signal: AbortSignal) => {
  const response = await fetch(`${baseUrl}/qc/fluoroskopi?email=${email}`, { signal });
  const data = await response.json();

  return data;
};

export const readDataFloByUserEmail = async (email: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-fluoroskopi/${email}`);
  //console.log(response);
  const qcData = await response.json();

  return qcData;
};

export const getDataFloForCollimationByUserIdnSNNumber = async ({ payloadQueryParams }: DashboardRadProps) => {
  const response = await fetch(`${baseUrl}/qc/fluoroskopi/kolimasi/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`);
  const data = await response.json();

  return data;
};
