"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import BackdropCus from "@/components/ui/commons/BackdropCus";
import InputTextCom from "@/components/ui/commons/InputTextCom";
import InputPassCom from "@/components/ui/commons/InputPassCom";
import { Inputs } from "@/types/generalTypes";
import { registeruserService } from "@/services/registeruserService";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try 
    {
      const register = await registeruserService({nombre:data.name,email:data.email,password:data.password});
      console.log(register);
      setTimeout(() => {
        // Guardar el nombre del usuario en localStorage
        localStorage.setItem("userName", data.name);
        router.push("/loginPage");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-sm text-gray-500 mt-1">
            ¡Bienvenido! Por favor completa la información para registrarte.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <>
            <InputTextCom
              id="name"
              labelText="Nombre"
              type="text"
              placeholder="Tu nombre completo"
              {...register("name", { required: "Este campo es obligatorio" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </>
          {/* Email */}
          <>
            <InputTextCom
              id="email"
              labelText="Correo electrónico"
              type="email"
              placeholder="usuario@ejemplo.com"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </>
          {/* Contraseña */}
          <>
            <InputPassCom
              id="password"
              labelText="Contraseña"
              {...register("password", {
                required: "Este campo es obligatorio",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                  message:
                    "Debe tener 8+ caracteres, una mayúscula, un número y un símbolo",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition-colors"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/loginPage" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
      <BackdropCus color="#155dfc" open={isLoading}></BackdropCus>
    </main>
  );
}
