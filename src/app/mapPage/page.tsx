"use client";

import dynamic from "next/dynamic";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Mapa = dynamic(() => import("@/components/ui/commons/Mapa"), {
  ssr: false,
});

export default function MapPage() {
  const router = useRouter();
  return (
    <>
      {/* Boton para ir atras*/} 
      <button
        onClick={() => router.push("/savedPage")}
        className={`
          absolute
          top-2 left-2            
          sm:top-4 sm:left-4      
          m-2                     
          sm:m-4                  
          p-1                     
          sm:p-2                  
          bg-white rounded-full shadow-md
          hover:shadow-lg
          transition
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
        aria-label="Volver a savedPage"
      >
        <FiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
      </button>
      <div className=" relative pt-12 sm:pt-16 px-4 sm:px-6 max-w-full sm:max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ver en mapa</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Aquí puedes ver la ubicación que seleccionaste. Usa los controles para
          explorar el mapa.
        </p>

        <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
          <Mapa />
        </div>
      </div>
    </>
  );
}
