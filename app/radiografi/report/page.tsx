import getSession from "@/app/action/session";
import ReportPerMachine from "@/app/components/report";
import { redirect } from "next/navigation";

export default async function ReportingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const { id_spesifikasi, id_user } = await searchParams;
  const payloadQueryParams = {
    spesifikasiId: parseInt(id_spesifikasi as string, 10),
    email: session.user?.email as string,
  }

  return <div>
    <ReportPerMachine payloadQueryParams={payloadQueryParams} />
  </div>;
}
