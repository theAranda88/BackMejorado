const express = require('express');
const router = express.Router();
const UsuarioController = require('../../app/controllers/usuario.controller');

// Rutas para Usuario
router.post('/', UsuarioController.crearUsuarioC);
router.get('/:id', UsuarioController.obtenerUsuarioC);
router.put('/:id', UsuarioController.actualizarUsuarioC);
router.delete('/:id', UsuarioController.eliminarUsuarioC);
router.get('/', UsuarioController.obtenerTodosLosUsuariosC);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// let PersonaController = require('../controllers/persona.controller')

// router.get('/', PersonaController.getAll);

// module.exports = router;