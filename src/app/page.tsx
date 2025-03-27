"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"

import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">RealState AI</h1>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="#about" className="hover:text-blue-600">Sobre</Link>
          <Link href="#features" className="hover:text-blue-600">Soluciones</Link>
          <Link href="#pricing" className="hover:text-blue-600">Precios</Link>
          <Link href="/loginPage" className="text-blue-600 font-medium hover:underline">Iniciar sesión</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Tu Asistente Inmobiliario <span className="text-blue-600">inteligente</span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Encuentra tu próximo hogar con la ayuda de inteligencia artificial entrenada para el mercado inmobiliario paraguayo.
          </p>
          <Link href="/registerPage">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Empezar ahora
            </button>

          </Link>
        </div>
        <div className="mt-10 md:mt-0">
          <Image
            src="/ilus-01.svg"
            alt="AI buscando casa"
            width={450}
            height={350}
            className="rounded-xl"
          />
        </div>
      </section>

      {/* Características */}
      <section id="features" className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-12">Lo que puede hacer RealState AI</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg text-blue-600">Búsqueda inteligente</h4>
              <p className="text-sm text-gray-600 mt-2">
                Utiliza lenguaje natural para encontrar propiedades según tus preferencias reales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-blue-600">Asistencia 24/7</h4>
              <p className="text-sm text-gray-600 mt-2">
                Disponible siempre para responder consultas y asesorarte.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-blue-600">Resultados personalizados</h4>
              <p className="text-sm text-gray-600 mt-2">
                Propiedades recomendadas basadas en tu estilo de vida y necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ejemplos */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">Pregúntas que podés hacerle al bot</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-4 rounded shadow-sm">¿Qué propiedades hay en Lambaré con patio?</div>
            <div className="bg-white p-4 rounded shadow-sm">Busco departamento en Asunción zona Villa Morra</div>
            <div className="bg-white p-4 rounded shadow-sm">Casas con 3 habitaciones y garaje</div>
            <div className="bg-white p-4 rounded shadow-sm">Quiero alquilar una oficina en el centro</div>
            <div className="bg-white p-4 rounded shadow-sm">Propiedades con cuota accesible</div>
            <div className="bg-white p-4 rounded shadow-sm">Recomendaciones para invertir</div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-6">Listo para encontrar tu próximo hogar?</h3>
        <Link href="/loginPage">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-lg">
            Empezar ahora
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} RealState AI. Todos los derechos reservados.
      </footer>
    </div>
  );
}
