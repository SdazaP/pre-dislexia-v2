import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import '@fontsource-variable/rubik';
import { useRef } from 'react';

export default function Evaluaciones() {
  const evaluaciones = [
    {
      id: 1,
      imagen: "https://res.cloudinary.com/dmx716lyu/image/upload/v1755650824/memorama_boqbni.png",
      titulo: "Memorama",
      descripcion: "Un memorama es un juego de cartas que se basa en encontrar pares iguales, ayudando a desarrollar la memoria visual y la atención. Puede ser útil en la detección de dislexia al evaluar el reconocimiento de símbolos, la secuenciación y las habilidades de atención.",
      habilidad: "Memoria Visual",
    },
    {
      id: 2,
      imagen: "https://res.cloudinary.com/dmx716lyu/image/upload/v1755650834/cubos_ed8tpp.png",
      titulo: "Patrón de figuras",
      descripcion: "Un juego de encontrar patrones de figuras geométricas consiste en identificar secuencias y regularidades en figuras presentadas, mejorando el reconocimiento visual y la lógica. Este juego puede ayudar a detectar la dislexia al evaluar cómo el niño procesa la información visual y secuencial.",
      habilidad: "Reconocimiento de patrones",
    },
    {
      id: 3,
      imagen: "https://res.cloudinary.com/dmx716lyu/image/upload/v1755650847/palabra-imagen_knh6w5.png",
      titulo: "Unir palabra a imagen",
      descripcion: "Un juego de ver una imagen y elegir la palabra correspondiente presenta una imagen y varias opciones de palabras para que el niño seleccione la correcta, mejorando el reconocimiento visual y la asociación palabra-imagen.",
      habilidad: "Asociación visual",
    },
    {
      id: 4,
      imagen: "https://res.cloudinary.com/dmx716lyu/image/upload/v1755650858/completa-palabra_k6bylp.png",
      titulo: "Completa la palabra",
      descripcion: "Un juego de completar una palabra con la sílaba faltante presenta palabras incompletas y varias opciones de sílabas para que el niño elija la correcta visualmente, mejorando el reconocimiento visual y la habilidad de segmentar y unir partes de palabras escritas.",
      habilidad: "Segmentación lingüística",
    },
  ];

  // Referencia para la sección de inicio de evaluación
  const iniciarEvaluacionRef = useRef(null);

  // Función para hacer scroll a la sección de iniciar evaluación
  const scrollToIniciarEvaluacion = () => {
    iniciarEvaluacionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen py-12 relative">
        {/* Botón Flotante */}
        <button
          onClick={scrollToIniciarEvaluacion}
          className="fixed bottom-8 right-8 z-50 bg-blue-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2"
          aria-label="Comenzar evaluación"
        >
          <span className="text-lg">Comenzar</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
          </svg>
        </button>

        {/* Sección de Introducción */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Evaluaciones
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-justify">
              Bienvenido a nuestra sección de evaluación para la detección de
              dislexia en niños de primero y segundo grado. Dislexia Kids ofrece
              una serie de pruebas diseñadas para identificar posibles signos de
              dislexia de manera temprana y precisa.
              <br />
              <br />
              Las pruebas están especialmente adaptadas para ser amigables y
              comprensibles para los niños. Cada prueba está diseñada
              cuidadosamente para proporcionar resultados útiles que pueden
              indicar la necesidad de una evaluación más profunda por parte de
              profesionales de la salud especializados en dislexia.
            </p>
          </div>
        </section>

        {/* Sección de Tarjetas de Evaluación */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {evaluaciones.map((evaluacion) => (
              <div key={evaluacion.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={evaluacion.imagen}
                      alt={evaluacion.titulo}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">
                      {evaluacion.titulo}
                    </h3>
                    <p className="leading-relaxed">
                      {evaluacion.descripcion}
                    </p>

                    <div className="mt-4 flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm text-blue-600 font-medium">
                        Habilidad evaluada: {evaluacion.habilidad}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Botón de Iniciar Evaluación - Con referencia */}
        <section ref={iniciarEvaluacionRef} className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-white p-8 max-w-2xl mx-auto rounded-2xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="mb-6">
                Selecciona esta opción para iniciar el proceso de evaluación
                completo que incluye todas las pruebas.
              </p>
              <Link
                to="/prueba-registro"
                className="inline-block bg-blue-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Iniciar Evaluación Completa
              </Link>

              <p className="text-sm mt-4 text-gray-500">
                Todas las evaluaciones son confidenciales y seguras
              </p>
            </div>
          </div>
        </section>

        {/* Información adicional */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Importante
            </h3>
            <p>
              Estas evaluaciones son una herramienta de detección temprana y no
              sustituyen un diagnóstico profesional. Si los resultados indican
              posibles signos de dislexia, recomendamos consultar con un
              especialista.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}