'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const basename = path.basename(__filename);
const mysql2 = require('mysql2')
const db = {};


const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    dialectModule: mysql2,
}

let sequelize;

sequelize = new Sequelize(config.database, config.username, config.password, config);


// Cargar modelos
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        try {
            console.log("Cargando modelo:", file); // 👀 Identifica el archivo
            const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        } catch (error) {
            console.error(">>> Error en el archivo:", file); // Mostrará el modelo con error
            throw error;
        }
    });

// Ejecutar associate si existe
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;

module.exports = db;