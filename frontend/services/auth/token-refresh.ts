import axios from "axios";

const TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESSE_TOKEN_KEY!;

let refreshPromise: Promise<string> | null = null;

// instância "crua" sem interceptors, só pra não cair em loop
const rawApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export function refreshAccessToken(): Promise<string> {
  if (refreshPromise) {
    // já existe um refresh em andamento, reaproveita
    return refreshPromise;
  }

  refreshPromise = rawApi
    .post("/refresh")
    .then((res) => {
      const newToken = res.data.accessToken;
      localStorage.setItem(TOKEN_KEY, newToken);
      return newToken;
    })
    .catch((err) => {
      localStorage.removeItem(TOKEN_KEY);
      throw err;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
