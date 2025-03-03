const express = require("express");
const router = express.Router();
const ModuleService = require("../services/module.services");
const ModuleController = require("../controllers/module.controller");
const ValidateTokenMiddleware = require("../middleware/validateToken.middleware");
const BlackListService = require("../services/blacklist.service");
const ValidateRoleMiddleware = require("../middleware/validateRole.middleware");
const Role = require("../enums/roles.enum");

const validateTokenMiddleware = new ValidateTokenMiddleware(new BlackListService());
const validateRoleMiddleware = new ValidateRoleMiddleware();
const moduleService = new ModuleService();
const moduleController = new ModuleController(moduleService);

// Get all modules
router.get(
    '/',
    validateTokenMiddleware.validate.bind(validateTokenMiddleware),
    validateRoleMiddleware.validate([Role.ADMIN]),
    (req, res) => moduleController.index(req, res)
);

module.exports = router;

