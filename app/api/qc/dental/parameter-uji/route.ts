import { NextResponse } from "next/server";
import { insertDataUjiDentalIntraoral } from "@/app/DAL/service/parameter-uji-dental-service";
import { editDataUjiDentalIntraoralByIdParameter } from "@/app/DAL/service/parameter-uji-dental-service";
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

  const { Kolimasi_deltaX, Akurasi_kV, Akurasi_waktu, Linearitas, Reproduksibilitas, Reproduksibilitas_kV, Reproduksibilitas_waktu, HVL, Tanggal_uji, id_user, id_spesifikasi } = await request.json();

  const callbackData = {
    id_user,
    id_spesifikasi,
  };

  const result = await insertDataUjiDentalIntraoral(Kolimasi_deltaX, Akurasi_kV, Akurasi_waktu, Linearitas, Reproduksibilitas, Reproduksibilitas_kV, Reproduksibilitas_waktu, HVL, Tanggal_uji, id_user, id_spesifikasi);

  if (result.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json({ data: callbackData, msg: "successfully adding data" }, { status: 200 });
}

export async function PATCH(request: Request) {
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

  const { id_parameter, Kolimasi_deltaX, Akurasi_kV, Akurasi_waktu, Linearitas, Reproduksibilitas, Reproduksibilitas_kV, Reproduksibilitas_waktu, HVL, Tanggal_uji, id_user, id_spesifikasi } = await request.json();

  const callbackData = {
    id_user,
    id_spesifikasi,
  };

  const updateResponse = await editDataUjiDentalIntraoralByIdParameter(
    Kolimasi_deltaX,
    Akurasi_kV,
    Akurasi_waktu,
    Linearitas,
    Reproduksibilitas,
    Reproduksibilitas_kV,
    Reproduksibilitas_waktu,
    HVL,
    Tanggal_uji,
    id_user,
    id_spesifikasi,
    id_parameter
  );

  if (updateResponse.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json({ data: callbackData, msg: "successfully edit data" }, { status: 200 });
}
