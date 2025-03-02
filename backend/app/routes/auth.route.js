const express = require("express");
const router = express.Router();

const { validateUserLogin } = require("../validators/auth.validator");
const {validate} = require("../middleware/validate.middleware");
const AuthController = require("../controllers/auth.controller");
const ValidateTokenMiddleware = require("../middleware/validateToken.middleware");
const TokenGeneratorService = require("../utils/tokenGenerator.service");
const BlackListService = require("../services/blacklist.service");

const authController = new AuthController(new BlackListService(), new TokenGeneratorService());

router.post('/login', validate(validateUserLogin), (req, res) => authController.login(req, res));
router.post('/logout', ValidateTokenMiddleware.validate, (req, res) => authController.logout(req, res));

module.exports = router;