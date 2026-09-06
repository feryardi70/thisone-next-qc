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

// Server-side: call external API directly (used by the print route which
// is rendered on the server and does not go through the same-origin proxy).
export const fetchReportDataServer = async (id_user: number, id_spesifikasi: number, start_date: string, end_date: string) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/report/data?id_user=${id_user}&id_spesifikasi=${id_spesifikasi}&start_date=${start_date}&end_date=${end_date}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch report data: ${response.status}`);
  }
  return response.json();
};

// Server-side: fetch machine metadata by spec id (used by the print route).
export const fetchMachineMetaBySpecIdServer = async (id_spesifikasi: number) => {
  const response = await fetch(
    `${externalApiUrl}/qc-data-radiografi/spesifikasi/${id_spesifikasi}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch machine metadata: ${response.status}`);
  }
  return response.json();
};