const express = require('express');
const router = express.Router();
const SensorController = require('../controllers/sensor.controller');

router.get('/', SensorController.findAllController);
router.get('/:id', SensorController.findByIdController);
router.post('/', SensorController.createController);
router.put('/:id', SensorController.updateController);
router.delete('/:id', SensorController.deleteController);

module.exports = router;
