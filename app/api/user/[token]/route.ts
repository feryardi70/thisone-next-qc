import { verifyToken } from "@/app/lib/generateToken";
import { randstr } from "@/app/lib/randstr";

type Params = Promise<{ token: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {
    const params = await segmentData.params;
    const token = params.token;

    if (!token) {
        return new Response(JSON.stringify({ error: "bad request: token is required" }), { status: 400 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return new Response(JSON.stringify({ error: "token was expired" }), { status: 400 });
    }

    const response = await fetch(`http://localhost:8000/user/verify/${token}`);
    const status = await response.json();
    console.log(status);
    const dbId = status.data[0].id_user;
    const dbToken = status.data[0].database_userId;

    if (token !== dbToken) {
        return new Response(JSON.stringify({ error: "invalid token" }), { status: 400 });
    }

    const databaseId = randstr();
    const verification = 'yes';
    const payload = {
        id_user: dbId,
        database_userId: databaseId,
        verification,
    }

    const updateResponse = await fetch(`http://localhost:8000/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const updateData = await updateResponse.json();
    
    if (!updateData || updateData.error) {
        return new Response(JSON.stringify({ error: "User verification failed" }), { status: 500 });
    }

    return new Response(JSON.stringify({ data: verification, msg: "User verified successfully" }), { status: 200 });
}