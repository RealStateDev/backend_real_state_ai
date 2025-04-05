import { Button } from "@/components/ui/button";

export default function CallToAction({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-20 px-6 text-center bg-gray-50">
      <h3 className="text-3xl font-semibold mb-6">¿Estás listo para encontrar tu próximo hogar?</h3>
      <Button onClick={onStart} className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-3 rounded-lg">
        Empezar ahora
      </Button>
    </section>
  );
}
