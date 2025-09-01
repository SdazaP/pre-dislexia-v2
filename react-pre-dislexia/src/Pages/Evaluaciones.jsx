import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import '@fontsource-variable/rubik';
import { useRef, useState } from 'react';

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const iniciarEvaluacionRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === evaluaciones.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? evaluaciones.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

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
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-16">
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

        {/* Carrusel de Evaluaciones */}
        <section className="container mx-auto px-4 mb-16">
          <div className="relative">
            <div 
              ref={carouselRef}
              className="overflow-hidden relative"
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {evaluaciones.map((evaluacion) => (
                  <div 
                    key={evaluacion.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
                      <div className="relative overflow-hidden">
                        <img
                          src={evaluacion.imagen}
                          alt={evaluacion.titulo}
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      <div className="p-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                          {evaluacion.titulo}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6 text-center">
                          {evaluacion.descripcion}
                        </p>

                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-lg text-blue-600 font-medium">
                            Habilidad evaluada: {evaluacion.habilidad}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de Navegación */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              aria-label="Evaluación anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              aria-label="Siguiente evaluación"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex justify-center space-x-2 mt-8">
              {evaluaciones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a evaluación ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Información del Carrusel */}
        <section className="container mx-auto px-4 mb-16">
          <div className="bg-blue-50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Cómo funciona el proceso?
            </h3>
            <p className="text-gray-600">
              Desliza para ver las diferentes pruebas disponibles. Cada evaluación 
              está diseñada para medir habilidades específicas relacionadas con la 
              dislexia. Al completar todas las pruebas, recibirás un pre-diagnóstico 
              completo con recomendaciones.
            </p>
          </div>
        </section>

        {/* Botón de Iniciar Evaluación */}
        <section ref={iniciarEvaluacionRef} className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-white p-8 max-w-2xl mx-auto rounded-2xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                ¿Listo para comenzar?
              </h2>
              <p className="text-gray-600 mb-6">
                Selecciona esta opción para iniciar el proceso de evaluación
                completo que incluye todas las pruebas.
              </p>
              <Link
                to="/inicio-prueba"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
          <div className="bg-blue-50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Importante
            </h3>
            <p className="text-gray-600">
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