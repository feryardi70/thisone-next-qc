import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { precheck } from "@/app/lib/precheck";
import { readDataRadByUserEmail } from "@/app/DAL/repository/radiografi-repository";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";

type Params = Promise<{ id_spesifikasi: string | number }>;

export async function GET(request: Request) {
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
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "bad request: email is required" },
      { status: 400 }
    );
  }

  const qcData = await readDataRadByUserEmail(email);
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
}

export async function DELETE(
  request: Request,
  segmentData: { params: Params }
) {
  const params = await segmentData.params;
  const id_spesifikasi = params.id_spesifikasi;

  if (!id_spesifikasi) {
    return NextResponse.json(
      { error: "bad request: id_spesifikasi is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `http://localhost:8000/qc-data-radiografi/spesifikasi/${id_spesifikasi}`
  );
  const dataPesawat = await response.json();

  if (dataPesawat.data.length == 0) {
    return NextResponse.json(
      { error: "bad request: data pesawat sinar-x tidak ditemukan" },
      { status: 404 }
    );
  }

  const result = await fetch(
    `http://localhost:8000/qc-data-radiografi/spesifikasi/${id_spesifikasi}`,
    {
      method: "DELETE",
    }
  );
  const deletedData = await result.json();

  return NextResponse.json(deletedData, { status: 200 });
}
