const { validate } = require ("../middleware/validate.middleware");
const { loginValidatorRules } = require ("../validators/person.validator");
const express = require('express');
const router = express.Router();
const PersonaController = require('../controllers/person.controller');
const VerificadorToken = require('../../middleware/VerificadorToken.Orm');

router.post('/', PersonaController.registerC);
router.post('/login', validate(loginValidatorRules), PersonaController.loginC);
router.get('/',VerificadorToken.validador, PersonaController.findAllPersonsC);
router.get('/:id', VerificadorToken.validador,PersonaController.findPersonByIdC);
router.put('/:id',VerificadorToken.validador, PersonaController.updatePersonaC);
router.delete('/:id', VerificadorToken.validador,PersonaController.deletePersonaC);
router.post('/logout', VerificadorToken.validador, PersonaController.logoutC);

module.exports = router;