import { api } from "@/lib/api";

export async function Logout(){
  await api.post('/logout')
}