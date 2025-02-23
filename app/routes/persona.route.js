const express = require('express');
const router = express.Router();
const PersonaController = require('../../app/controllers/persona.controller');

// Rutas para Usuario
router.post('/', PersonaController.registerC); //probado
router.get('/:id', PersonaController.findPersonByIdC); //probado
router.put('/:id', PersonaController.updatePersonaC); 
router.delete('/:id', PersonaController.deletePersonaC); //probado
router.get('/', PersonaController.findAllPersonsC); //probado

module.exports = router;