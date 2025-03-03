const { User, Rol } = require('../../models');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const Mailer = require('../utils/Mailer')

class UserService {
    constructor() {
        this.mailer = new Mailer(process.env.RESEND_API_KEY);
    }

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
            const { name, email, dni, id_rol, address } = userData;

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('El usuario ya está registrado');
            }

            if (!name || !email || !dni || !id_rol || !address) {
                throw new Error('Todos los campos obligatorios deben estar completos');
            }

            const tempPassword = Math.random().toString(36).slice(-8); // Genera una contraseña aleatoria
            const hashedPassword = await bcrypt.hash(tempPassword, 10);

            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                dni,
                id_rol,
                address,
            });

            const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?userId=${user.id}`;
            const subject = 'Registro Exitoso - Credenciales de Acceso - Configura tu contraseña';
            const htmlContent = `
                <h2>¡Bienvenido, ${name}!</h2>
                <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contraseña temporal:</strong> ${tempPassword}</p>
                <p>Por favor, cambia tu contraseña después de iniciar sesión.</p>
                <p>Puedes cambiar tu contraseña haciendo clic en el siguiente enlace:</p>
                <p><a href="${resetPasswordUrl}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Actualizar Contraseña</a></p>
                <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <p>${resetPasswordUrl}</p>
            `;

            await this.mailer.sendEmail(email, subject, htmlContent, process.env.RESEND_FROM_EMAIL);

            const { password, ...userWithoutPassword } = user.dataValues;
            return userWithoutPassword;

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

