import { baseUrl } from "../lib/constant";

interface VerifyUserPageProps {
  searchParams: {
    token: string;
  };
}

export default async function VerifyUserPage({ searchParams }: VerifyUserPageProps) {
  const { token } = await searchParams;
  console.log("Token:", token);

  const verificationResponse = await fetch(`${baseUrl}/user/${token}`);
  //const status = await verificationResponse.json();

  if (verificationResponse.status !== 200) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Verification Failed
          </h1>
          <p className="mb-4">
            Sorry, we couldn't verify your account. The token may be invalid or
            expired.
          </p>
          <a href="/register" className="text-blue-500 hover:underline">
            Go back to Register
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Verification Succeeded
        </h1>
        <p className="mb-4">Your account has been successfully verified.</p>
        <a href="/login" className="text-blue-500 hover:underline">
          Now, you can continue to Login.
        </a>
      </div>
    </div>
  );
}
