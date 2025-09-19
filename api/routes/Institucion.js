const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const institucion = require('../models/Institucion.js');

const router = express.Router();

// GET Obtener todas las instituciones activas
router.get('/', async (req, res) => {
  try {
    const instituciones = await institucion.find();
    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener instituciones',
      details: error.message 
    });
  }
});

module.exports = router;