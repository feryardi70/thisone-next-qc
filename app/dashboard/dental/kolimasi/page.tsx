import DashboardKolim from "@/app/components/dental/dashboardKolim";
import getSession from "@/app/action/session";
import { redirect } from "next/navigation";

export default async function DashboardDentalKolimPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email;

  return (
    <div>
      <DashboardKolim email={email} />
    </div>
  );
}
