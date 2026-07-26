import { NextResponse } from "next/server";
import { insertDataUjiFlo } from "@/app/DAL/service/parameter-uji-flo-service";
//import { editDataUjiByIdParameter } from "@/app/DAL/service/parameter-uji-service";
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

  const {
    Kolimasi_deltaX,
    Kolimasi_deltaY,
    Titik_pusat,
    Akurasi_kV,
    Waktu_Fluoroskopik,
    HVL,
    HVL_80,
    Esd,
    Dmax,
    Dmax_high,
    Input_II_a,
    Input_II_b,
    Input_II_c,
    Low_contrast,
    High_contrast_d1,
    High_contrast_d2,
    High_contrast_d3,
    High_contrast_d4,
    High_contrast_d5,
    High_contrast_d6,
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  } = await request.json();

  const callbackData = {
    id_user,
    id_spesifikasi,
  };

  const result = await insertDataUjiFlo(
    Kolimasi_deltaX,
    Kolimasi_deltaY,
    Titik_pusat,
    Akurasi_kV,
    Waktu_Fluoroskopik,
    HVL,
    HVL_80,
    Esd,
    Dmax,
    Dmax_high,
    Input_II_a,
    Input_II_b,
    Input_II_c,
    Low_contrast,
    High_contrast_d1,
    High_contrast_d2,
    High_contrast_d3,
    High_contrast_d4,
    High_contrast_d5,
    High_contrast_d6,
    Tanggal_uji,
    id_user,
    id_spesifikasi
  );

  if (result.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json({ data: callbackData, msg: "successfully adding data" }, { status: 200 });
}
