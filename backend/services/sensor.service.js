const SensorModel = require('../models.sql_bck/sensor.model');

class SensorService {

    static async findAllSensores(){
        return await SensorModel.findAll();
    }
    
    static async findSensorById(id_sensor){
        const sensor = await SensorModel.findById(id_sensor);
        if (!sensor) throw new Error('Sensor no encontrado');
        return sensor;
    }

    static async createSensor(data){
        const {nombre, tipo, id_hardware} = data;
        if (!nombre || !tipo || !id_hardware) throw new Error('Campos obligatorios para crear el recurso');
        const insertId = await SensorModel.create(nombre, tipo, id_hardware);
        return {
                    mensaje: 'Sensor creado con exito',
                    id_sensor: insertId  
                };
    }

    static async updateSensor(id_sensor, nuevoSensor){
        const {nombre, tipo, id_hardware} = nuevoSensor;
        const update = await SensorModel.update(id_sensor, nombre, tipo, id_hardware );
        if (!update) throw new Error('No se pudo actualizar el sensor');
        return {
            mensaje: 'Sensor actualizado con exito',
            id_sensor: id_sensor
            };
    }

    static async deleteSensor(id_sensor){
        const deleted = await SensorModel.delete(id_sensor);
        if (!deleted) throw new Error('No se pudo eliminar el sensor');
        return {
            mensaje: 'Sensor eliminado con exito',
            id_sensor: id_sensor
            };
        }
}

module.exports = SensorService;
