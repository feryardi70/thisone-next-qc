//import DashboardKolim from "@/app/components/dental/dashboardKolim";
import getSession from "@/app/action/session";
import { redirect } from "next/navigation";
//import DashboardCT from "../../../components/ct-scan/dashboard;
import DashboardCT from "@/app/components/ct-scan/dashboard";

export default async function DashboardCtHvlPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email;

  return (
    <div>
      <DashboardCT email={email} />
    </div>
  );
}
