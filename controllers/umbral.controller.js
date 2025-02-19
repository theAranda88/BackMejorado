const UmbralService = require('../services/umbral.service')

class UmbralController {

    static async createController(req, res){
        try {
            const result = await UmbralService.createUmbral(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllController(req, res){
        try {
            const umbrales = await UmbralService.findAllUmbrales();
            res.status(200).json(umbrales);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findByIdController(req, res){
        try {
            const umbral = await UmbralService.findUmbralById(req.params.id);
            res.status(200).json(umbral);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async updateController(req, res){
        try {
            const result = await UmbralService.updateUmbral(req.params.id, req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteController(req, res){
        try {
            const result = await UmbralService.deleteUmbral(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UmbralController;