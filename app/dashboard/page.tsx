// "use client";

//import AuthLayer from "../components/auth-layer";
import Dashboard from "../components/dashboard";
import getSession from "../action/session";
import UnverifiedEmptyState from "../components/UnverifiedEmptyState";
import { redirect } from "next/navigation";
import { getUserByEmailFromExtApi, saveGoogleUserToExtApi } from "../DAL/repository/user-repository";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ verify?: string }>;
}) {
  const { verify } = await searchParams;
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  let dbVerification: string | undefined;
  try {
    const user = await getUserByEmailFromExtApi(email);
    const userData = await user.json();

    if (userData.data.length === 0) {
      const payload = {
        database_userId: "logon via google",
        email,
        verification: "yes",
        role: "user",
      };

      await saveGoogleUserToExtApi(payload);
      dbVerification = payload.verification;
    } else {
      dbVerification = userData.data[0]?.verification;
    }
  } catch (error) {
    console.error(error ? "Error fetching data" : "Unknown Error");
  }
  //console.log("User data JSON in DashboardPage:", userData);
  const verificationStatus = session.user.verification || dbVerification || "";
  console.log("Verification status in DashboardPage:", verificationStatus);

  if (verificationStatus === "yes") {
    return (
      <div>
        <Dashboard email={email} />
      </div>
    );
  }

  return <UnverifiedEmptyState feedback={verify} />;
}
