const SensorService = require('../services/sensor.service');
const validadorCampos = require('../middleware/camposRequeridos');

class SensorController {

    static async findAllController(req, res){
        try {
            const sensores = await SensorService.findAllSensores();
            res.status(200).json(sensores);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async findByIdController(req, res){
        try {
            const sensor = await SensorService.findSensorById(req.params.id);
            res.status(200).json(sensor);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async createController(req, res){
        try {
            validadorCampos(['nombre', 'tipo', 'id_hardware'])(req, res, async()=>{
                const sensorData = req.body;

                if (!sensorData.nombre || !sensorData.tipo || !sensorData.id_hardware) {
                    return res.status(400).json({ error: 'Todos los campos son requeridos' });
                }
            
            const sensor = await SensorService.createSensor(req.body);
            res.status(201).json(sensor);
        })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateController(req, res){
        try {
            const sensor = await SensorService.updateSensor(req.params.id, req.body);
            res.status(200).json(sensor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteController(req, res){
        try {
            const sensor = await SensorService.deleteSensor(req.params.id);
            res.status(200).json(sensor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SensorController;