const PersonaService = require('../services/persona.service');

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
 
    static async getAllPersonasC(req, res) {
        try {
            const result = await PersonaService.getAllPersonas();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async registerC(req, res) {
        try {
            const result = await PersonaService.register(req.body);
            res.json({ message: result });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findPersonByIdC(req, res) {
        try {
            const result = await PersonaService.findPersonById(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllPersonsC(req, res) {
        try {
            const result = await PersonaService.getAllPersonas();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllUsuariosC(req, res) {
        try {
            const result = await PersonaService.findAllUsuarios();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async findAllInstructoresC(req, res) {
        try {
            const result = await PersonaService.findAllInstructores();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePersonaC(req, res) {
        try {
            const result = await PersonaService.editPersona(req.params.id, req.body);
            res.json(result);
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

static async deletePersonaC(req, res) {
    try {
        const result = await PersonaService.deletePersona(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

}

module.exports = PersonaController;