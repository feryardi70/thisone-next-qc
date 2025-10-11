import DashboardRad from "@/app/components/dashboardRad";
import getSession from "@/app/action/session";
import { redirect } from "next/navigation";

export default async function DashboardRadPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;
  const { id, No_Seri } = resolvedSearchParams;
  //console.log("ID USER:", id);
  //console.log("No Seri:", No_Seri);
  const payloadQueryParams = {
    id_user: parseInt(id as string, 10),
    No_Seri,
  }

  return (
    <div>
      <DashboardRad payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
