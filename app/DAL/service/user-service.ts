import { getUserByEmailFromExtApi } from "../repository/user-repository";

export const fetchUserByEmail = async (authHeader: string | null, email: string | null) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { status: 401, body: { error: "Unauthorized: Missing or invalid token" } };
    }

    const token = authHeader.split(" ")[1];

    if (!token || token !== process.env.INTERNAL_API_KEY) {
        return { status: 401, body: { error: "Unauthorized: Invalid token" } };
    }
    
    if (!email) {
        return { status: 400, body: { error: "bad request: email is required" } };
    }

    const response = await getUserByEmailFromExtApi(email);
    const data = await response.json();

    if (!data || data.data.length === 0) {
        return { status: 404, body: { error: "User not found" } };
    }

    return { status: 200, body: data.data[0] };
}