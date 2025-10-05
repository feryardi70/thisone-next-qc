import { NextResponse } from "next/server";
import { sanitizeAndValidateEmail, sanitizeEmail, sanitizeInput } from "@/app/lib/sanitizeInput";
import { cookies } from "next/headers";
import { generateToken, verifyToken } from "@/app/lib/generateToken";
import { hashSync } from "bcrypt-ts";
import { sendVerificationEmail } from "@/app/lib/sendVerifEmail";
import { externalApiUrl } from "@/app/lib/constant";
import { fetchUserByEmail } from "@/app/DAL/service/user-service";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  const result = await fetchUserByEmail(authHeader, email);

  return NextResponse.json(result.body, { status: result.status });
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "bad request: email and password are required" }, { status: 400 });
  }

  const token = (await cookies()).get("authToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "unauthorized: authToken cookie is missing" }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "unauthorized: invalid authToken" }, { status: 401 });
  }

  const isValidEmail = sanitizeAndValidateEmail(email);
  if (!isValidEmail) {
    return NextResponse.json({ error: "bad request: invalid email format" }, { status: 400 });
  }

  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedPassword = sanitizeInput(password);
  //console.log(typeof sanitizedEmail);
  const hashedPassword = hashSync(sanitizedPassword, 10);
  const registerToken = generateToken();

  const payload = {
    email: sanitizedEmail,
    password: hashedPassword,
    token: registerToken,
  }

  const response = await fetch(`${externalApiUrl}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!data || data.error) {
    return NextResponse.json({ error: "User registration failed" }, { status: 500 });
  }

  // Send verification email
  await sendVerificationEmail(email, registerToken);

  return NextResponse.json({msg: "User registered successfully" }, { status: 201 });
}