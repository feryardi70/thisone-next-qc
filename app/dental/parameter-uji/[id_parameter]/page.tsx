import getSession from "@/app/action/session";
import EditDataUjiDentalIntraoralComponent from "@/app/components/dental/FormEditDataUjiDentalIntraoral";
import { redirect } from "next/navigation";

export default async function DaftarPesawatRadiografiPage({ params }: { params: Promise<{ id_parameter: string }> }) {
  const session = await getSession();
  const { id_parameter } = await params;

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  const payloadQueryParams = {
    parameterId: parseInt(id_parameter as string, 10),
    email: email,
  };

  return (
    <div>
      <EditDataUjiDentalIntraoralComponent payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
