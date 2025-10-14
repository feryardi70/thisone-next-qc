import { baseUrl, externalApiUrl } from "@/app/lib/constant";

interface DashboardRadProps {
  payloadQueryParams: {
    id_user: number;
    No_Seri: string | string[] | undefined;
  };
}

export const getDataRadByUserIdnSNNumber = async({ payloadQueryParams }: DashboardRadProps) => {
    const response = await fetch(
            `${baseUrl}/qc/radiografi/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
          );
    const data = await response.json();

    return data;
}

export const getDataRadByUserEmail = async(email: string) => {
    const response = await fetch(
          `${baseUrl}/qc/radiografi?email=${email}`
        );
    const data = await response.json();

    return data;
}

export const readDataRadByUserEmail = async(email: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-radiografi/${email}`);
    //console.log(response);
    const qcData = await response.json();

    return qcData;
}

export const readDataRadByUserIdnSNNumber = async(id_user: number, No_Seri: string) => {
  const response = await fetch(`${externalApiUrl}/qc-data-radiografi?id_user=${id_user}&No_Seri=${No_Seri}`);
  //console.log(response);
  const qcData = await response.json();

  return qcData;
}

export const getDataRadForCollimationByUserIdnSNNumber = async({ payloadQueryParams }: DashboardRadProps) => {
    const response = await fetch(
            `${baseUrl}/qc/radiografi/kolimasi/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
          );
    const data = await response.json();

    return data;
}

export const getDataRadForAkurKVByUserIdnSNNumber = async({ payloadQueryParams }: DashboardRadProps) => {
    const response = await fetch(
            `${baseUrl}/qc/radiografi/akurasi-kv/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
          );
    const data = await response.json();

    return data;
}

export const getDataRadForAkurWaktuByUserIdnSNNumber = async({ payloadQueryParams }: DashboardRadProps) => {
    const response = await fetch(
            `${baseUrl}/qc/radiografi/akurasi-waktu/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
          );
    const data = await response.json();

    return data;
}

export const getDataRadForLinearitasByUserIdnSNNumber = async({ payloadQueryParams }: DashboardRadProps) => {
    const response = await fetch(
            `${baseUrl}/qc/radiografi/linearitas/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
          );
    const data = await response.json();

    return data;
}

export const getDataRadForKebocoranByUserIdnSNNumber = async({ payloadQueryParams }: DashboardRadProps) => {
    const response = await fetch(
            `${baseUrl}/qc/radiografi/kebocoran/${payloadQueryParams.id_user}?No_Seri=${payloadQueryParams.No_Seri}`
          );
    const data = await response.json();

    return data;
}

