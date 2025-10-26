import { baseUrl, externalApiUrl } from "@/app/lib/constant";

export const readReportDataFromExtApi = async (id_user: number, id_spesifikasi: number, start_date: string, end_date: string) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/report/data?id_user=${id_user}&id_spesifikasi=${id_spesifikasi}&start_date=${start_date}&end_date=${end_date}`
  );
  const dataUji = await response.json();

  return dataUji;
};

export const generatingReportDataByPostReq = async (id_user: number, id_spesifikasi: number, start_date: string, end_date: string) => {
  const response = await fetch(
    `${baseUrl}/qc/radiografi/spesifikasi/pre-report`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_user,
        id_spesifikasi,
        start_date,
        end_date,
      }),
    }
  );

  return response;
};