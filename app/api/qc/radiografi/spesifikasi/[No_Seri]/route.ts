import { NextResponse } from "next/server";
import { readDataRadBySN } from "@/app/DAL/repository/spec-repository";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";

type Params = Promise<{ No_Seri: string }>;

export async function GET(
  request: Request,
  segmentData: { params: Params }
) {
  const referer = request.headers.get("referer");
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get("authjs.csrf-token")?.value;
  const token = (await cookies()).get("authjs.session-token")?.value;

  const preCheckResult = precheck(refererCheck, csrfToken, token);

  if (preCheckResult.status !== 200) {
    return NextResponse.json(preCheckResult.body, {
      status: preCheckResult.status,
    });
  }

  const params = await segmentData.params;
  const No_Seri = params.No_Seri;
  console.log("SN =", No_Seri);

  if (!No_Seri) {
    return NextResponse.json(
      { error: "bad request: serial number is required" },
      { status: 400 }
    );
  }

  const dataUji = await readDataRadBySN(No_Seri);
  //console.log('data = ', dataUji);

  if (dataUji.data.length == 0) {
    return NextResponse.json(
      { error: "bad request: data uji tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(dataUji, { status: 200 });
}
