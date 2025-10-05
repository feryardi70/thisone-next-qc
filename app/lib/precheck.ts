import { verifyAuthToken } from "./generateToken";

export const precheck = (refererCheck: boolean | undefined, csrfToken: string | undefined, token: string | undefined) => {
    if(!refererCheck || !csrfToken || !token){
        return { status: 401, body: { error: "bad request, undefined some variabel" } };
    }

    const decoded = verifyAuthToken

    if(!decoded){
        return { status: 401, body: { error: "bad request, expired token detected" } };
    }

    return { status: 200, body: { error: "none" } };
}