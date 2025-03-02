const express = require('express');
const router = express.Router();
const UmbralController = require('../controllers/umbral.controller');

router.get('/', UmbralController.findAllController);
router.get('/:id', UmbralController.findByIdController);
router.post('/', UmbralController.createController);
router.put('/:id', UmbralController.updateController);
router.delete('/:id', UmbralController.deleteController);

module.exports = router;