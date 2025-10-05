import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { precheck } from "@/app/lib/precheck";
import { readDataRadByUserIdnSNNumber } from "@/app/DAL/repository/radiografi-repository";

export async function GET(request: Request, { params }: { params: { id_user: number } }) {
  const referer = request.headers.get('referer');
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get("authjs.csrf-token")?.value;
  const token = (await cookies()).get("authjs.session-token")?.value;

  const preCheckResult = precheck(refererCheck, csrfToken, token);
  console.log(preCheckResult);

  if (preCheckResult.status !== 200){
    return NextResponse.json(preCheckResult.body, { status: preCheckResult.status });
  }

  const { id_user } = await params;
  const { searchParams } = new URL(request.url);
  const No_Seri = searchParams.get("No_Seri");
  //console.log("ID USER (API):", id_user);
  //console.log("No Seri (API):", No_Seri);

  if (!id_user) {
    return NextResponse.json({ error: "bad request: id_user is required" }, { status: 400 });
  }

  if (!No_Seri) {
    return NextResponse.json({ error: "bad request: No_Seri is required" }, { status: 400 });
  }

  const qcData = await readDataRadByUserIdnSNNumber(id_user, No_Seri);
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
}