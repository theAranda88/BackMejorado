const { User, Rol } = require('../../models');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

class UserService {

    static async getAllUsers() {
        try {
            return await User.findAll({
                attributes: [
                    'id',
                    'name',
                    'email',
                    'dni',
                    [Sequelize.col('rol.name'), 'id_rol']
                ],
                include: [
                    {
                        model: Rol,
                        attributes: [],
                        as: 'rol'
                    }
                ]
            });
        } catch (error) {
            throw new Error(`Error getting users: ${error.message}`);
        }
    }

    async register(userData) {
        try {
            const { name, email, password, dni, id_rol, address } = userData;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('El usuario ya está registrado');
            }

            if (!name || !email || !password || !dni || !id_rol || !address) {
                throw new Error('Todos los campos obligatorios deben estar completos');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                dni,
                id_rol,
                address,
            });

            const userDataResponse = user.toJSON();
            delete userDataResponse.password;

            return userDataResponse;
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    static async findUserById(id) {
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                throw new Error('No se encontró el usuario.');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async findAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async findUsersByRole(roleId) {
        try {
            const users = await User.findAll({
                where: { id_rol: roleId },
                include: [
                    {
                        model: Rol,
                        as: 'rol'
                    }
                ]
            });
            return users;
        } catch (error) {
            throw error;
        }
    }

    static async editUser(id_user, nuevoUser) {
        try {
            // Hash password if it's being updated
            if (nuevoUser.password) {
                nuevoUser.password = await bcrypt.hash(nuevoUser.password, 10);
            }
            
            const user = await User.findByPk(id_user)
            if (!user) {
                throw new Error('No se encontró el usuario.');
            }
            await user.update(nuevoUser);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('No se encontró el usuario.');
            }
            await User.destroy({ where: { id } });
            return user;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = UserService;

