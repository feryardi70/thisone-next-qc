import { NextResponse } from "next/server";
import {
  readDataRadByIdSpec
} from "@/app/DAL/repository/spec-repository";
import { precheck } from "@/app/lib/precheck";
import { cookies } from "next/headers";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";
import { readReportDataFromExtApi } from "@/app/DAL/repository/report-repository";

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
  const id_spesifikasi = searchParams.get("id_spesifikasi");

  if (!id_spesifikasi) {
    return NextResponse.json(
      { error: "bad request: id_user is required" },
      { status: 400 }
    );
  }

  const qcData = await readDataRadByIdSpec(
    id_spesifikasi
  );
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
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
  const { id_user, id_spesifikasi, start_date, end_date } = await request.json();

  const qcData = await readReportDataFromExtApi(
    id_user,
    id_spesifikasi,
    start_date,
    end_date
  );
  //console.log("Fetched data from external API:", qcData);

  return NextResponse.json(qcData, { status: 200 });
}