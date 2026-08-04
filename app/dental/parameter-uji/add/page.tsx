import getSession from "@/app/action/session";
import AddNewDataUjiDentalIntraoralForm from "@/app/components/dental/FormAddDataUjiDentalIntraoral";
import { redirect } from "next/navigation";

export default async function DaftarPesawatDentalParameterUjiAddPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email;
  const { id_spesifikasi, id_user } = await searchParams;

  const payloadQueryParams = {
    spesifikasiId: parseInt(id_spesifikasi as string, 10),
    userId: parseInt(id_user as string, 10),
    email,
  };

  return (
    <div>
      <AddNewDataUjiDentalIntraoralForm payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
