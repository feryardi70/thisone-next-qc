import getSession from "@/app/action/session";
import AddNewDataDentalForm from "@/app/components/dental/FormAddDataDental";
import { redirect } from "next/navigation";

export default async function DaftarPesawatDentalPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email;

  const { id_user } = await searchParams;
  const payloadQueryParams = {
    userId: parseInt(id_user as string, 10),
    email,
  };

  return (
    <div>
      <AddNewDataDentalForm payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
