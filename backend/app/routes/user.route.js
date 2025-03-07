const express = require('express');
const router = express.Router();

const {validateUserRegistration} =require('../validators/user.validator');
const {validate} = require("../middleware/validate.middleware");
const UserController = require('../controllers/user.controller');
const ValidateTokenMiddleware = require('../middleware/validateToken.middleware');
const BlackListService = require('../services/blacklist.service');
const UserService = require("../services/user.service");
const Mailer = require('../utils/Mailer');

const validateTokenMiddleware = new ValidateTokenMiddleware(new BlackListService());
const mailer = new Mailer(process.env.RESEND_API_KEY);
const userService = new UserService(mailer);
const userController = new UserController(userService);

router.post('/',
    validate(validateUserRegistration),
    (req, res) => userController.register(req, res)
    );
router.get('/',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), UserController.index);
router.get('/:id',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), UserController.find);
router.put('/:id',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), UserController.upgrade);
router.delete('/:id',  validateTokenMiddleware.validate.bind(validateTokenMiddleware), UserController.delete);

module.exports = router;

