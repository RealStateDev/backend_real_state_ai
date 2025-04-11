// src/containers/SuscripcionesContainer.tsx
"use client";

import React from "react";
import SuscripcionOptions from "@/components/ui/commons/SuscripcionOptions";

export default function SuscripcionesContainer() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">¡Actualiza tu plan!</h2>
      <SuscripcionOptions />
    </div>
  );
}