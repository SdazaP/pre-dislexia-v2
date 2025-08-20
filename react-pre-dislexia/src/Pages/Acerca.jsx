import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";

export default function Acerca() {
  const navigate = useNavigate();

  const handleContacto = () => {
    navigate("/contacto");
  };

  const valores = [
    {
      nombre: "Respeto",
      icono: "🤝",
      descripcion: "Valoramos la dignidad de cada persona",
    },
    {
      nombre: "Honestidad",
      icono: "💎",
      descripcion: "Actuamos con transparencia y verdad",
    },
    {
      nombre: "Lealtad",
      icono: "🛡️",
      descripcion: "Comprometidos con nuestra comunidad",
    },
    {
      nombre: "Empatía",
      icono: "❤️",
      descripcion: "Comprendemos las necesidades de cada niño",
    },
    {
      nombre: "Igualdad",
      icono: "⚖️",
      descripcion: "Oportunidades equitativas para todos",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Acerca de <span className="text-blue-500">Nosotros</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 text-justify">
                Somos un proyecto dedicado a proporcionar herramientas y
                recursos para el pre-diagnóstico de dislexia en niños de 1º y 2º
                grado de primaria. Nuestro objetivo es identificar posibles
                dificultades en el aprendizaje de la lectura y la escritura de
                manera temprana para ofrecer apoyo y orientación a los padres y
                educadores.
              </p>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  ¡Contáctate con Nosotros!
                </h4>
                <button
                  onClick={handleContacto}
                  className="bg-blue-500 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Contacto
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visión y Misión */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visión */}
            <div className="bg-white p-8  transition-shadow duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser un referente en la detección temprana de la dislexia,
                contribuyendo al desarrollo educativo de los niños y a la
                creación de estrategias efectivas de enseñanza inclusiva.
              </p>
            </div>

            {/* Misión */}
            <div className="bg-white p-8 transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Brindar un diagnóstico temprano y preciso de dislexia en niños,
                permitiendo una intervención oportuna que facilite su proceso de
                aprendizaje y mejore su calidad de vida.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="container mx-auto px-4">
          <div className="bg-white  p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Nuestros Valores
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Los principios que guían nuestro trabajo y compromiso con la
                comunidad educativa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {valores.map((valor, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{valor.icono}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {valor.nombre}
                  </h4>
                  <p className="text-sm text-gray-600">{valor.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gradient-to-r from-blue-400 to-blue-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas más información?
            </h3>
            <p className="mb-6 opacity-90">
              Estamos aquí para ayudarte en todo lo relacionado con la detección
              temprana de dislexia
            </p>
            <button
              onClick={handleContacto}
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              Contactar Ahora
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
