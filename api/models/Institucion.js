const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: function(url) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);
      },
      message: 'URL de imagen no válida'
    }
  },
  descripcion: {
    type: String,
    required: true,
    maxlength: 500
  },
  telefono: {
    type: String,
    required: false,
    match: [/^[\+]?[1-9][0-9]{7,14}$/, 'Número de teléfono no válido']
  },
  correo: {
    type: String,
    required: false,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email no válido']
  },
  ubicacion: {
    type: String, // Código iframe de Google Maps
    required: true
  },
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
InstitutionSchema.index({ nombre: 'text', descripcion: 'text' });

const Institution = mongoose.model('Institution', InstitutionSchema);

module.exports = Institution;