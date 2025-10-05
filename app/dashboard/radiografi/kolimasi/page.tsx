import DashboardKolim from "@/app/components/radiografi/dashboardKolim";
import getSession from "@/app/action/session";
import { redirect } from "next/navigation";

export default async function DashboardRadKolimPage({
  searchParams,
  }: {
  searchParams: { [key: string]: string | string[] | undefined };
  }) {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const { id_user, No_Seri } = await searchParams;
  //console.log("ID USER:", id_user);
  //console.log("No Seri:", No_Seri);
  const payloadQueryParams = {
    id_user: parseInt(id_user as string, 10),
    No_Seri,
  }

  return (
    <div>
      <DashboardKolim payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
