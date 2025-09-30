import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const API_SUBMIT_URL = 'http://localhost:3000/api/pruebas/submit'; 
const DiagnosticoContext = createContext();
export const useDiagnostico = () => useContext(DiagnosticoContext);

const initialState = {
  userId: 'guest_user_' + Date.now(),
  email: '', 
  prueba1: 0,
  prueba2: { aciertos: 0, tiempo: 0 },
  prueba3: { aciertos: 0, tiempo: 0 },
  prueba4: { aciertos: 0, tiempo: 0 },
};

export default function DiagnosticoProvider({ children }) {
  const [diagnosticoData, setDiagnosticoData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [reporteId, setReporteId] = useState(null);
  
  // Usar useRef en lugar de useState para la bandera (persiste entre renders)
  const hasSubmittedRef = useRef(false);

  const updateResultados = (key, value) => {
    setDiagnosticoData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const updateUserData = (data) => {
    setDiagnosticoData(prev => ({
        ...prev,
        ...data,
    }));
  };

  const submitDiagnostico = useCallback(async () => {
    // Verificación con useRef que es inmediata
    if (hasSubmittedRef.current) {
      console.log("🚫 Diagnóstico ya fue enviado, evitando envío duplicado");
      return null;
    }

    // Marcar inmediatamente como enviado
    hasSubmittedRef.current = true;
    setIsSubmitting(true);
    setSubmissionError(null);
    
    const tiempoTotal = (
      diagnosticoData.prueba2.tiempo + 
      diagnosticoData.prueba3.tiempo + 
      diagnosticoData.prueba4.tiempo
    );

    const finalPayload = {
      userId: diagnosticoData.userId,
      email: diagnosticoData.email,
      prueba1: diagnosticoData.prueba1,
      prueba2: diagnosticoData.prueba2.aciertos,
      prueba3: diagnosticoData.prueba3.aciertos,
      prueba4: diagnosticoData.prueba4.aciertos,
      tiempoTotal: tiempoTotal,
    };

    console.log("📤 Enviando a la API:", finalPayload);

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
        // Si hay error, permitir reintento
        hasSubmittedRef.current = false;
        throw new Error(data.details || 'Error al guardar el diagnóstico en el servidor.');
      }
      
      console.log("✅ Diagnóstico guardado:", data.diagnostico);
      setIsSubmitting(false);
      return data.diagnostico;
      
    } catch (error) {
      // En caso de error, permitir reintento
      hasSubmittedRef.current = false;
      setSubmissionError(error.message);
      setIsSubmitting(false);
      throw error;
    }
  }, [diagnosticoData]);

  // Función para resetear el estado (opcional)
  const resetSubmission = useCallback(() => {
    hasSubmittedRef.current = false;
    setIsSubmitting(false);
    setSubmissionError(null);
  }, []);

  return (
    <DiagnosticoContext.Provider value={{ 
        diagnosticoData, 
        updateResultados,
        updateUserData,
        submitDiagnostico,
        isSubmitting,
        submissionError,
        reporteId,
        resetSubmission
    }}>
      {children}
    </DiagnosticoContext.Provider>
  );
};