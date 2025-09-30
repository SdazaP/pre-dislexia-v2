const mongoose = require('mongoose');

const ResultadosTestEsquema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  userId: {
    type: String,
    required: true,
  },
  results: {
    prueba1: { type: Number, default: 0 }, // Cuestionario para Padres
    prueba2: { type: Number, default: 0 }, // Patrones de Figuras
    prueba3: { type: Number, default: 0 }, // Relación de Palabra-Imagen
    prueba4: { type: Number, default: 0 }, // Completa la Palabra
  },
  tiempoTotal: {
    type: Number,
    required: true,
  },
  reporteFinal: {
    puntajeFinal: { type: Number, default: 0 },
    resultadoDiagnostico: { type: String, default: "Sin síntomas de dislexia" },
    detalles: { type: String, default: "" },
    recomendaciones: [{ type: String }],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ResultadoTest', ResultadosTestEsquema);
