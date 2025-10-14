import getSession from "@/app/action/session";
import { redirect } from "next/navigation";
import DashboardRadAkurWaktu from "@/app/components/radiografi/dashboardTimeAccu";

export default async function DashboardRadAkurWaktuPage({
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
  const { id_user, No_Seri } = resolvedSearchParams;
  
  const payloadQueryParams = {
    id_user: parseInt(id_user as string, 10),
    No_Seri,
  }

  return (
    <div>
      <DashboardRadAkurWaktu payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
