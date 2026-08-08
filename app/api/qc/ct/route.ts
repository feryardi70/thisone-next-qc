import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { precheck } from "@/app/lib/precheck";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";
import { readDataCtByUserEmail } from "@/app/DAL/repository/ct-repository";

export async function GET(request: Request) {
  const referer = request.headers.get("referer");
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get(csrfTokenName)?.value;
  const sessionToken = (await cookies()).get(sessionTokenName)?.value;

  const preCheckResult = precheck(Boolean(refererCheck), csrfToken, sessionToken);

  if (preCheckResult.status !== 200) {
    return NextResponse.json(preCheckResult.body, {
      status: preCheckResult.status,
    });
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "bad request: email is required" }, { status: 400 });
  }

  const qcData = await readDataCtByUserEmail(email);

  return NextResponse.json(qcData, { status: 200 });
}
