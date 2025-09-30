const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const TestResult = require("../models/ResultadosTest");
const router = express.Router();

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
    ]
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
    const { userId, email, prueba1, prueba2, prueba3, prueba4, tiempoTotal } = req.body;

    // 1. Calcular el puntaje de precisión
    const promedioAciertos = (prueba2 + prueba3 + prueba4) / 3;
    const { puntos: puntajePrecision, categoria: categoriaPrecision } = getPrecisionScore(promedioAciertos);

    // 2. Calcular el puntaje de velocidad
    const { puntos: puntajeVelocidad, categoria: categoriaVelocidad } = getVelocidadScore(tiempoTotal);

    // 3. Calcular el puntaje final
    const puntajeFinal = (puntajePrecision + puntajeVelocidad) / 2;

    // 4. Resultado del diagnóstico
    const resultadoDiagnostico = getResultadoDiagnostico(puntajeFinal);

     // 5. OBTENER RECOMENDACIONES USANDO LA CLAVE DEL OBJETO
    const recomendaciones = RECOMENDACIONES_DISLEXIA[resultadoDiagnostico] || [];
    
    // Si no hay síntomas, agregamos las recomendaciones genéricas (para que siempre haya contenido)
    if (resultadoDiagnostico === "Sin síntomas de Dislexia") {
        recomendaciones.push(...RECOMENDACIONES_DISLEXIA["Sin síntomas de Dislexia"]);
    }

    const detalles = `Precisión: ${categoriaPrecision} (${puntajePrecision} pts), Velocidad: ${categoriaVelocidad} (${puntajeVelocidad} pts).`;


    // 5. Crear y guardar el nuevo documento en la base de datos
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
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al procesar los resultados de la prueba",
      details: error.message,
    });
  }
});

router.get("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const normalizedEmail = email.toLowerCase();

        // Buscar el diagnóstico más reciente para ese email
        const resultado = await TestResult.findOne({ email: normalizedEmail }).sort({ createdAt: -1 });

        if (!resultado) {
            return res.status(404).json({
                message: "No se encontró ningún diagnóstico para el correo proporcionado.",
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

module.exports = router;