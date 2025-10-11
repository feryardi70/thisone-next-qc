import { NextResponse } from "next/server";
import {
  removeDataUjiByIdParameter,
  readDataUjiByIdParameter,
} from "@/app/DAL/repository/parameter-uji-repository";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";

type Params = Promise<{ id_parameter: string | number }>;

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
  const id_parameter = params.id_parameter;
  //console.log('selectedId =', id_parameter)

  if (!id_parameter) {
    return NextResponse.json(
      { error: "bad request: id is required" },
      { status: 400 }
    );
  }

  const dataUji = await readDataUjiByIdParameter(id_parameter);
  //console.log('data = ', dataUji);

  if (dataUji.data.length == 0) {
    return NextResponse.json(
      { error: "bad request: data uji tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(dataUji, { status: 200 });
}

export async function DELETE(
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
  const id_parameter = params.id_parameter;
  //console.log('selectedId =', id_parameter)

  if (!id_parameter) {
    return NextResponse.json(
      { error: "bad request: id is required" },
      { status: 400 }
    );
  }

  const dataUji = await readDataUjiByIdParameter(id_parameter);
  //const dataUji = await response.json();
  console.log("data = ", dataUji);

  if (dataUji.data.length == 0) {
    return NextResponse.json(
      { error: "bad request: data uji tidak ditemukan" },
      { status: 404 }
    );
  }

  const deletedData = await removeDataUjiByIdParameter(id_parameter);
  console.log(deletedData);

  if (deletedData.data.affectedRows === 1) {
    return NextResponse.json(deletedData, { status: 200 });
  } else {
    return NextResponse.json({ error: "unexpected error" }, { status: 500 });
  }
}
