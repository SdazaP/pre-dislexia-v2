import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

// --- FUNCIONES DE LÓGICA DE PRESENTACIÓN ---

// Mapeo de Aciertos (0-10) a estrellas (Pruebas 2, 3, 4)
const mapAciertosToStars = (aciertos) => {
  if (aciertos >= 9) return "★★★★★";
  if (aciertos >= 7) return "★★★★☆";
  if (aciertos >= 5) return "★★★☆☆";
  if (aciertos >= 3) return "★★☆☆☆";
  return "★☆☆☆☆";
};

// Mapeo de Aciertos (riesgo) de Prueba 1 (0-14) a estrellas (habilidad)
const mapCuestionarioToStars = (aciertos) => {
  // 0-2 (Riesgo Muy Bajo) -> 5 Estrellas (Habilidad Sobresaliente)
  if (aciertos <= 2) return "★★★★★";
  if (aciertos <= 5) return "★★★★☆";
  if (aciertos <= 8) return "★★★☆☆";
  if (aciertos <= 11) return "★★☆☆☆";
  return "★☆☆☆☆"; // 12-14 (Riesgo Severo)
};

// Modal de Confirmación
const EmailSentModal = ({ isOpen, onClose, email }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-auto">
        <div className="text-center">
          {/* Ícono de éxito */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Título y mensaje */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Correo Enviado!
          </h3>
          <p className="text-gray-600 mb-4">
            El reporte ha sido enviado exitosamente a:
          </p>
          <p className="text-blue-600 font-semibold text-lg mb-6 break-all">
            {email}
          </p>
          
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="w-full px-6 py-3 font-bold rounded-full text-white transition-all duration-300 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ReporteDiagnostico() {
  const { email } = useParams();

  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const reportRef = useRef(null);

  // 1. Hook para buscar los datos del reporte por email
  useEffect(() => {
    const fetchReporte = async () => {
      setLoading(true);
      setError(null);
      try {
        
        const response = await fetch(
          `http://localhost:3000/api/pruebas/${email}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || "No se encontró el reporte.");
        }

        const json = await response.json();

        // 2. Transforma los datos brutos de la API para la interfaz
        const rawData = json.data;

        const processedReporte = {
          // Datos básicos
          nombre: "Usuario: " + rawData.email.split("@")[0],
          fechaEvaluacion: new Date(rawData.fechaEvaluacion).toLocaleDateString(
            "es-MX"
          ),
          email: rawData.email,

          // Resultados del Cuestionario (Prueba 1)
          cuestionario: {
            puntaje: rawData.results.prueba1,
            estrellas: mapCuestionarioToStars(rawData.results.prueba1),
          },

          // Tabla de pruebas de rendimiento (Pruebas 2, 3, 4)
          pruebasRendimiento: [
            {
              nombre: "Patrones de Figuras",
              aciertos: rawData.results.prueba2,
              estrellas: mapAciertosToStars(rawData.results.prueba2),
            },
            {
              nombre: "Relación Palabra-Imagen",
              aciertos: rawData.results.prueba3,
              estrellas: mapAciertosToStars(rawData.results.prueba3),
            },
            {
              nombre: "Completa la Palabra",
              aciertos: rawData.results.prueba4,
              estrellas: mapAciertosToStars(rawData.results.prueba4),
            },
          ],

          // Diagnóstico Final
          diagnostico: {
            resultadoFinal: rawData.resultadoDiagnostico,
            puntajeFinal: rawData.puntajeFinal,
            detalles: rawData.detalles,
            recomendaciones: rawData.recomendaciones,
            tiempoTotal: rawData.tiempoTotal,
          },
        };

        setReporte(processedReporte);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchReporte();
    }
  }, [email]);

  // Función para enviar el correo
  const handleSendEmail = async () => {
    if (!reporte?.email) return;

    setSendingEmail(true);
    try {
      const response = await fetch('http://localhost:3000/api/pruebas/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: reporte.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el correo');
      }

      setEmailSent(true);
      setShowModal(true);
      
    } catch (error) {
      console.error('Error enviando correo:', error);
      alert(`Error al enviar el correo: ${error.message}`);
    } finally {
      setSendingEmail(false);
    }
  };

  // Lógica de descarga de PDF
  const handleDownloadPDF = async () => {
    const reportElement = reportRef.current;
    if (!reportElement) {
      console.error("No se encontró la referencia al contenido del reporte.");
      return;
    }

    // 1. Agrega la clase para forzar el estilo de escritorio
    reportElement.classList.add("force-print-desktop");

    const canvas = await html2canvas(reportElement, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
    });

    // 2. Quita la clase inmediatamente después de la captura
    reportElement.classList.remove("force-print-desktop");

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a3");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let currentPage = 1;

    while (heightLeft > 0) {
      if (currentPage > 1) {
        pdf.addPage();
      }

      const sourceY = (currentPage - 1) * (pdfHeight - margin * 2);

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin,
        imgWidth,
        imgHeight,
        null,
        null,
        null,
        null,
        sourceY
      );

      heightLeft -= pdfHeight - margin * 2;
      currentPage++;
    }

    const fileName = `reporte_${reporte.nombre.replace(/\s/g, "_")}.pdf`;
    pdf.save(fileName);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-20 text-xl">Cargando diagnóstico...</div>
      </Layout>
    );
  }

  if (error || !reporte) {
    return (
      <Layout>
        <div className="text-center py-20 text-xl text-red-600">
          Error:{" "}
          {error ||
            "No se pudo cargar el reporte. Verifica la URL o intenta más tarde."}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12 px-4 md:px-8 flex flex-col items-center">
        {/* Contenedor principal para la captura del PDF */}
        <div
          ref={reportRef}
          className="p-6 md:p-10 w-full max-w-4xl"
        >
          {/* Encabezado del reporte */}
          <div className="flex items-center justify-center text-center space-x-4 mb-6 md:mb-10">
            <img
              src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png"
              alt="Logo de Dislexia Kids"
              className="w-20 md:w-24"
            />
            <h2 className="text-xl md:text-2xl font-bold">
              Dislexia Kids Pre-Diagnóstico de Dislexia en niños de 1ro y 2do
              grado de primaria.
            </h2>
          </div>
          <hr className="my-6 md:my-8" />

          {/* Sección de Datos del Paciente */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Impresión Diagnóstica
          </h1>
          <div className="mb-8 p-6 rounded-lg bg-gray-100">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              Datos de la Evaluación
            </h3>
            <p>
              <strong>Alias/Usuario:</strong> {reporte.nombre}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {reporte.email}
            </p>
            <p>
              <strong>Fecha de la Evaluación:</strong> {reporte.fechaEvaluacion}
            </p>
          </div>

          {/* Batería de Pruebas (Descripción) */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Batería de Pruebas Realizadas
            </h3>
            <p className="mb-4 text-gray-600">
              Se aplicó una batería de pruebas diseñada para identificar
              posibles dificultades relacionadas con la dislexia en niños de 1º
              y 2º grado de primaria.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong>Cuestionario para Padres:</strong> Evalúa el riesgo de
                síntomas observados por el tutor.
              </li>
              <li>
                <strong>Patrones de Figuras:</strong> Mide la capacidad visual y
                lógica.
              </li>
              <li>
                <strong>Relación de Palabra con Imagen:</strong> Evalúa la
                asociación visual de vocabulario.
              </li>
              <li>
                <strong>Completa la Palabra:</strong> Mide habilidades de
                lectura y escritura.
              </li>
            </ul>
          </div>

          {/* Resultados */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Resultados de las Pruebas
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Prueba
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Nivel (Estrellas)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Aciertos (Rendimiento)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Cuestionario de Padres (Prueba 1) */}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4 whitespace-nowrap">
                      Cuestionario para padres
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-yellow-500">
                      {reporte.cuestionario.estrellas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {reporte.cuestionario.puntaje} / 14
                    </td>
                  </tr>
                  {/* Pruebas de Rendimiento (Pruebas 2, 3, 4) */}
                  {reporte.pruebasRendimiento.map((prueba, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {prueba.nombre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-yellow-500">
                        {prueba.estrellas}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        {prueba.aciertos} / 10
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50/50">
                    <td
                      colSpan="2"
                      className="px-6 py-4 whitespace-nowrap font-bold text-left"
                    >
                      Tiempo total de pruebas sin considerar Cuestionario de Padres
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-right">
                      {reporte.diagnostico.tiempoTotal} segundos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sección de Pre-Diagnóstico */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
              Pre-Diagnóstico
            </h3>
            {reporte.diagnostico.resultadoFinal ===
            "Sin síntomas de Dislexia" ? (
              <div className="p-6 bg-green-100 rounded-lg text-green-800 border-l-4 border-green-500">
                <p className="text-2xl font-bold mb-3">
                  Resultado: {reporte.diagnostico.resultadoFinal}
                </p>
                <p>
                  El desempeño y velocidad del usuario son consistentes con un
                  desarrollo normal. No se observan indicadores claros de
                  dislexia.
                </p>
                <h4 className="font-bold mt-4">Recomendaciones:</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {reporte.diagnostico.recomendaciones.map(
                    (dificultad, index) => (
                      <li key={index}>{dificultad}</li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <div className="p-6 bg-red-100 rounded-lg text-red-800 border-l-4 border-red-500">
                <p className="text-2xl font-bold mb-3">
                  Resultado: {reporte.diagnostico.resultadoFinal}
                </p>
                <p>
                  Con base en los resultados obtenidos, su nivel de riesgo
                  podría ser{" "}
                  <strong>{reporte.diagnostico.resultadoFinal}</strong>. Esto
                  sugiere la presencia de dificultades.
                </p>
                <p className="text-sm italic mt-2">
                  Detalles: {reporte.diagnostico.detalles}
                </p>
                <h4 className="font-bold mt-4">Recomendaciones:</h4>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {reporte.diagnostico.recomendaciones.map(
                    (dificultad, index) => (
                      <li key={index}>{dificultad}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-8 text-center space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <button
            onClick={handleDownloadPDF}
            className="w-full md:w-auto px-8 py-3 font-bold rounded-full text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
          >
            Descargar Reporte PDF
          </button>
          
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail || emailSent}
            className={`w-full md:w-auto px-8 py-3 font-bold rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl ${
              sendingEmail || emailSent
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {sendingEmail ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : emailSent ? (
              '✓ Correo Enviado'
            ) : (
              'Enviar por Correo'
            )}
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      <EmailSentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        email={reporte.email} 
      />
    </Layout>
  );
}