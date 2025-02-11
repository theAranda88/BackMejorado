const express = require('express');
const router = express.Router();
const {
    findAllBitacorasC,
    findBitacoraByIdC,
    createBitacoraC,
    updateBitacoraC,
    deleteBitacoraC,
} = require('../controllers/bitacora.controller');

router.get('/', findAllBitacorasC);
router.get('/:id', findBitacoraByIdC);
router.post('/', createBitacoraC);
router.put('/:id', updateBitacoraC);
router.delete('/:id', deleteBitacoraC);

module.exports = router;