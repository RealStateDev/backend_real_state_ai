'use client'; // O asegúrate de usar esto en un Client Component

import dynamic from 'next/dynamic';

const Mapa = dynamic(() => import('@/components/ui/commons/Mapa'), {
  ssr: false, // Esto es lo importante
});

export default function MapPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ver en mapa</h1>
      <Mapa />
    </div>
  );
}
