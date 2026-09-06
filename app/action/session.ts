"use server";

import { Session } from "next-auth";
import { auth } from "../../auth";

const getSession = async (): Promise<Session | null> => {
  const session = await auth();
  return session ?? null;
};

export default getSession;
