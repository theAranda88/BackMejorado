const pool = require('../db');

class SensorModel {

    static async findAll(){
        const [rows] = await pool.execute(`SELECT * FROM sensor`);
        return rows;
    }

    static async findById(id_sensor){
        const [rows] = await pool.execute(`SELECT * FROM sensor WHERE id_sensor =?`, [id_sensor]);
        return rows[0];
    }

    static async create(nombre, tipo, id_hardware) {
        const [result] = await pool.execute(
          'INSERT INTO sensor (nombre, tipo, id_hardware) VALUES (?, ?, ?)',
          [nombre, tipo, id_hardware]
        );
        return result.insertId;
      }

      static async update(id_sensor, nombre, tipo, id_hardware) {
        const [result] = await pool.execute(
          'UPDATE sensor SET nombre =?, tipo =?, id_hardware =? WHERE id_sensor =?',
          [nombre, tipo, id_hardware, id_sensor]
        );
        return result.affectedRows > 0;
      }

      static async delete(id_sensor) {
        const [result] = await pool.execute('DELETE FROM sensor WHERE id_sensor =?', [id_sensor]);
        return result.affectedRows > 0;
      }

      static async findByIdHardware(id_hardware){
        const [rows] = await pool.execute(`SELECT * FROM sensor WHERE id_hardware =?`, [id_hardware]);
        return rows;
      }
}

module.exports = SensorModel;