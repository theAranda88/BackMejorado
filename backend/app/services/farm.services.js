const { Farm, User } = require('../../models');

class FarmService {
    async create(farmData) {
        try {
            const {name, address, latitude, longitude, users} = farmData;

            const newFarm = await Farm.create({
                name,
                address,
                latitude,
                longitude
            });

            if (users && users.length > 0) {
                const foundUsers = await User.findAll({
                    where: {
                        id: users
                    }
                });

                await newFarm.addUsers(foundUsers);
            }

            return await Farm.findByPk(newFarm.id, {
                include: [{
                    model: User,
                    as: 'users',
                    attributes: ['id', 'name', 'email', 'dni', 'id_rol'],
                    through: {attributes: []}
                }]
            });
        } catch (error) {
            console.error("Error creating farm:", error);
            throw error;
        }
    }

    async findAll() {
        try {
            return await Farm.findAll({
                include: [
                    {
                        as: 'users',
                        model: User,
                        attributes: ['id', 'name', 'email', 'dni', 'id_rol'],
                        through: {attributes: []}
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