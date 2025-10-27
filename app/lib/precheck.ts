export const precheck = (refererCheck: boolean | undefined, csrfToken: string | undefined, token: string | undefined) => {
    console.log("INSIDE precheck:", { refererCheck, csrfToken, token });
    
    if(!refererCheck || !csrfToken || !token){
        console.log("→ FAIL precheck condition");
        return { status: 401, body: { error: "bad request, undefined some variabel" } };
    }

    return { status: 200, body: { error: "none" } };
}