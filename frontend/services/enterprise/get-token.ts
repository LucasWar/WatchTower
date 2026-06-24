import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface GetTokenResponse {
  accessToken: string;
}

export function useGetToken() {
  return useMutation({
    mutationFn: async () => {
      return (await api.post<GetTokenResponse>("/enterprise/token", {
        apiId: process.env.NEXT_PUBLIC_API_ID,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
      })).data;
    }
  })
}