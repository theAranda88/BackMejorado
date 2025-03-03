const express = require("express");
const router = express.Router();
const FarmService = require("../services/farm.services");
const FarmController = require("../controllers/farm.controller");
const ValidateTokenMiddleware = require("../middleware/validateToken.middleware");
const BlackListService = require("../services/blacklist.service");

const validateTokenMiddleware = new ValidateTokenMiddleware(new BlackListService());
const farmService = new FarmService();
const farmController = new FarmController(farmService);

//Create a new farm
router.post(
    '/',
    validateTokenMiddleware.validate.bind(validateTokenMiddleware),
    validate(validateFarmCreation),
    (req, res) => farmController.create(req, res)
);

//Get all farms
router.get(
    '/',
    validateTokenMiddleware.validate.bind(validateTokenMiddleware),
    (req, res) => farmController.index(req, res)
);

module.exports = router;

