import React, { useRef } from 'react';
import Layout from "../../../Layouts/Layout";
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

// Datos de ejemplo simulando la respuesta de una API
const reporteDePrueba = {
    datosPaciente: {
        nombre: "Juan Pérez",
        edad: 7,
        fechaEvaluacion: "22 de septiembre de 2025",
    },
    cuestionario: {
        resultado: 5,
        categoria: "★★★★★",
    },
    pruebas: [
        { nombre: "Memorama", nivel: 5, estrellas: "★★★★★" },
        { nombre: "Patrones", nivel: 4, estrellas: "★★★★☆" },
        { nombre: "Relación de Palabra con Imagen", nivel: 3, estrellas: "★★★☆☆" },
        { nombre: "Completa la Palabra", nivel: 4, estrellas: "★★★★☆" },
    ],
    diagnostico: {
        resultadoFinal: "Sin síntomas de dislexia",
        velocidadPruebas: "03:45",
        dificultades: [],
    },
};

export default function ReporteDiagnostico() {
    const reportRef = useRef(null);
    const reporte = reporteDePrueba;

    const handleDownloadPDF = async () => {
    const reportElement = reportRef.current;
    if (!reportElement) {
        console.error("No se encontró la referencia al contenido del reporte.");
        return;
    }

    // 1. Agrega la clase para forzar el estilo de escritorio
    reportElement.classList.add('force-print-desktop');

    const canvas = await html2canvas(reportElement, {
        scale: 3, 
        useCORS: true,
        allowTaint: true,
    });

    // 2. Quita la clase inmediatamente después de la captura
    reportElement.classList.remove('force-print-desktop');

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a3");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let yPosition = 0;
    const pages = Math.ceil(imgHeight / (pdfHeight - margin * 2));
    let currentPage = 1;

    while (heightLeft > 0) {
        if (currentPage > 1) {
            pdf.addPage();
        }

        const sourceY = (currentPage - 1) * (pdfHeight - margin * 2);
        const imgFragmentHeight = Math.min(heightLeft, pdfHeight - margin * 2);

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
            sourceY,
            imgFragmentHeight
        );

        heightLeft -= (pdfHeight - margin * 2);
        currentPage++;
    }

    const fileName = `reporte_${reporte.datosPaciente.nombre.replace(/\s/g, "_")}.pdf`;
    pdf.save(fileName);
};

    return (
        <Layout>
            <div className="py-12 px-4 md:px-8 flex flex-col items-center">
                <div ref={reportRef} className="p-6 md:p-10 w-full max-w-4xl">
                    
                    {/* Encabezado del reporte */}
                    <div className="flex items-center justify-center text-center space-x-4 mb-6 md:mb-10">
                        <img src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png" alt="Logo de Dislexia Kids" className="w-20 md:w-24" />
                        <h2 className="text-xl md:text-2xl font-bold">
                            Dislexia Kids Pre-Diagnóstico de Dislexia en niños
                            de 1ro y 2do grado de primaria.
                        </h2>
                    </div>
                    <hr className="my-6 md:my-8" />
                    
                    {/* Sección de Datos del Paciente */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Impresión Diagnóstica</h1>
                    <div className="mb-8 p-6 rounded-lg">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4">Datos del Paciente</h3>
                        <p><strong>Nombre Completo:</strong> {reporte.datosPaciente.nombre}</p>
                        <p><strong>Edad:</strong> {reporte.datosPaciente.edad}</p>
                        <p><strong>Fecha de la Evaluación:</strong> {reporte.datosPaciente.fechaEvaluacion}</p>
                    </div>

                    {/* Sección de Batería de Pruebas */}
                    <div className="mb-8">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Batería de Pruebas Realizadas</h3>
                        <p className="mb-4">
                            Para esta evaluación, se aplicó una batería de pruebas diseñadas para identificar posibles dificultades relacionadas con la dislexia en niños de 1º y 2º grado de primaria.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ">
                            <li><strong>Cuestionario para Padres:</strong> Recopila información sobre el desarrollo del niño, sus hábitos de estudio y posibles dificultades.</li>
                            <li><strong>Memorama:</strong> Evalúa la memoria visual y la capacidad de atención.</li>
                            <li><strong>Patrones de Figuras:</strong> Mide la capacidad de reconocer y continuar secuencias visuales y lógicas.</li>
                            <li><strong>Relación de Palabra con Imagen:</strong> Evalúa la capacidad para asociar vocabulario con su representación visual.</li>
                            <li><strong>Completa la Palabra:</strong> Mide las habilidades de lectura y escritura al pedir al niño que complete palabras.</li>
                        </ul>
                    </div>

                    {/* Sección de Resultados */}
                    <div className="mb-8">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Resultados de las Pruebas</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prueba</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Habilidad</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">Cuestionario para padres</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{reporte.cuestionario.categoria}</td>
                                    </tr>
                                    {reporte.pruebas.map((prueba, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{prueba.nombre}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{prueba.estrellas}</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">Tiempo total de pruebas</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold">{reporte.diagnostico.velocidadPruebas}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Sección de Pre-Diagnóstico */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Pre-Diagnóstico</h3>
                        {reporte.diagnostico.resultadoFinal === "Sin síntomas de dislexia" ? (
                            <div className="p-6 bg-green-100 rounded-lg text-green-800">
                                <p>
                                    Con base en los resultados obtenidos, el usuario "<strong>{reporte.datosPaciente.nombre}</strong>" ha obtenido un pre-diagnóstico donde no se han presentado síntomas de dislexia. Esto indica un buen desempeño en las habilidades evaluadas.
                                </p>
                                <h4 className="font-bold mt-4">Recomendaciones:</h4>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Continuar con el apoyo escolar normal.</li>
                                    <li>Fomentar la lectura y escritura en casa.</li>
                                    <li>Mantener comunicación con los maestros para seguir el progreso del niño.</li>
                                </ul>
                            </div>
                        ) : (
                            <div className="p-6 bg-red-100 rounded-lg text-red-800">
                                <p>
                                    Con base en los resultados obtenidos, se determina que el usuario "<strong>{reporte.datosPaciente.nombre}</strong>" ha obtenido un pre-diagnóstico donde su nivel de dislexia podría ser <strong>{reporte.diagnostico.resultadoFinal}</strong>, por lo que podría presentar las siguientes dificultades:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    {reporte.diagnostico.dificultades.map((dificultad, index) => (
                                        <li key={index}>{dificultad}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Botón de descarga */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleDownloadPDF}
                        className="px-8 py-3 font-bold rounded-full text-white transition-all duration-300 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                    >
                        Descargar Reporte PDF
                    </button>
                </div>
            </div>
        </Layout>
    );
}