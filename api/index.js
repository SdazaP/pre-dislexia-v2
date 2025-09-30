const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

// Configuración de Servidor
const PORT = process.env.PORT;
const cors = require("cors");

app.listen(PORT || 9000,()=>{
    console.log(`server listening on port ${PORT}`);
    
});

// Permite peticiones en formato JSON
app.use(express.json());

// Permite que la API pueda ser consumida por otro dominio
app.use(cors());

//Base de datos
// connect db
mongoose.connect(process.env.MONGOOSEDB_URL).then(()=>console.log("db connected")).then((err)=>{
    err
});


// Ruta de prueba
app.get('/prueba', (req, res) => {
  res.send('Mensaje de prueba');
});

//Ruta formulario
const contactoRoutes = require("./routes/Contacto");
app.use("/api/contacto", contactoRoutes);

//Ruta Instituciones
const Institucion = require("./routes/Institucion")
app.use('/api/instituciones', Institucion);

//Rutas Pruebas
const Pruebas = require('./routes/Prueba');
app.use('/api/pruebas/', Pruebas);