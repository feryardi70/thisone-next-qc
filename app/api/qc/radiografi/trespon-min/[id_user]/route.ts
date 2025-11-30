import { externalApiUrl, csrfTokenName, sessionTokenName } from "@/app/lib/constant";
import { precheck } from "@/app/lib/precheck";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type Params = Promise<{ id_user: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {
  const referer = request.headers.get("referer");
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get(csrfTokenName)?.value;
  const token = (await cookies()).get(sessionTokenName)?.value;

  const preCheckResult = precheck(refererCheck, csrfToken, token);
  console.log(preCheckResult);

  if (preCheckResult.status !== 200) {
    return NextResponse.json(preCheckResult.body, {
      status: preCheckResult.status,
    });
  }
    
  const params = await segmentData.params;
  const id_user = params.id_user;
  const { searchParams } = new URL(request.url);
  const No_Seri = searchParams.get("No_Seri");

  if (!id_user) {
    return NextResponse.json({ error: "bad request: id_user is required" }, { status: 400 });
  }

  if (!No_Seri) {
    return NextResponse.json({ error: "bad request: No_Seri is required" }, { status: 400 });
  }

  const response = await fetch(`${externalApiUrl}/qc-data-radiografi/trespon-min?id_user=${id_user}&No_Seri=${No_Seri}`);
  //console.log(response);
  const qcData = await response.json();
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
}