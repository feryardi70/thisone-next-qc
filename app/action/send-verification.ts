"use server";

import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { generateToken } from "../lib/generateToken";
import { sendVerificationEmail } from "../lib/sendVerifEmail";
import { baseUrl } from "../lib/constant";

export async function sendVerificationAction() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  try {
    const token = generateToken();
    const payload = {
      id: session.user.dbid,
      token,
    };

    // Update the user's verification token in your database here
    const response = await fetch(`${baseUrl}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.status !== 200) {
      const responseData = await response.json();
      console.log(responseData.error);
      redirect("/dashboard?verify=error");
    }

    await sendVerificationEmail(session.user.email, token);
  } catch (err) {
    console.error("send-verification error:", err);
    redirect("/dashboard?verify=error");
  }

  redirect("/dashboard?verify=sent");
}
