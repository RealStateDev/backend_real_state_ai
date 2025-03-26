"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    router.push("/homePage");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">¡Bienvenido!</h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Correo electrónico"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Olvidé mi contraseña
            </a>
          </div>

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
    </main>
  );
}
