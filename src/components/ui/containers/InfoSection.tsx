import Image from "next/image";

export default function InfoSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-7xl mx-auto">
      <div className="max-w-xl">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Tu Asistente Inmobiliario <span className="text-blue-600">inteligente</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Encuentra tu próximo hogar con la ayuda de inteligencia artificial entrenada para el mercado inmobiliario paraguayo.
        </p>
        <button onClick={onStart} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          Empezar ahora
        </button>
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
  );
}
