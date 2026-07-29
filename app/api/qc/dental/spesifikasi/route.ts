import { NextResponse } from "next/server";
import { insertDataDentalIntraoral } from "@/app/DAL/service/spec-service";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";

export async function POST(request: Request) {
  const referer = request.headers.get("referer");
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get(csrfTokenName)?.value;
  const token = (await cookies()).get(sessionTokenName)?.value;

  const preCheckResult = precheck(refererCheck, csrfToken, token);

  if (preCheckResult.status !== 200) {
    return NextResponse.json(preCheckResult.body, {
      status: preCheckResult.status,
    });
  }

  const { jenis_pesawat, Merk, Model, No_Seri, id_user } = await request.json();
  const callbackData = {
    No_Seri,
    id_user,
  };

  const result = await insertDataDentalIntraoral(jenis_pesawat, Merk, Model, No_Seri, id_user);

  if (result.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json({ data: callbackData, msg: "successfully adding data" }, { status: 200 });
}
