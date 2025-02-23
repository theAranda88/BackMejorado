const pool = require('../db');

class UmbralModel {

    static async create(id_sensor, valor_min, valor_max ){
        const [result] = await pool.query(
            'INSERT INTO umbral (id_sensor, valor_min, valor_max) VALUES (?, ?, ?)',
        [id_sensor, valor_min, valor_max]
        );
        return result.insertId;
    }

    static async findAll(){
        const [rows] = await pool.query('SELECT * FROM umbral');
        return rows;
    }

    static async findById(id_umbral){
        const [rows] = await pool.query('SELECT * FROM umbral WHERE id_umbral =?', [id_umbral]);
        return rows[0];
    }

    static async update(id_umbral, id_sensor, valor_min, valor_max){
        const [result] = await pool.query(
            'UPDATE umbral SET id_sensor = ?, valor_min = ?, valor_max = ? WHERE id_umbral = ?',
            [id_sensor, valor_min, valor_max, id_umbral]
            );
            return result.affectedRows > 0;
    }

    static async delete(id_umbral){
        const [result] = await pool.query('DELETE FROM umbral WHERE id_umbral =?', [id_umbral]);
        return result.affectedRows > 0;
    }
}

module.exports = UmbralModel;