const PersonaService = require('../services/persona.service');
const ApiResponse = require('../utils/apiResponse')

class PersonaController {
    static async loginC(req, res) {
        try {
            const result = await PersonaService.login(req, res);
            if (res.headersSent) {
                return; //Si se han enviado encabezados, se sale de la función sin intentar enviar la respuesta JSON. 
            }           //De esta manera, se evita el error de encabezados HTTP enviados.
            res.json(result);
        } catch (error) {
            if (res.headersSent) {
                return;
            }
            res.status(500).json({ error: error.message });
        }
    }
 
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

static async logoutC(req, res, next) {
    try {        
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({status: 401, error: 'No se proporcionó un token de autenticación'})
        }

        const token = req.headers['authorization'];
        await PersonaService.logout(token);
        const response = ApiResponse.createApiResponse('Session closed successfully', token)
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

}

module.exports = PersonaController;