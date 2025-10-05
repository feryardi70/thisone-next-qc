// "use client";

//import AuthLayer from "../components/auth-layer";
import getSession from "@/app/action/session";
import EditDataUjiComponent from "@/app/components/radiografi/FormEditData";
//import EditDataUjiForm from "@/app/components/radiografi/FormEditData";
import { redirect } from "next/navigation";

interface PageProps {
  params: { id_parameter: string };
}

export default async function DaftarPesawatRadiografiPage({ params }: PageProps) {
  const session = await getSession();
  const { id_parameter } = await params;
  //console.log("id", id);

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  //const { id_spesifikasi, id_user } = await searchParams;
  const payloadQueryParams = {
    parameterId: parseInt(id_parameter as string, 10),
    email: email,
  }

  return <div>
    <EditDataUjiComponent payloadQueryParams={payloadQueryParams} />
  </div>;
}
