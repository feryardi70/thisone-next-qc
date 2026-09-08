import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { precheck } from "@/app/lib/precheck";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";
import { fetchReportDataServer, fetchMachineMetaBySpecIdServer } from "@/app/DAL/repository/report-repository";
export async function POST(request: Request) {
  const referer = request.headers.get("referer");
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get(csrfTokenName)?.value;
  const sessionToken = (await cookies()).get(sessionTokenName)?.value;

  const preCheckResult = precheck(Boolean(refererCheck), csrfToken, sessionToken);
  if (preCheckResult.status !== 200) {
    return NextResponse.json(preCheckResult.body, { status: preCheckResult.status });
  }

  let body: { prompt?: string; id_user?: number; id_spesifikasi?: number; start_date?: string; end_date?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { prompt, id_user, id_spesifikasi, start_date, end_date } = body;

  if (!prompt || !id_user || !id_spesifikasi || !start_date || !end_date) {
    return NextResponse.json({ error: "Missing required fields: prompt, id_user, id_spesifikasi, start_date, end_date" }, { status: 400 });
  }

  let dataUji: unknown[] = [];
  let machine: Record<string, unknown> | null = null;

  try {
    const [reportPayload, machinePayload] = await Promise.all([fetchReportDataServer(id_user, id_spesifikasi, start_date, end_date), fetchMachineMetaBySpecIdServer(id_spesifikasi)]);
    dataUji = Array.isArray(reportPayload?.data) ? reportPayload.data : [];
    machine = machinePayload?.data?.[0] ?? null;
  } catch (err) {
    console.error("Failed to fetch QC data:", err);
    return NextResponse.json({ error: "Failed to fetch QC data" }, { status: 502 });
  }

  if (dataUji.length === 0) {
    return NextResponse.json({ error: "No QC data found for the selected date range" }, { status: 404 });
  }

  const machineInfo = machine ? `Machine: ${machine.Merk ?? "N/A"} ${machine.Model ?? "N/A"} (Serial: ${machine.No_Seri ?? "N/A"})` : "Machine: Unknown";

  const fullPrompt = `${prompt}

---
${machineInfo}
Date range: ${start_date} to ${end_date}

QC Test Results:
${JSON.stringify(dataUji, null, 2)}
`;

  try {
    const aiResponse = await fetch(`${process.env.LOCAL_BASE_URL_AI}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOCAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "coding",
        messages: [{ role: "user", content: fullPrompt }],
        stream: false,
      }),
    });
    //console.log("aiResponse:", aiResponse);

    if (!aiResponse.ok) {
      const errBody = await aiResponse.text();
      console.error("Local AI error:", errBody);
      return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
    }

    const aiData = await aiResponse.json();
    //console.log("aiData:", aiData);
    const text = aiData.choices?.[0]?.message?.content ?? "";
    console.log("AI generated text:", text);

    return NextResponse.json({ markdown: text, qcData: dataUji, machine }, { status: 200 });
  } catch (err) {
    console.error("Local AI error:", err);
    return NextResponse.json({ error: "AI generation failed" }, { status: 502 });
  }
}
