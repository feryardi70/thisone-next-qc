import getSession from "@/app/action/session";
import AddNewDataFloForm from "@/app/components/fluoroskopi/FormAddDataFlo";
import { redirect } from "next/navigation";

export default async function AddPesawatFluoroskopiPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getSession();

  if (!session) {
    // If no session, redirect to login page
    redirect("/login");
  }

  const email = session.user.email;

  const { id_user } = await searchParams;
  const payloadQueryParams = {
    userId: parseInt(id_user as string, 10),
    email: email,
  };

  return (
    <div>
      <AddNewDataFloForm payloadQueryParams={payloadQueryParams} />
    </div>
  );
}
