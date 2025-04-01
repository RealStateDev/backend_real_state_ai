"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { FiSearch, FiClock, FiThumbsUp, FiStar } from "react-icons/fi";


import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white-50 text-gray-800 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-50 shadow-sm sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">RealState AI</h1>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="#about" className="hover:text-blue-600">Sobre</Link>
          <Link href="#features" className="hover:text-blue-600">Soluciones</Link>
          <Link href="#faq" className="hover:text-blue-600">FAQ</Link>
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
            src="/girl_phone.svg"
            alt="AI buscando casa"
            width={450}
            height={350}
            className="rounded-xl"
          />
        </div>
      </section>

      {/* Características */}
      <section id="features" className="bg-gray-50 py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h3 className="text-3xl font-semibold mb-12">Lo que puede hacer RealState AI</h3>
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
      {/* Búsqueda */}
      <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-full">
        <FiSearch className="text-blue-600 text-4xl mb-3" />
        <h4 className="font-semibold text-blue-600 mb-2 text-center">Búsqueda inteligente</h4>
        <p className="text-sm text-gray-600 text-center">
          Utiliza lenguaje natural para encontrar propiedades según tus preferencias reales.
        </p>
      </div>

      {/* Asistencia */}
      <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-full">
        <FiClock className="text-blue-600 text-4xl mb-3" />
        <h4 className="font-semibold text-blue-600 mb-2 text-center">Asistencia 24/7</h4>
        <p className="text-sm text-gray-600 text-center">
          Disponible siempre para responder consultas y asesorarte.
        </p>
      </div>

      {/* Resultados */}
      <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-full">
        <FiThumbsUp className="text-blue-600 text-4xl mb-3" />
        <h4 className="font-semibold text-blue-600 mb-2 text-center">Resultados personalizados</h4>
        <p className="text-sm text-gray-600 text-center">
          Propiedades recomendadas según tus necesidades y estilo de vida.
        </p>
      </div>

      {/* Favoritos */}
      <div className="flex flex-col items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-full">
        <FiStar className="text-blue-600 text-4xl mb-3" />
        <h4 className="font-semibold text-blue-600 mb-2 text-center">Favoritos</h4>
        <p className="text-sm text-gray-600 text-center">
          Guardá las propiedades que te interesan para tenerlas siempre a mano.
        </p>
      </div>
    </div>
  </div>
</section>



      {/* Ejemplos */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">Preguntas que podés hacerle al bot</h3>
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
      <section className="py-20 px-6 text-center bg-gray-50">
        <h3 className="text-3xl font-semibold mb-6">¿Estás listo para encontrar tu próximo hogar?</h3>
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
