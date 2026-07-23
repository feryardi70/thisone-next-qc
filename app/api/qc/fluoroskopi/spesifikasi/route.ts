import { NextResponse } from "next/server";
import { insertDataFlo } from "@/app/DAL/service/spec-service";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";
import { readDataUjiByUserIdnSpecIdFromExtApi } from "@/app/DAL/repository/fluoroskopi-spec-repository";

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
  //console.log('body.1value', id_user);
  const callbackData = {
    No_Seri,
    id_user,
  };

  const result = await insertDataFlo(jenis_pesawat, Merk, Model, No_Seri, id_user);

  if (result.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json({ data: callbackData, msg: "successfully adding data" }, { status: 200 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id_spesifikasi = searchParams.get("id_spesifikasi");
  const id_user = searchParams.get("id_user");

  if (!id_spesifikasi) {
    return NextResponse.json({ error: "bad request: id_user is required" }, { status: 400 });
  }

  if (!id_user) {
    return NextResponse.json({ error: "bad request: id_user is required" }, { status: 400 });
  }

  const qcData = await readDataUjiByUserIdnSpecIdFromExtApi(id_user, id_spesifikasi);
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
}
