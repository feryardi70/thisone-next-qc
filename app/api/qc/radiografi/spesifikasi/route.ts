import { NextResponse } from "next/server";
import {
  readDataRadByIdSpec,
  readDataUjiByUserIdnSpecIdFromExtApi,
  removeDataRadByIdSpec,
} from "@/app/DAL/repository/spec-repository";
import {
  editDataRadByIdSpec,
  insertDataRad,
} from "@/app/DAL/service/spec-service";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";

export async function GET(request: Request) {
  //const { spesifikasiId } = await params;
  //console.log(spesifikasiId);
  const { searchParams } = new URL(request.url);
  const id_spesifikasi = searchParams.get("id_spesifikasi");
  const id_user = searchParams.get("id_user");
  //console.log("specsId", id_user);
  //console.log("userId", id_user);

  if (!id_spesifikasi) {
    return NextResponse.json(
      { error: "bad request: id_user is required" },
      { status: 400 }
    );
  }

  if (!id_user) {
    return NextResponse.json(
      { error: "bad request: id_user is required" },
      { status: 400 }
    );
  }

  const qcData = await readDataUjiByUserIdnSpecIdFromExtApi(
    id_user,
    id_spesifikasi
  );
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
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
  
  const { id_spesifikasi, Merk, Model, No_Seri, jenis_pesawat, id_user } =
    await request.json();
  //console.log('body.1value', id_user);

  const callbackData = {
    No_Seri,
    id_user,
  };

  const updateResponse = await editDataRadByIdSpec(
    Merk,
    Model,
    No_Seri,
    jenis_pesawat,
    id_user,
    id_spesifikasi
  );

  if (updateResponse.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json(
    { data: callbackData, msg: "successfully edit data" },
    { status: 200 }
  );
}

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

  const result = await insertDataRad(
    jenis_pesawat,
    Merk,
    Model,
    No_Seri,
    id_user
  );

  if (result.success !== true) {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }

  return NextResponse.json(
    { data: callbackData, msg: "successfully adding data" },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const id_spesifikasi = searchParams.get("id_spesifikasi");
  console.log("specsId", id_spesifikasi);

  if (!id_spesifikasi) {
    return NextResponse.json(
      { error: "bad request: id is required" },
      { status: 400 }
    );
  }

  const dataUji = await readDataRadByIdSpec(id_spesifikasi);
  //const dataUji = await response.json();
  console.log("data = ", dataUji);

  if (dataUji.data.length == 0) {
    return NextResponse.json(
      { error: "bad request: data uji tidak ditemukan" },
      { status: 404 }
    );
  }

  const deletedData = await removeDataRadByIdSpec(id_spesifikasi);
  console.log(deletedData);

  if (deletedData.data.affectedRows === 1) {
    return NextResponse.json(deletedData, { status: 200 });
  } else {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }
}
