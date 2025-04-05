import { FiSearch, FiClock, FiThumbsUp, FiStar } from "react-icons/fi";

export default function Features() {
  const features = [
    {
      icon: <FiSearch className="text-blue-600 text-4xl mb-3" />,
      title: "Búsqueda inteligente",
      description: "Utiliza lenguaje natural para encontrar propiedades según tus preferencias reales.",
    },
    {
      icon: <FiClock className="text-blue-600 text-4xl mb-3" />,
      title: "Asistencia 24/7",
      description: "Disponible siempre para responder consultas y asesorarte.",
    },
    {
      icon: <FiThumbsUp className="text-blue-600 text-4xl mb-3" />,
      title: "Resultados personalizados",
      description: "Propiedades recomendadas según tus necesidades y estilo de vida.",
    },
    {
      icon: <FiStar className="text-blue-600 text-4xl mb-3" />,
      title: "Favoritos",
      description: "Guardá las propiedades que te interesan para tenerlas siempre a mano.",
    },
  ];

  return (
    <section id="features" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-12">Lo que puede hacer RealState AI</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-full">
              {f.icon}
              <h4 className="font-semibold text-blue-600 mb-2 text-center">{f.title}</h4>
              <p className="text-sm text-gray-600 text-center">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
