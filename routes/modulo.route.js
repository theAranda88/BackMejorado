const express = require('express');
const router = express.Router();
const {ListarModulosC, RegistrarModuloC, BuscarModIdC, EditarMod, EliminarMod} = require('../controllers/modulo.controller')
const validarTokenMiddleware = require('../middleware/VerificadorToken')
//rutas de modulo
router.post('/registerModMVC', validarTokenMiddleware, RegistrarModuloC); 
router.get('/moduloIdMVC/:id', validarTokenMiddleware, BuscarModIdC); 
router.get('/listarModuloMVC', ListarModulosC); 
router.put('/editarModuloMVC/:id', validarTokenMiddleware, EditarMod); 
router.delete('/eliminarModuloMVC/:id', validarTokenMiddleware, EliminarMod); 

module.exports = router;