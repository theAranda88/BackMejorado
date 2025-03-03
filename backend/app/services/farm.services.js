const { Farm, User } = require('../../models');

class FarmService {
     async findAll(){
        try {
            return await Farm.findAll({
                include: [
                    {
                        as: 'users',
                        model: User,
                        attributes: ['id', 'name', 'email', 'dni', 'id_rol'],
                        through: { attributes: [] }
                    }
                ]
            });
        } catch (error) {
            console.error("Error fetching farms:", error);
            throw error;
        }
    }
}

module.exports = FarmService;