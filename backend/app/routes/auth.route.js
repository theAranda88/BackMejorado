const express = require("express");
const router = express.Router();

const { validateUserLogin } = require("../validators/auth.validator");
const {validate} = require("../middleware/validate.middleware");
const AuthController = require("../controllers/auth.controller");
const ValidateTokenMiddleware = require("../middleware/validateToken.middleware");
const TokenGeneratorService = require("../utils/tokenGenerator.service");
const BlackListService = require("../services/blacklist.service");
const AuthService = require("../services/auth.service");


const authService = new AuthService(new BlackListService(), new TokenGeneratorService());
const authController = new AuthController(authService);

const validateTokenMiddleware = new ValidateTokenMiddleware(new BlackListService());

router.post(
    '/login',
    validate(validateUserLogin),
    (req, res) => authController.login(req, res)
);
router.post(
    '/logout',
    validateTokenMiddleware.validate.bind(validateTokenMiddleware),
    (req, res) => authController.logout(req, res)
);

module.exports = router;