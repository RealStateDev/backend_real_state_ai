export default function Questions() {
    const questions = [
      "¿Qué propiedades hay en Lambaré con patio?",
      "Busco departamento en Asunción zona Villa Morra",
      "Casas con 3 habitaciones y garaje",
      "Quiero alquilar una oficina en el centro",
      "Propiedades con cuota accesible",
      "Recomendaciones para invertir",
    ];
  
    return (
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-10">Preguntas que podés hacerle al bot</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {questions.map((q, i) => (
              <div key={i} className="bg-white p-4 rounded shadow-sm">{q}</div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  