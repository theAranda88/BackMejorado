const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const personRoutes = require('./routes/persona.route');
const moduloRoutes = require('./routes/modulo.route');
const bitacoraRoutes = require('./routes/bitacora.route');
const umbralRoutes = require('./routes/umbral.route');
const sensorRoutes = require('./routes/sensor.route');
const personaRoutes = require('./app/routes/persona.route');
const ListaNegraService = require('./app/services/ListaNegra');
const cors = require('cors');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny')); 
app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.use(cors({
    origin: ['http://localhost:3001', 'https://backmejorado.onrender.com', 'https://acuaterra-app.netlify.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
  }));

 
app.options('*', cors()); 

//--------------Rutas con implementacion del orm sequelize-------------------------------
app.use('/api/v2/users', personaRoutes);

//--------------Rutas con Cosnultas sql-------------------------------
app.use('/api/users', personRoutes); 
app.use('/api/modulos', moduloRoutes);
app.use('/api/bitacora', bitacoraRoutes);
app.use('/api/umbral', umbralRoutes);
app.use('/api/sensor', sensorRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Servidor corriendo en http://192.168.100.7:${PORT}`);
});


setInterval(() => {
  ListaNegraService.vaciarListaNegra()
    .catch(error => console.error('Error al vaciar la lista negra:', error));
}, 3600 * 1000); 
