export const precheck = (refererCheck: boolean | undefined, csrfToken: string | undefined, token: string | undefined) => {
    console.log("precheck types:", {
      refererCheckType: typeof refererCheck,
      csrfTokenType: typeof csrfToken,
      tokenType: typeof token,
    });
    
    if (!refererCheck || !csrfToken?.length || !token?.length) {
      return {
        status: 401,
        body: { error: "bad request, undefined some variable" },
      };
    }

    return { status: 200, body: { error: "none" } };
}