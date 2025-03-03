const PersonaService = require('../services/person.service');
const ApiResponse = require('../utils/apiResponse')
const {User} = require("../../../models");


class PersonController {

    static async registerC(req, res) {
        try {
            const result = await PersonaService.register(req.body);
            const results = ApiResponse.createApiResponse('Successfully registered person', result);
            return res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findPersonByIdC(req, res) {
        try {
            const result = await PersonaService.findPersonById(req.params.id);
            const results = ApiResponse.createApiResponse('Person found', result);
            return res.json(results);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllPersonsC(req, res) {
        try {
            const result = await PersonaService.getAllPersonas();
            const response = ApiResponse.createApiResponse("Users successfully obtained", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllUsuariosC(req, res) {
        try {
            const result = await PersonaService.findAllUsuarios();
            const response = ApiResponse.createApiResponse("Users successfully obtained", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllInstructoresC(req, res) {
        try {
            const result = await PersonaService.findAllInstructores();
            const response = ApiResponse.createApiResponse("Instructores successfully obtained", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePersonaC(req, res) {
        try {
            const result = await PersonaService.editPersona(req.params.id, req.body);
            const response = ApiResponse.createApiResponse("Persona updated successfully", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

static async deletePersonaC(req, res) {
    try {
        const result = await PersonaService.deletePersona(req.params.id);
        const response = ApiResponse.createApiResponse("Persona deleted successfully", result)
        return res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

}

module.exports = PersonController;