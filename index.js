const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const personRoutes = require('./routes/persona.route');
const moduloRoutes = require('./routes/modulo.route');
const bitacoraRoutes = require('./routes/bitacora.route');
const cors = require('cors');
const app = express();

app.use(express.json()); // Permite manejar datos JSON en las solicitudes
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.use(cors({
    origin: ['http://localhost:3001', 'https://backmejorado.onrender.com', 'https://calm-squirrel-f7b586.netlify.app/'], // Origen permitido (tu frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
    credentials: true, // Permitir credenciales (ej: cookies, headers de autenticación)
  }));//permite que cualquier origen acceda a los recursos de la aplicación

  // Manejar solicitudes OPTIONS
app.options('*', cors()); // Habilita CORS para todas las rutas y métodos

app.use('/api/users', personRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/bitacora', bitacoraRoutes);

const PORT = process.env.PORT || 3000;

// Solo necesitas esta línea para escuchar en la IP local o en todas las interfaces de red
app.listen(PORT, '0.0.0.0', () => { // '0.0.0.0' acepta conexiones de cualquier dirección IP
    console.log(`Servidor corriendo en http://192.168.100.7:${PORT}`);
});

