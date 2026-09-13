import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { precheck } from "@/app/lib/precheck";
import { readDataRadByUserEmail } from "@/app/DAL/repository/radiografi-repository";
import { csrfTokenName, sessionTokenName } from "@/app/lib/constant";
//import { getToken } from "next-auth/jwt";
//import getSession from "@/app/action/session";

type Params = Promise<{ id_spesifikasi: string | number }>;

export async function GET(request: Request) {
  const referer = request.headers.get("referer");
  const refererCheck = referer?.includes(process.env.NEXT_PUBLIC_APP_URL!);
  const csrfToken = (await cookies()).get(csrfTokenName)?.value;
  const sessionToken = (await cookies()).get(sessionTokenName)?.value;
  //const session = await getSession();
  //console.log("Session id from GET request:", session?.user?.dbid);
  //console.log("Session email from GET request:", session?.user?.email);
  //console.log("Session name from GET request:", session?.user?.name);
  // console.log({
  //   refererCheck,
  //   csrfRaw: (await cookies()).get(csrfTokenName),
  //   sessionRaw: (await cookies()).get(sessionTokenName),
  //   csrfToken,
  //   sessionToken,
  //   runtime: process.env.NEXT_RUNTIME,
  // });

  const preCheckResult = precheck(Boolean(refererCheck), csrfToken, sessionToken);
  //console.log("Precheck result:", preCheckResult);

  if (preCheckResult.status !== 200) {
    return NextResponse.json(preCheckResult.body, {
      status: preCheckResult.status,
    });
  }

  // const secret = process.env.AUTH_SECRET!;
  // const token = await getToken({ req: request, secret });
  // //console.log("Token from NextAuth:", token);

  //   if (!token) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "bad request: email is required" }, { status: 400 });
  }

  const qcData = await readDataRadByUserEmail(email);
  //console.log(qcData);

  return NextResponse.json(qcData, { status: 200 });
}
