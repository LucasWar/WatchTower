"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginController } from "./loginController";

export default function Login() {
  const { errors, handleSubmit, register } = useLoginController()
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div  className="bg-white  w-1/4 h-1/5 p-8 rounded-sm flex flex-col gap-5">
        <div className="flex font-bold text-xl">
          <h2>Realizar login</h2> 
        </div>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="relative flex flex-col">
            <Input className="h-10" placeholder="E-mail" {...register("email")} />
            {errors.email &&
              <span className="text-red-400 pt-2">{errors.email.message}</span>
            }
          </div>
          <div>
            <Input className="h-10" placeholder="Senha" {...register("password")} />
            {errors.password &&
              <span className="text-red-400 pt-2">{errors.password.message}</span>
            }
          </div>
          <div className="flex items-center justify-center">
            <Button className="w-2/3 h-10">
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}