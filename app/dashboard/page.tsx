// "use client";

//import AuthLayer from "../components/auth-layer";
import Dashboard from "../components/dashboard";
import getSession from "../action/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  return (
    <div>
      <Dashboard email={email} />
    </div>
  );
}
