"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type formData = {
  email: string;
  password: string;
};

export const signInCredentials = async (formData: formData) => {
  const { email, password } = formData;

  try {
    await signIn("credentials", { email, password, redirect: false });
    //console.log("Response from signIn:", result);
  } catch (err) {
    if (err instanceof AuthError) {
      if (err.type === "CredentialsSignin") {
        // Pesan custom yang dilempar di authorize()
        const cleanMessage = err.message.replace(/\. Read more.*/, "").trim();
        return cleanMessage;
      }
      return "Authentication failed";
    }
    throw err;
  }
};