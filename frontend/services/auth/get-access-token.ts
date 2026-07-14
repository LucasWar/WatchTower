export function getAccessToken(): string | null {
  const TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESSE_TOKEN_KEY!;
  return localStorage.getItem(TOKEN_KEY);
}