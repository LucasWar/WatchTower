import { api } from "@/lib/api";

export interface CredentialLogin {
  email: string,
  password: string
}

export interface LoginResponse {
  accessToken: string,
}

export async function Login(credentials: CredentialLogin){
  const {data} = await api.post<LoginResponse>('/singIn',credentials);
  return data
}