const dotenv = require("dotenv");
const express = require("express");
const nodemailer = require('nodemailer');

dotenv.config();
const PASS = process.env.EMAIL_PASS;
const EMAIL = process.env.EMAIL_USER;

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS,
  }
});

// Importación CommonJS
const emailTemplate = require('../templates/emailTemplate');

router.post("/", async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !asunto || !mensaje) {
    return res.status(400).json({ error: "Se requieren todos los campos" });
  }

  try {
    await transporter.sendMail({
      from: 'Formulario de Contacto - DISLEXIA KIDS',
      to: EMAIL,
      subject: asunto,
      html: emailTemplate(nombre, email, asunto, mensaje)
    });

    res.status(200).json({ success: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "Hubo un problema al enviar el correo" });
  }
});

module.exports = router;