import React, { useState } from "react";

export default function CuestionarioPadres() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    reprobadoGrado: "",
    historialAprendizajeHabla: "",
    historialDislexia: "",
    capacidadAprender: "",
    condicionesDiagnosticadas: [],
    hitosDesarrollo: {},
    preocupacionesAcademicas: [],
    preocupacionesComportamiento: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }));
    } else if (name.startsWith("hitosDesarrollo")) {
      const preguntaKey = name.split('-')[1];
      setFormData(prevState => ({
        ...prevState,
        hitosDesarrollo: {
          ...prevState.hitosDesarrollo,
          [preguntaKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario recolectados:", formData);
    alert("Formulario enviado. Revisa la consola para ver los datos.");
    // Lógica para enviar a la API se implementará aquí después
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Historial General
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <label className="font-medium text-gray-700 md:w-1/2">
                  ¿Su hijo(a) ha reprobado algún grado?
                </label>
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="reprobadoGrado"
                      value="Sí"
                      checked={formData.reprobadoGrado === "Sí"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="reprobadoGrado"
                      value="No"
                      checked={formData.reprobadoGrado === "No"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <label className="font-medium text-gray-700 md:w-1/2">
                  ¿Hay un historial familiar de dificultad del aprendizaje/habla?
                </label>
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="historialAprendizajeHabla"
                      value="Sí"
                      checked={formData.historialAprendizajeHabla === "Sí"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="historialAprendizajeHabla"
                      value="No"
                      checked={formData.historialAprendizajeHabla === "No"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <label className="font-medium text-gray-700 md:w-1/2">
                  ¿Hay un historial familiar de dislexia?
                </label>
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="historialDislexia"
                      value="Sí"
                      checked={formData.historialDislexia === "Sí"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Sí</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="historialDislexia"
                      value="No"
                      checked={formData.historialDislexia === "No"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <label className="font-medium text-gray-700 md:w-1/2">
                  ¿Cómo calificaría la capacidad de su hijo(a) para aprender nueva
                  información en comparación con otros niños de la familia?
                </label>
                <div className="flex space-x-4 mt-2 md:mt-0">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="capacidadAprender"
                      value="Más lento"
                      checked={formData.capacidadAprender === "Más lento"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Más lento</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="capacidadAprender"
                      value="Igual"
                      checked={formData.capacidadAprender === "Igual"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Igual</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="capacidadAprender"
                      value="Más rápido"
                      checked={formData.capacidadAprender === "Más rápido"}
                      onChange={handleChange}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Más rápido</span>
                  </label>
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Salud General y Hitos de Desarrollo
            </h2>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-gray-600 mb-2">
                ¿Su hijo(a) ha sido diagnosticado con alguna de las siguientes condiciones?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "ADHD",
                  "Trastorno de oposición desafiante (ODD)",
                  "Trastorno del Ánimo (Mood Disorder)",
                  "Depresión",
                  "Ansiedad",
                ].map((condicion) => (
                  <label key={condicion} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="condicionesDiagnosticadas"
                      value={condicion}
                      checked={formData.condicionesDiagnosticadas.includes(
                        condicion
                      )}
                      onChange={handleChange}
                      className="form-checkbox text-blue-600 rounded"
                    />
                    <span className="ml-2">{condicion}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-gray-600 mb-2">
                Marque la respuesta que mejor describa a su hijo(a).
              </p>
              <div className="space-y-4">
                {[
                  "¿Su hijo(a) habló más tarde que sus compañeros?",
                  '¿Su hijo(a) habló "como bebé" más allá de la edad normal?',
                  "¿Su hijo(a) no puede recordar la palabra correcta para los objetos?",
                  '¿Usa demasiado las palabras "cosas" o "esa cosa"?',
                  "¿Su hijo(a) tuvo problemas para aprender el alfabeto, los números, los días de la semana, los colores y las formas?",
                  "¿Su hijo(a) tuvo problemas para aprender a deletrear y escribir su nombre?",
                  "¿Necesita su hijo(a) ayuda para completar sus tareas?",
                  "¿Prefiere su hijo(a) que le lean en lugar de leerle?",
                ].map((pregunta, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center md:space-x-4"
                  >
                    <label className="font-medium text-gray-700 md:w-1/2">
                      {pregunta}
                    </label>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`hitosDesarrollo-${index}`}
                          value="Sí"
                          checked={formData.hitosDesarrollo[`${index}`] === "Sí"}
                          onChange={handleChange}
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-2">Sí</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={`hitosDesarrollo-${index}`}
                          value="No"
                          checked={formData.hitosDesarrollo[`${index}`] === "No"}
                          onChange={handleChange}
                          className="form-radio text-blue-600"
                        />
                        <span className="ml-2">No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Áreas de Preocupación
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Académica
                </h3>
                <div className="space-y-2">
                  {[
                    "Lectura",
                    "Ortografía",
                    "Escritura a mano",
                    "Tareas",
                    "Matemáticas",
                  ].map((area) => (
                    <label key={area} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="preocupacionesAcademicas"
                        value={area}
                        checked={formData.preocupacionesAcademicas.includes(area)}
                        onChange={handleChange}
                        className="form-checkbox text-blue-600 rounded"
                      />
                      <span className="ml-2">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Comportamiento
                </h3>
                <div className="space-y-2">
                  {[
                    "Distracción",
                    "Concentración",
                    "Hiperactividad",
                    "Destrezas sociales",
                  ].map((area) => (
                    <label key={area} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="preocupacionesComportamiento"
                        value={area}
                        checked={formData.preocupacionesComportamiento.includes(
                          area
                        )}
                        onChange={handleChange}
                        className="form-checkbox text-blue-600 rounded"
                      />
                      <span className="ml-2">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 flex flex-col items-center justify-center text-lg">
      <form onSubmit={handleSubmit} className="p-6 md:p-10 w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          Cuestionario para Padres
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
          Paso {currentStep} de 3
        </p>

        <div className=" p-6 md:p-10 w-full max-w-4xl">
          {renderStep()}
        </div>

        <div className="mt-8 text-center space-x-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-8 py-3 font-bold rounded-full text-white transition-all duration-300 bg-gray-500 hover:bg-gray-600 shadow-lg hover:shadow-xl"
            >
              Anterior
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 font-bold rounded-full text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 font-bold rounded-full text-white transition-all duration-300 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl"
            >
              Enviar Respuestas
            </button>
          )}
        </div>
      </form>
    </div>
  );
}