const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
// Nota: Se asume que el modelo ResultadosTest.js usa module.exports
const TestResult = require("../models/ResultadosTest.js");
const nodemailer = require("nodemailer");

const router = express.Router();

// 2. Configurar el transporter y credenciales (copiado del archivo de contacto)
// NOTA: Asegúrate de que las variables de entorno EMAIL_PASS y EMAIL_USER estén definidas.
const PASS = process.env.EMAIL_PASS;
const EMAIL = process.env.EMAIL_USER;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

// Función de plantilla para el correo (Se usa el detalle de puntajes en el email)
const generateReportEmailHTML = (diagnostico) => {
  const recomendacionList = diagnostico.recomendaciones
    .map((r) => `<li>${r}</li>`)
    .join("");

  // Extraer los puntos de los detalles
  const puntajePrecision = diagnostico.detalles.match(
    /Precisión: [^(]+\((\d+)/
  )[1];
  const puntajeVelocidad = diagnostico.detalles.match(
    /Velocidad: [^(]+\((\d+)/
  )[1];

  // Función para mapear aciertos a estrellas (igual que en el frontend)
  const mapAciertosToStars = (aciertos) => {
    if (aciertos >= 9) return "★★★★★";
    if (aciertos >= 7) return "★★★★☆";
    if (aciertos >= 5) return "★★★☆☆";
    if (aciertos >= 3) return "★★☆☆☆";
    return "★☆☆☆☆";
  };

  // Función para mapear cuestionario a estrellas (igual que en el frontend)
  const mapCuestionarioToStars = (aciertos) => {
    if (aciertos <= 2) return "★★★★★";
    if (aciertos <= 5) return "★★★★☆";
    if (aciertos <= 8) return "★★★☆☆";
    if (aciertos <= 11) return "★★☆☆☆";
    return "★☆☆☆☆";
  };

  // Determinar colores según el resultado
  const isSinSintomas =
    diagnostico.resultadoDiagnostico === "Sin síntomas de Dislexia";
  const resultadoColor = isSinSintomas ? "#059669" : "#dc2626";
  const resultadoBgColor = isSinSintomas ? "#d1fae5" : "#fee2e2";
  const resultadoBorderColor = isSinSintomas ? "#059669" : "#dc2626";

  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    line-height: 1.6; 
                    color: #374151;
                    margin: 0;
                    padding: 0;
                    background-color: #f9fafb;
                }
                .container { 
                    max-width: 800px; 
                    margin: 20px auto; 
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    overflow: hidden;
                }
                .header { 
                    background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .header img {
                    max-width: 120px;
                    margin-bottom: 15px;
                }
                .content { 
                    padding: 30px; 
                }
                .section { 
                    margin-bottom: 30px; 
                }
                .section-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 15px;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 8px;
                }
                .data-card {
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-left: 4px solid #3b82f6;
                }
                .resultado-card {
                    background: ${resultadoBgColor};
                    border-radius: 8px;
                    padding: 25px;
                    margin: 20px 0;
                    border-left: 4px solid ${resultadoBorderColor};
                }
                .stars {
                    color: #f59e0b;
                    font-size: 1.2rem;
                    letter-spacing: 2px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                th {
                    background: #eff6ff;
                    color: #1e40af;
                    font-weight: 600;
                    text-align: left;
                    padding: 12px 15px;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                td {
                    padding: 12px 15px;
                    border-bottom: 1px solid #e5e7eb;
                }
                tr:last-child td {
                    border-bottom: none;
                }
                .prueba-title {
                    font-weight: 600;
                    color: #374151;
                }
                .footer {
                    background: #f8fafc;
                    padding: 20px;
                    text-align: center;
                    color: #6b7280;
                    font-size: 0.875rem;
                    border-top: 1px solid #e5e7eb;
                }
                .btn-download {
                    display: inline-block;
                    background: #2563eb;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 50px;
                    font-weight: 600;
                    margin: 10px 0;
                    transition: all 0.3s ease;
                }
                .btn-download:hover {
                    background: #1d4ed8;
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
                }
                .highlight {
                    color: ${resultadoColor};
                    font-weight: 700;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Encabezado -->
                <div class="header">
                    <img src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755557481/Logo_ytl7br.png" alt="Dislexia Kids Logo">
                    <h1 style="margin: 0; font-size: 1.8rem;">Dislexia Kids - Reporte de Pre-Diagnóstico</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Pre-Diagnóstico de Dislexia en niños de 1ro y 2do grado de primaria</p>
                </div>

                <!-- Contenido Principal -->
                <div class="content">
                    <!-- Datos de la Evaluación -->
                    <div class="section">
                        <h2 class="section-title">Datos de la Evaluación</h2>
                        <div class="data-card">
                            <p><strong>Usuario:</strong> ${
                              diagnostico.email.split("@")[0]
                            }</p>
                            <p><strong>Correo electrónico:</strong> ${
                              diagnostico.email
                            }</p>
                            <p><strong>Fecha de Evaluación:</strong> ${new Date(
                              diagnostico.fechaEvaluacion
                            ).toLocaleDateString("es-MX")}</p>
                        </div>
                    </div>

                    <!-- Batería de Pruebas -->
                    <div class="section">
                        <h2 class="section-title">Batería de Pruebas Realizadas</h2>
                        <p style="color: #6b7280; margin-bottom: 15px;">
                            Se aplicó una batería de pruebas diseñada para identificar posibles dificultades 
                            relacionadas con la dislexia en niños de 1º y 2º grado de primaria.
                        </p>
                        <ul style="color: #6b7280; padding-left: 20px;">
                            <li><strong>Cuestionario para Padres:</strong> Evalúa el riesgo de síntomas observados por el tutor.</li>
                            <li><strong>Patrones de Figuras:</strong> Mide la capacidad visual y lógica.</li>
                            <li><strong>Relación de Palabra con Imagen:</strong> Evalúa la asociación visual de vocabulario.</li>
                            <li><strong>Completa la Palabra:</strong> Mide habilidades de lectura y escritura.</li>
                        </ul>
                    </div>

                    <!-- Resultados de las Pruebas -->
                    <div class="section">
                        <h2 class="section-title">Resultados de las Pruebas</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Prueba</th>
                                    <th>Nivel (Estrellas)</th>
                                    <th style="text-align: right;">Aciertos (Rendimiento)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="background: #f8fafc;">
                                    <td class="prueba-title">Cuestionario para padres</td>
                                    <td><span class="stars">${mapCuestionarioToStars(
                                      diagnostico.results.prueba1
                                    )}</span></td>
                                    <td style="text-align: right;">${
                                      diagnostico.results.prueba1
                                    } / 14</td>
                                </tr>
                                <tr>
                                    <td class="prueba-title">Patrones de Figuras</td>
                                    <td><span class="stars">${mapAciertosToStars(
                                      diagnostico.results.prueba2
                                    )}</span></td>
                                    <td style="text-align: right;">${
                                      diagnostico.results.prueba2
                                    } / 10</td>
                                </tr>
                                <tr>
                                    <td class="prueba-title">Relación Palabra-Imagen</td>
                                    <td><span class="stars">${mapAciertosToStars(
                                      diagnostico.results.prueba3
                                    )}</span></td>
                                    <td style="text-align: right;">${
                                      diagnostico.results.prueba3
                                    } / 10</td>
                                </tr>
                                <tr>
                                    <td class="prueba-title">Completa la Palabra</td>
                                    <td><span class="stars">${mapAciertosToStars(
                                      diagnostico.results.prueba4
                                    )}</span></td>
                                    <td style="text-align: right;">${
                                      diagnostico.results.prueba4
                                    } / 10</td>
                                </tr>
                                <tr style="background: #eff6ff;">
                                    <td colspan="2" style="font-weight: 600;">
                                        Tiempo total de pruebas (sin cuestionario)
                                    </td>
                                    <td style="text-align: right; font-weight: 600;">
                                        ${diagnostico.tiempoTotal} segundos
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pre-Diagnóstico -->
                    <div class="section">
                        <h2 class="section-title">Pre-Diagnóstico</h2>
                        <div class="resultado-card">
                            <h3 style="margin: 0 0 15px 0; color: ${resultadoColor}; font-size: 1.4rem;">
                                Resultado: <span class="highlight">${
                                  diagnostico.resultadoDiagnostico
                                }</span>
                            </h3>
                            
                            ${
                              isSinSintomas
                                ? `<p>El desempeño y velocidad del usuario son consistentes con un desarrollo normal. 
                                No se observan indicadores claros de dislexia.</p>`
                                : `<p>Con base en los resultados obtenidos, su nivel de riesgo podría ser 
                                <strong>${diagnostico.resultadoDiagnostico}</strong>. Esto sugiere la presencia de dificultades.</p>
                                <p style="font-style: italic; margin-top: 10px; font-size: 0.9rem;">
                                    <strong>Detalles:</strong> ${diagnostico.detalles}
                                </p>`
                            }
                            
                            <h4 style="margin: 20px 0 10px 0; color: ${resultadoColor};">Recomendaciones:</h4>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${recomendacionList}
                            </ul>
                        </div>
                    </div>

                    <!-- Información Adicional -->
                    <div style="text-align: center; margin: 30px 0;">
                        <p style="color: #6b7280; font-size: 0.9rem;">
                            <strong>Nota importante:</strong> Este es un pre-diagnóstico automatizado y no sustituye 
                            la evaluación de un profesional especializado. Se recomienda consultar con un 
                            especialista en caso de dudas o para una evaluación más completa.
                        </p>
                    </div>
                </div>

                <!-- Pie de página -->
                <div class="footer">
                    <p>© ${new Date().getFullYear()} Dislexia Kids. Todos los derechos reservados.</p>
                    <p>Este reporte fue generado automáticamente el ${new Date().toLocaleDateString(
                      "es-MX"
                    )}</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
// Recomendaciones
const RECOMENDACIONES_DISLEXIA = {
  "Sin síntomas de Dislexia": [
    "Continuar con el apoyo escolar normal y monitorear el desarrollo de lectura/escritura.",
    "Fomentar la lectura y escritura en casa con materiales apropiados para su edad.",
    "Mantener comunicación activa con los maestros para seguir el progreso del niño.",
  ],
  "Dislexia Leve": [
    "Dificultades menores con la lectura y la escritura.",
    "Errores ocasionales en la ortografía.",
    "Lectura más lenta de lo normal, pero generalmente comprensible.",
    "Capacidad para compensar las dificultades con estrategias de aprendizaje.",
  ],
  "Dislexia Moderada": [
    "Problemas más consistentes con la lectura y la escritura.",
    "Errores frecuentes en la ortografía y la gramática.",
    "Lectura significativamente más lenta que la media.",
    "Necesidad de apoyo educativo y estrategias de aprendizaje específicas para manejar el trastorno.",
  ],
  "Dislexia Severa": [
    "Dificultades graves con la lectura y la escritura.",
    "Errores constantes en la ortografía y la gramática.",
    "Lectura extremadamente lenta y con poca comprensión.",
    "Dependencia de ayudas tecnológicas y educativas intensivas.",
    "Problemas con otras habilidades del lenguaje, como la fluidez y la comprensión oral.",
  ],
  "Dislexia Profunda": [
    "Incapacidad casi total para leer y escribir de manera funcional.",
    "Errores persistentes y graves en la ortografía y la gramática.",
    "Gran dificultad para comprender textos escritos.",
    "Requiere apoyo educativo y tecnológico muy intensivo.",
    "Afecta significativamente otras áreas del aprendizaje y el desarrollo personal.",
  ],
};

// Metricas de diagnostico
const CLASIFICACIONES = {
  PRECISION: [
    { min: 8.0, max: 10, puntos: 10, categoria: "Perfecto" },
    { min: 7.0, max: 7.9, puntos: 8, categoria: "Alta Precisión" },
    { min: 5.0, max: 6.9, puntos: 6, categoria: "Precisión Moderada" },
    { min: 3.0, max: 4.9, puntos: 4, categoria: "Baja Precisión" },
    { min: 0.0, max: 2.9, puntos: 2, categoria: "Precisión Muy Baja" },
  ],
  VELOCIDAD: [
    { max: 360, puntos: 10, categoria: "Extremadamente Rápido" },
    { max: 600, puntos: 8, categoria: "Muy Rápido" },
    { max: 900, puntos: 6, categoria: "Velocidad Normal" },
    { max: 1200, puntos: 4, categoria: "Lento" },
    { max: Infinity, puntos: 2, categoria: "Muy Lento" },
  ],
  RESULTADO_FINAL: [
    { min: 10.0, resultado: "Sin síntomas de Dislexia" },
    { min: 7.0, resultado: "Dislexia Leve" },
    { min: 5.0, resultado: "Dislexia Moderada" },
    { min: 3.0, resultado: "Dislexia Severa" },
    { min: 0.0, resultado: "Dislexia Profunda" },
  ],
};

// obtener la puntuación de precisión
const getPrecisionScore = (promedio) => {
  for (const r of CLASIFICACIONES.PRECISION) {
    if (promedio >= r.min && promedio <= r.max) {
      return { puntos: r.puntos, categoria: r.categoria };
    }
  }
  return { puntos: 2, categoria: "Precisión Muy Baja" };
};

//obtener la puntuación de velocidad
const getVelocidadScore = (tiempo) => {
  for (const r of CLASIFICACIONES.VELOCIDAD) {
    if (tiempo <= r.max) {
      return { puntos: r.puntos, categoria: r.categoria };
    }
  }
  return { puntos: 2, categoria: "Muy Lento" };
};

// obtener el resultado final del diagnóstico
const getResultadoDiagnostico = (puntaje) => {
  for (const r of CLASIFICACIONES.RESULTADO_FINAL) {
    if (puntaje >= r.min) {
      return r.resultado;
    }
  }
  return "Dislexia Profunda";
};

router.post("/submit", async (req, res) => {
  try {
    const { userId, email, prueba1, prueba2, prueba3, prueba4, tiempoTotal } =
      req.body;

    // 1. Calcular el puntaje de precisión
    const promedioAciertos = (prueba2 + prueba3 + prueba4) / 3;
    const { puntos: puntajePrecision, categoria: categoriaPrecision } =
      getPrecisionScore(promedioAciertos);

    // 2. Calcular el puntaje de velocidad
    const { puntos: puntajeVelocidad, categoria: categoriaVelocidad } =
      getVelocidadScore(tiempoTotal);

    // 3. Calcular el puntaje final
    const puntajeFinal = (puntajePrecision + puntajeVelocidad) / 2;

    // 4. Resultado del diagnóstico
    const resultadoDiagnostico = getResultadoDiagnostico(puntajeFinal);

    // 5. OBTENER RECOMENDACIONES USANDO LA CLAVE DEL OBJETO
    const recomendaciones =
      RECOMENDACIONES_DISLEXIA[resultadoDiagnostico] || [];

    // Si no hay síntomas, agregamos las recomendaciones genéricas (para que siempre haya contenido)
    if (resultadoDiagnostico === "Sin síntomas de Dislexia") {
      recomendaciones.push(
        ...RECOMENDACIONES_DISLEXIA["Sin síntomas de Dislexia"]
      );
    }

    const detalles = `Precisión: ${categoriaPrecision} (${puntajePrecision} pts), Velocidad: ${categoriaVelocidad} (${puntajeVelocidad} pts).`;

    // 6. Crear y guardar el nuevo documento en la base de datos
    const nuevoReporte = new TestResult({
      userId,
      email: email.toLowerCase(),
      results: { prueba1, prueba2, prueba3, prueba4 },
      tiempoTotal,
      reporteFinal: {
        puntajeFinal,
        resultadoDiagnostico,
        detalles,
        recomendaciones,
      },
    });

    await nuevoReporte.save();

    res.status(201).json({
      message: "Resultados de las pruebas procesados exitosamente",
      diagnostico: {
        email: email,
        prueba1Aciertos: prueba1,
        prueba2Aciertos: prueba2,
        prueba3Aciertos: prueba3,
        prueba4Aciertos: prueba4,
        tiempoTotal: `${tiempoTotal} segundos`,
        promedioAciertos: promedioAciertos.toFixed(2),
        categoriaPrecision: categoriaPrecision,
        puntajePrecision: puntajePrecision,
        categoriaVelocidad: categoriaVelocidad,
        puntajeVelocidad: puntajeVelocidad,
        puntajeFinal: puntajeFinal,
        resultadoDiagnostico: resultadoDiagnostico,
        detalles: detalles,
        recomendaciones: recomendaciones,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Conflicto",
        details:
          "Ya existe un diagnóstico registrado con este correo electrónico.",
      });
    }
    res.status(500).json({
      error: "Error al procesar los resultados de la prueba",
      details: error.message,
    });
  }
});

// --- MÉTODO GET: OBTENER RESULTADO POR CORREO ---
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = email.toLowerCase();

    // Buscar el diagnóstico más reciente para ese email
    const resultado = await TestResult.findOne({ email: normalizedEmail }).sort(
      { createdAt: -1 }
    );

    if (!resultado) {
      return res.status(404).json({
        message:
          "No se encontró ningún diagnóstico para el correo proporcionado.",
      });
    }

    // Devolver solo la información relevante del diagnóstico
    res.status(200).json({
      message: "Diagnóstico encontrado exitosamente.",
      data: {
        email: resultado.email,
        fechaEvaluacion: resultado.createdAt,
        ...resultado.reporteFinal,
        results: resultado.results,
        tiempoTotal: resultado.tiempoTotal,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al buscar el diagnóstico",
      details: error.message,
    });
  }
});

// --- NUEVA RUTA PARA ENVIAR EL REPORTE POR CORREO ---
router.post("/send-report", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ error: "El correo electrónico es requerido." });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    // 1. Buscar el diagnóstico final en la base de datos
    const resultado = await TestResult.findOne({ email: normalizedEmail }).sort(
      { createdAt: -1 }
    );

    if (!resultado) {
      return res
        .status(404)
        .json({
          message:
            "No se encontró ningún diagnóstico para el correo proporcionado.",
        });
    }

    // 2. Construir el objeto completo con TODOS los datos necesarios
    const diagnosticoData = {
      email: resultado.email,
      fechaEvaluacion: resultado.createdAt,
      puntajeFinal: resultado.reporteFinal.puntajeFinal,
      resultadoDiagnostico: resultado.reporteFinal.resultadoDiagnostico,
      detalles: resultado.reporteFinal.detalles,
      recomendaciones: resultado.reporteFinal.recomendaciones,
      results: resultado.results, // ← AÑADIR ESTO
      tiempoTotal: resultado.tiempoTotal // ← Y ESTO
    };

    // 3. Generar el cuerpo del correo
    const htmlContent = generateReportEmailHTML(diagnosticoData);

    // 4. Enviar el correo
    await transporter.sendMail({
      from: "Reporte Dislexia Kids <" + EMAIL + ">",
      to: normalizedEmail,
      subject: `[Diagnóstico Final] Resultados de la Evaluación de Dislexia`,
      html: htmlContent,
    });

    res
      .status(200)
      .json({ success: "Reporte enviado por correo exitosamente." });
  } catch (error) {
    console.error("Error al enviar el reporte por correo:", error);
    res.status(500).json({ error: "Hubo un problema al enviar el reporte." });
  }
});

module.exports = router;
