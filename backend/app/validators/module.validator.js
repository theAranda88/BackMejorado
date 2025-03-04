const { param } = require('express-validator');
const { Module } = require('../../models');

const validateListModules = [
        param('farm_id')
            .exists()
            .withMessage('Module ID is required')
            .isNumeric()
            .withMessage('Module ID must be a numeric value')
            .custom(async (farm_id) => {
                const module = await Module.findByPk(farm_id);
                if (!module) {
                    throw new Error(`Module with ID ${id} does not exist in the database`);
                }
                return true;
            }),
    ];

module.exports = { validateListModules };
