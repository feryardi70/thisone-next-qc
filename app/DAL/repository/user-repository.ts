import { baseUrl, externalApiUrl } from "@/app/lib/constant";

export const getUserByEmail = async (email: string) => {
  const response = await fetch(`${baseUrl}/user?email=${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
    },
  });
  //console.log("Response from getUserByEmail:", response);
  return response;
}

export const getUserByEmailFromExtApi = async (email: string) => {
  const response = await fetch(`${externalApiUrl}/user/${email}`);
  //console.log("Response from getUserByEmail:", response);
  return response;
}