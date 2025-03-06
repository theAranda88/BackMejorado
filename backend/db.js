const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config(); 

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida exitosamente.');
        connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

module.exports = pool;
