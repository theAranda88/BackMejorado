const { Module, User, Farm } = require('../../models');

class ModuleService {
    async findAll(farmId) {
        try {
            return await Module.findAll({
                include: [
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['id', 'name', 'email', 'dni', 'id_rol']
                    },
                    {
                        model: Farm,
                        as: 'farm',
                        attributes: ['id', 'name', 'address', 'latitude', 'longitude']
                    }
                ],
                where: {
                    id_farm: farmId
                }
            });
        } catch (error) {
            console.error("Error fetching modules:", error);
            throw error;
        }
    }
}

module.exports = ModuleService;

