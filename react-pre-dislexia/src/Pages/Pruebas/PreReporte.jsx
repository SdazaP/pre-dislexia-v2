import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnostico } from '../../context/context'; 
import Layout from "../../Layouts/Layout";

export default function FinalizarEvaluacion() {
    const { 
        submitDiagnostico, 
        isSubmitting, 
        submissionError, 
        diagnosticoData
    } = useDiagnostico();
    
    const navigate = useNavigate();
    const [reporteListo, setReporteListo] = useState(false);
    const [emailReporte, setEmailReporte] = useState(null);
    
    // Usar useRef para controlar ejecución única
    const hasInitiatedSubmit = useRef(false);

    useEffect(() => {
        // Verificaciones más estrictas
        if (hasInitiatedSubmit.current || 
            !diagnosticoData.email || 
            reporteListo || 
            isSubmitting) {
            return;
        }

        console.log("🚀 Iniciando envío del diagnóstico...");
        hasInitiatedSubmit.current = true;

        const executeSubmit = async () => {
            try {
                const finalReporte = await submitDiagnostico(); 
                
                if (finalReporte) {
                    setEmailReporte(finalReporte.email);
                    setReporteListo(true);
                    console.log("✅ Diagnóstico enviado exitosamente");
                }
            } catch (error) {
                console.error("❌ Error al enviar el diagnóstico:", error);
                // En caso de error, permitir reintento
                hasInitiatedSubmit.current = false;
            }
        };

        executeSubmit();

    }, [diagnosticoData.email, reporteListo, isSubmitting, submitDiagnostico]); 

    const handleVerReporte = () => {
        if (emailReporte) {
            navigate(`/evaluacion/reporte/${emailReporte}`); 
        }
    };

    return (
        <Layout>
            <div className="min-h-screen py-12 px-4 md:px-8 flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 w-full max-w-lg text-center">
                    
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">
                        {reporteListo ? '¡Pruebas Finalizadas!' : 'Procesando Resultados...'}
                    </h1>
                    
                    {isSubmitting && (
                         <div className="flex justify-center items-center space-x-3 text-gray-600 mb-6">
                             <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             <p className="text-xl">Generando diagnóstico en el servidor...</p>
                         </div>
                    )}

                    {submissionError && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6" role="alert">
                            <p className="font-bold">Error al enviar el diagnóstico</p>
                            <p className="text-sm">
                                {submissionError.includes('Conflicto') ? 
                                    'El diagnóstico ya fue registrado para este correo.' : 
                                    'Por favor, revisa tu conexión o intenta buscar tu reporte más tarde usando el correo.'
                                }
                            </p>
                        </div>
                    )}

                    {reporteListo && (
                        <>
                            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-700 text-lg mb-6">
                                Tu diagnóstico ya está guardado y listo. Se ha enviado una copia de los resultados a tu correo electrónico.
                            </p>
                            <button
                                onClick={handleVerReporte}
                                className="w-full px-8 py-3 font-bold rounded-full text-white transition-all duration-300 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl"
                            >
                                Ver Reporte Final Ahora
                            </button>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}