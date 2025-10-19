import { getUserByEmail } from "@/app/DAL/repository/user-repository";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "bad request: email is required" }, { status: 400 });
  }

  const response = await getUserByEmail(email);
  const data = await response.json();
  //console.log("Data from GET /api/user:", data);

  return NextResponse.json(data.email, { status: 200 });
}