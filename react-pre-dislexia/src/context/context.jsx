import React, { createContext, useContext, useState } from 'react';

// URL de tu API para el envío final de resultados
const API_SUBMIT_URL = 'http://localhost:3000/api/pruebas/submit'; 

// Crear el Contexto
const DiagnosticoContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useDiagnostico = () => useContext(DiagnosticoContext);

// Estructura del estado inicial
const initialState = {
  // Datos del usuario (del primer paso o cuestionario)
  userId: 'guest_user_' + Date.now(),
  email: '', 
  
  // Aciertos del Cuestionario para Padres (Prueba 1)
  prueba1: 0,
  
  // Resultados de las pruebas 2, 3 y 4 (Aciertos y Tiempo)
  prueba2: { aciertos: 0, tiempo: 0 }, // Patrones
  prueba3: { aciertos: 0, tiempo: 0 }, // Palabra-Imagen
  prueba4: { aciertos: 0, tiempo: 0 }, // Completa la Palabra
};

export default function DiagnosticoProvider  ({ children }) {
  const [diagnosticoData, setDiagnosticoData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [reporteId, setReporteId] = useState(null);

  /**
   * Función para actualizar resultados de cualquier prueba (1, 2, 3, o 4)
   * @param {string} key - La clave de la prueba ('prueba1', 'prueba2', etc.)
   * @param {object} value - Objeto que contiene { aciertos, tiempo } o solo el valor de aciertos (para prueba1)
   */
  const updateResultados = (key, value) => {
    setDiagnosticoData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  /**
   * Función para actualizar el email y otros datos de usuario
   */
  const updateUserData = (data) => {
    setDiagnosticoData(prev => ({
        ...prev,
        ...data,
    }));
  };

  /**
   * Función que calcula el tiempo total y envía todo a la API
   */
  const submitDiagnostico = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    // 1. Calcular Tiempo Total
    const tiempoTotal = (
      diagnosticoData.prueba2.tiempo + 
      diagnosticoData.prueba3.tiempo + 
      diagnosticoData.prueba4.tiempo
    );

    // 2. Construir el cuerpo final de la solicitud para la API
    const finalPayload = {
      userId: diagnosticoData.userId,
      email: diagnosticoData.email,
      prueba1: diagnosticoData.prueba1, // Aciertos del cuestionario
      prueba2: diagnosticoData.prueba2.aciertos,
      prueba3: diagnosticoData.prueba3.aciertos,
      prueba4: diagnosticoData.prueba4.aciertos,
      tiempoTotal: tiempoTotal,
    };

    console.log("Enviando a la API:", finalPayload);

    try {
      const response = await fetch(API_SUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Error al guardar el diagnóstico en el servidor.');
      }
      
      // Si el servidor devuelve un ID de reporte (idealmente)
      // setReporteId(data.reporteId); 
      // Si la API devuelve el diagnóstico completo, lo puedes usar aquí

      console.log("Diagnóstico guardado:", data.diagnostico);
      setIsSubmitting(false);
      return data.diagnostico; // Devuelve los resultados finales
      
    } catch (error) {
      setSubmissionError(error.message);
      setIsSubmitting(false);
      throw error; // Re-lanza el error para manejo en la UI
    }
  };

  return (
    <DiagnosticoContext.Provider value={{ 
        diagnosticoData, 
        updateResultados,
        updateUserData,
        submitDiagnostico,
        isSubmitting,
        submissionError,
        reporteId
    }}>
      {children}
    </DiagnosticoContext.Provider>
  );
};