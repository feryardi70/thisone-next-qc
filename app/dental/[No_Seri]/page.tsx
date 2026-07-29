import getSession from "@/app/action/session";
import EditDataDentalIntraoralForm from "@/app/feature/components/FormEditDataDentalIntraoral";
import { redirect } from "next/navigation";

export default async function DentalEditPage({ params }: { params: Promise<{ No_Seri: string }> }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { No_Seri } = await params;
  const email = session.user.email;

  const payloadQueryParams = {
    No_Seri,
    email,
  };

  return (
    <div>
      <EditDataDentalIntraoralForm payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
