// "use client";

//import AuthLayer from "../components/auth-layer";
import Dashboard from "../components/dashboard";
import getSession from "../action/session";
import { redirect } from "next/navigation";
import { getUserByEmailFromExtApi, saveGoogleUserToExtApi } from "../DAL/repository/user-repository";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  const user = await getUserByEmailFromExtApi(email);
  const userData = await user.json();
  //console.log("User data JSON in DashboardPage:", userData);

  if (userData.data.length === 0) {
    const payload = {
      database_userId: "logon via google",
      email,
      verification: "yes",
      role: "user",
    }

    await saveGoogleUserToExtApi(payload);
  }

  return (
    <div>
      <Dashboard email={email} />
    </div>
  );
}
