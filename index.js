const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const personRoutes = require('./routes/persona.route');
const moduloRoutes = require('./routes/modulo.route');
const cors = require('cors');

const app = express();

app.use(express.json()); // Permite manejar datos JSON en las solicitudes
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', personRoutes, moduloRoutes);

dotenv.config();
//app.use(cors({ origin: 'http://192.168.100.7' }));  // Asegúrate de usar http:// si es una URL
app.use(cors());

const PORT = process.env.PORT || 3000;

// Solo necesitas esta línea para escuchar en la IP local o en todas las interfaces de red
app.listen(PORT, '0.0.0.0', () => { // '0.0.0.0' acepta conexiones de cualquier dirección IP
    console.log(`Servidor corriendo en http://192.168.100.7:${PORT}`);
});
