// src/app/suscriptionsPage/page.tsx
"use client";

import React from "react";
import SuscripcionesContainer from "@/components/ui/containers/SuscripcionesContainer";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function SuscriptionsPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-gray-50 font-poppins relative overflow-y-auto">
      {/* Botón para volver atrás */}
      <button
        onClick={() => router.back()}
        className="m-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition absolute top-4 left-4"
      >
        <FiArrowLeft className="w-6 h-6 text-blue-600" />
      </button>

      {/* Contenido centrado */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <SuscripcionesContainer />
      </div>
    </div>
  );
}
