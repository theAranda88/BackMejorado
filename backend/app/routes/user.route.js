const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const ValidateTokenMiddleware = require('../middleware/validateToken.middleware');
const BlackListService = require('../services/blacklist.service');

const validateTokenMiddleware = new ValidateTokenMiddleware(new BlackListService());

router.post('/', userController.register);
router.get('/',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), userController.index);
router.get('/:id',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), userController.find);
router.put('/:id',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), userController.upgrade);
router.delete('/:id',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), userController.delete);

module.exports = router;

