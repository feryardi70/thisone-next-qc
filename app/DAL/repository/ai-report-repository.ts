import { baseUrl } from "@/app/lib/constant";

export const generateAIReport = async (prompt: string, id_user: number, id_spesifikasi: number, start_date: string, end_date: string): Promise<{ markdown: string; qcData: unknown[]; machine: Record<string, unknown> | null }> => {
  const response = await fetch(`${baseUrl}/ai/generate-report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, id_user, id_spesifikasi, start_date, end_date }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate AI report");
  }

  return data;
};
