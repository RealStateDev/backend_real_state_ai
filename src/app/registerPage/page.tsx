'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import BackdropCus from "@/components/ui/commons/BackdropCus";
import InputTextCom from "@/components/ui/commons/InputTextCom";
import InputPassCom from "@/components/ui/commons/InputPassCom";
import { Usertype } from "@/types/generalTypes";
import { registeruserService } from "@/services/registeruserService";

// Usaremos directamente Usertype, que ya contiene birthdate?: string y genero?: string
export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Formulario tipado con Usertype (nombre, email, password, fecha_nacimiento, genero)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Usertype>();

  const onSubmit: SubmitHandler<Usertype> = async (data) => {
    setIsLoading(true);
    try {
      console.log("dataRegister ", data);
      // Llamamos al servicio pasando exactamente un Usertype
      await registeruserService({
        nombre: data.nombre!,
        email: data.email,
        password: data.password,
        fecha_nacimiento: data.fecha_nacimiento,
        genero: data.genero,
      });
      setTimeout(() => {
        localStorage.setItem("userName", data.nombre!);
        router.push("/loginPage");
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
          <InputTextCom
            id="nombre"
            labelText="Nombre"
            type="text"
            placeholder="Tu nombre completo"
            {...register("nombre", { required: "Este campo es obligatorio" })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1 mb-4">{errors.nombre.message}</p>
          )}

          {/* Email */}
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
            <p className="text-red-500 text-sm mt-1 mb-4">{errors.email.message}</p>
          )}

          {/* Fecha de nacimiento */}
          <InputTextCom
            id="birthdate"
            labelText="Fecha de nacimiento"
            type="date"
            {...register("fecha_nacimiento", { required: "Este campo es obligatorio" })}
          />
          {errors.fecha_nacimiento && (
            <p className="text-red-500 text-sm mt-1 mb-4">{errors.fecha_nacimiento.message}</p>
          )}

          {/* Género */}
          <div className="mt-4 mb-6">
            <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              id="genero"
              {...register("genero", { required: "Este campo es obligatorio" })}
              className="mt-1 block w-full px-3 py-2 text-sm leading-tight rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Seleccione género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            {errors.genero && (
              <p className="text-red-500 text-sm mt-1">{errors.genero.message}</p>
            )}
          </div>

          {/* Contraseña */}
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
            <p className="text-red-500 text-sm mt-1 mb-4">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition-colors mt-4"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/loginPage" className="text-blue-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
      <BackdropCus color="#155dfc" open={isLoading} />
    </main>
  );
}
