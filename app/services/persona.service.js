const { Persona, Rol, Usuario, AdministradorInstructor, Admin } = require('../../models');
const { Sequelize } = require('sequelize'); // Importar Sequelize
const bcrypt = require('bcrypt');
const CrearToken = require('../../middleware/CrearToken');

class PersonaService {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Credenciales necesarias' });
            }
            const [user] = await Persona.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
            const token = await CrearToken(user);
            return res.status(200).json({ 
                message: 'Inicio de sesión exitoso', 
                token,
                user: { id: user.id_persona, identificacion: user.n_documento_identidad } 
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }

    static async getAllPersonas() {
        try {
            const personas = await Persona.findAll({
                attributes: [
                    'id',
                    'nombre',
                    'email',
                    'n_documento_identidad',
                    'sede',
                    [Sequelize.col('rol.nombre'), 'id_rol'],
                    [Sequelize.col('usuario.n_ficha'), 'usuario_ficha'],
                    [Sequelize.col('usuario.jornada'), 'jornada'],
                    [Sequelize.col('usuario.nombre_del_programa'), 'usuario_programa'],
                    [Sequelize.col('instructor.n_ficha'), 'instructor_ficha'],
                    [Sequelize.col('instructor.nombre_del_programa'), 'instructor_programa']
                ],
                include: [
                    {
                        model: Rol,
                        attributes: [],
                        //required: true,
                        as: 'rol' 
                    },
                    {
                        model: Usuario,
                        attributes: [],
                        //required: false,
                        as: 'usuario'
                    },
                    {
                        model: AdministradorInstructor,
                        attributes: [],
                        //required: false,
                        as: 'instructor'
                    }
                ],
                //raw: true
            });

            return personas;
        } catch (error) {
            throw new Error(`Error al obtener personas: ${error.message}`);
        }
    }

    static async register(personaData) {
        try {
            const { nombre, email, password, n_documento_identidad, sede, id_rol, n_ficha, jornada, nombre_del_programa } = personaData;

            // Verificar si la persona ya existe
            const existingPerson = await Persona.findOne({ where: { email } });
            if (existingPerson) {
                throw new Error('La persona ya está registrada');
            }

            // Validar campos obligatorios
            if (!nombre || !email || !password || !n_documento_identidad || !sede || !id_rol) {
                throw new Error('Todos los campos obligatorios deben estar completos');
            }

            // Hashear contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear persona base
            const persona = await Persona.create({
                nombre,
                email,
                password: hashedPassword,
                n_documento_identidad,
                sede,
                id_rol
            });

            // Obtener el id de la persona
            const id_persona = persona.id;

            // Insertar en tabla correspondiente según el id_rol
            if (id_rol === 3) {
                if (!n_ficha || !jornada || !nombre_del_programa) {
                    throw new Error('Datos adicionales necesarios para usuarios: n_ficha, jornada, nombre_del_programa');
                }
                await Usuario.create({
                    n_ficha,
                    jornada,
                    nombre_del_programa,
                    id_persona
                });
            } else if (id_rol === 2) {
                if (!n_ficha || !nombre_del_programa) {
                    throw new Error('Datos adicionales necesarios para instructores: n_ficha, nombre_del_programa');
                }
                await AdministradorInstructor.create({
                    id_persona,
                    n_ficha,
                    nombre_del_programa
                });
            } else if (id_rol === 1) {
                if (!nombre || !email || !password) {
                    throw new Error('Datos necesarios para el ADMIN');
                }
                await Admin.create({
                    nombre,
                    email,
                    password: hashedPassword
                });
            }else {
                throw new Error('Rol no válido');
            }

            return 'Persona registrada exitosamente';
        } catch (error) {
            throw new Error(`Error al crear persona: ${error.message}`);
        }
    }

    static async findPersonById(id) {
        try {
            const person = await Persona.findOne({ where: { id } });
            if (!person) {
                throw new Error('No se encontró la persona.');
            }
            return person;
        } catch (error) {
            throw error;
        }
    }

    static async findAllPersons() {
        try {
            const persons = await Persona.findAll();
            return persons;
        } catch (error) {
            throw error;
        }
    }

    static async findAllUsuarios() {
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            throw error;
        }
    }

    static async findAllInstructores() {
        try {
            const instructores = await AdministradorInstructor.findAll();
            return instructores;
        } catch (error) {
            throw error;
        }
    }

    static async editPersona(id_persona, nuevaPersona) {
        try {
            const persona = await Persona.findByPk(id_persona)
            if (!persona) {
                throw new Error('No se encontró la persona.');
            }
            await persona.update(nuevaPersona);
            return 'Persona editada exitosamente';
        } catch (error) {
            throw error;
        }
    }

    static async deletePersona(id) {
        try {
            const persona = await Persona.findByPk(id);
            if (!persona) {
                throw new Error('No se encontró la persona.');
            }
            await Persona.destroy({ where: { id } });
            return 'Persona eliminada exitosamente';
        } catch (error) {
            throw error;
        }
        }
    
}

module.exports = PersonaService;

