import DashboardKolim from "@/app/components/fluoroskopi/dashboardKolim";
import getSession from "@/app/action/session";
import { redirect } from "next/navigation";

export default async function DashboardFluoroKolimPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email;

  //const resolvedSearchParams = await searchParams;
  //const { id_user, No_Seri } = resolvedSearchParams;

  // const payloadQueryParams = {
  //   id_user,
  //   No_Seri,
  //   email,
  // };

  return (
    <div>
      <DashboardKolim email={email} />
    </div>
  );
}
