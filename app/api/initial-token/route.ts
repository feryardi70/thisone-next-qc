import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateToken } from "@/app/lib/generateToken";

export async function GET(request: Request) {
  //console.log(request.referrerPolicy);
  const msg = request.referrerPolicy;
  const token = generateToken();

  (await cookies()).set({
    name: "authToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 15,
  });

  // If user is found, return the user data
  return NextResponse.json({ msg: msg }, { status: 200 });
}