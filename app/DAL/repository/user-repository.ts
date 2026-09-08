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
};

export const getUserByEmailFromExtApi = async (email: string) => {
  const response = await fetch(`${externalApiUrl}/user/${email}`);
  //const data = await response.json();
  //console.log("Response from getUserByEmail:", data);
  return response;
};

export const saveGoogleUserToExtApi = async (payload: { database_userId: string; email: string; verification: string; role: string }) => {
  const response = await fetch(`${externalApiUrl}/user/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const checkUserByEmail = async (email: string) => {
  const response = await fetch(`${baseUrl}/user/check?email=${email}`);
  //console.log("Response from getUserByEmail:", response);
  return response;
};

export const createNewUser = async (payload: { email: string; password: string }) => {
  const response = await fetch(`${baseUrl}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};

export const insertUser = async (payload: { email: string | null; password: string; token: string }) => {
  const response = await fetch(`${externalApiUrl}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};

export const updateUser = async (payload: { id_user: number; database_userId: string; verification: string }) => {
  const response = await fetch(`${externalApiUrl}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response;
};
