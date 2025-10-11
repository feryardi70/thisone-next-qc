export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
export const externalApiUrl = process.env.EXTERNAL_API_URL!;
export const csrfTokenName = process.env.NODE_ENV === 'production' ? '__Host-authjs.csrf-token' : 'authjs.csrf-token';
export const sessionTokenName = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token';