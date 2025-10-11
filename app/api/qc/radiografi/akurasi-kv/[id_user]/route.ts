import { NextResponse } from "next/server";

type Params = Promise<{ id_user: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params;
  const id_user = params.id_user;
  const { searchParams } = new URL(request.url);
  const No_Seri = searchParams.get("No_Seri");
  //console.log("ID USER (API):", id_user);
  //console.log("No Seri (API):", No_Seri);

  if (!id_user) {
    return NextResponse.json({ error: "bad request: id_user is required" }, { status: 400 });
  }

  if (!No_Seri) {
    return NextResponse.json({ error: "bad request: No_Seri is required" }, { status: 400 });
  }

  const response = await fetch(`http://localhost:8000/qc-data-radiografi/akurasi-kv?id_user=${id_user}&No_Seri=${No_Seri}`);
  //console.log(response);
  const qcData = await response.json();
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
}