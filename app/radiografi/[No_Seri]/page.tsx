import getSession from "@/app/action/session";
import EditDataRadComponent from "@/app/components/radiografi/FormEditDataRad";
import { redirect } from "next/navigation";

// interface PageProps {
//   params: { No_Seri: string };
// }

export default async function DaftarPesawatRadiografiPage({
  params,
}: {
  params: Promise<{ No_Seri: string }>;
}) {
  const session = await getSession();
  const { No_Seri } = await params;
  console.log("id", No_Seri);
  //console.log("userId", id_user);

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  //const { id_spesifikasi, id_user } = await searchParams;
  const payloadQueryParams = {
    No_Seri: No_Seri,
    email: email,
  }

  return <div>
    <EditDataRadComponent payloadQueryParams={payloadQueryParams} />
  </div>;
}
