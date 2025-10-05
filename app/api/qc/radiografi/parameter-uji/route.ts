import { NextResponse } from "next/server";
import { insertDataUji } from "@/app/DAL/service/parameter-uji-service";
import { editDataUjiByIdParameter } from "@/app/DAL/service/parameter-uji-service";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";

export async function POST(request: Request) {
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

  const {
    Iluminasi,
    Kolimasi_deltaX,
    Kolimasi_deltaY,
    Akurasi_kV,
    Akurasi_waktu,
    Linearitas,
    Reproduksibilitas,
    HVL,
    Kebocoran,
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  } = await request.json();
  //console.log('body.1value', id_user);
  const callbackData = {
    id_user,
    id_spesifikasi,
  };

  const result = await insertDataUji(
    Iluminasi,
    Kolimasi_deltaX,
    Kolimasi_deltaY,
    Akurasi_kV,
    Akurasi_waktu,
    Linearitas,
    Reproduksibilitas,
    HVL,
    Kebocoran,
    Tanggal_uji,
    id_user,
    id_spesifikasi
  );

  if (result.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json(
    { data: callbackData, msg: "successfully adding data" },
    { status: 200 }
  );
}

export async function PATCH(request: Request) {
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

  const {
    id_parameter,
    Iluminasi,
    Kolimasi_deltaX,
    Kolimasi_deltaY,
    Akurasi_kV,
    Akurasi_waktu,
    Linearitas,
    Reproduksibilitas,
    HVL,
    Kebocoran,
    Tanggal_uji,
    id_user,
    id_spesifikasi,
  } = await request.json();
  //console.log('body.1value', id_user);

  const callbackData = {
    id_user,
    id_spesifikasi,
  };

  const updateResponse = await editDataUjiByIdParameter(
    Iluminasi,
    Kolimasi_deltaX,
    Kolimasi_deltaY,
    Akurasi_kV,
    Akurasi_waktu,
    Linearitas,
    Reproduksibilitas,
    HVL,
    Kebocoran,
    Tanggal_uji,
    id_user,
    id_spesifikasi,
    id_parameter
  );

  if (updateResponse.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json(
    { data: callbackData, msg: "successfully edit data" },
    { status: 200 }
  );
}
