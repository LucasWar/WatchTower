"use client";

import { useAuth } from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import z from "zod";


export function useLoginController() {
  const router = useRouter();
  const schema = z.object({
    email: z.email('Email inválido').nonempty(),
    password: z.string().nonempty().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  })

  type formData = z.infer<typeof schema>

  const { register, formState: {errors}, handleSubmit: handleLoginUserForm } = useForm<formData>({
    resolver: zodResolver(schema)
  })

  const { signin } = useAuth()
 
  const { mutateAsync, isPending } = useLogin()

  const handleSubmit = handleLoginUserForm(async (credentials: formData) => {
    try{
      const { accessToken } = await mutateAsync(credentials)
      signin(accessToken)
      router.replace("/dashboard");
      router.refresh();
    }
    catch(error) {
      console.log(error)
    }
  })


  return {
    register,
    errors,
    handleSubmit,
    isPending
  }
}