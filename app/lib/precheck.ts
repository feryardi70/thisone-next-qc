export const precheck = (refererCheck: boolean | undefined, csrfToken: string | undefined, token: string | undefined) => {
    if(!refererCheck || !csrfToken || !token){
        return { status: 401, body: { error: "bad request, undefined some variabel" } };
    }

    return { status: 200, body: { error: "none" } };
}