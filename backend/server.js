const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoues = require('./app/routes/user.route');
const authRoutes = require('./app/routes/auth.route');
const BlackListService = require('./app/services/blacklist.service');
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
app.use('/api/v2/users', userRoues);
app.use('/api/v2/auth', authRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


setInterval(() => {
    (new BlackListService).cleanBlackList()
    .catch(error => console.error('Error al vaciar la lista negra:', error));
}, 3600 * 1000); 
