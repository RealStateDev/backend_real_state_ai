"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import BackdropCus from "@/components/ui/commons/BackdropCus";
import InputTextCom from "@/components/ui/commons/InputTextCom";
import InputPassCom from "@/components/ui/commons/InputPassCom";
import loginUserClientService from "@/services/loginUserClientService";


type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");   // ⬅️ nuevo

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setFormError("");
    setIsLoading(true);

    try {
      await loginUserClientService({
        email: data.email,
        password: data.password,
      });
      
      router.push("/homePage");
      setIsLoading(false);
    } catch (error: any) {
      setFormError(error.message || "Credenciales incorrectas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <InputTextCom
              id="email"
              type="email"
              placeholder="Correo electrónico"
              labelText="Correo electrónico"
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <InputPassCom
            id="password"
            labelText="Contraseña"
            {...register("password", { required: "Este campo es obligatorio" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Olvidé mi contraseña
            </a>
          </div>

          {/* ⛔ Mensaje de error global */}
          {formError && (
            <p className="text-center text-sm text-red-600 mb-4">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tiene una cuenta?{" "}
          <Link href="/registerPage" className="text-blue-600 hover:underline">
            Registrarse
          </Link>
        </p>
      </div>

      <BackdropCus color="#155dfc" open={isLoading} />
    </main>
  );
}
