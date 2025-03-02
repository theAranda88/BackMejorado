const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validateTokenMiddleware = require('../middleware/validateToken.middleware');


router.post('/', userController.register);
router.get('/',validateTokenMiddleware.validate, userController.index);
router.get('/:id', validateTokenMiddleware.validate, userController.find);
router.put('/:id', validateTokenMiddleware.validate, userController.upgrade);
router.delete('/:id', validateTokenMiddleware.validate, userController.delete);

module.exports = router;

