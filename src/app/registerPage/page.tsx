"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 iconos de ojo

export default function registerPage() {
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 estado del ojo

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = "Por favor, ingrese un correo electrónico válido.";
      setEmailError(msg);
      alert(msg);
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      const msg =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.";
      setPasswordError(msg);
      alert(msg);
      return;
    }

    router.push("/homePage");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-sm text-gray-500 mt-1">
            ¡Bienvenido! Por favor completa la información para registrarte.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre completo"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Contraseña con ícono de ojo */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:border-blue-500"
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

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
    </main>
  );
}
