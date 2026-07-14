import { AuthService } from "@/services/auth";
import { CredentialLogin } from "@/services/auth/login";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: CredentialLogin) => {
      return await AuthService.Login(credentials)
    }
  })
}