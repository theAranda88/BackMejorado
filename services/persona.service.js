const Persona = require('../models/persona.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const Login = async function (email, password) {
        const [personaResult] = await Persona.findByEmail(email);

        if (personaResult.length === 0) {
            throw new Error('Credenciales inválidas');
        }

        const user = personaResult[0];

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Credenciales inválidas');
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id_persona: user.id_persona, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            message: 'Login exitoso',
            token,
            user: { id: user.id_persona, nombre: user.nombre, email: user.email, rol: user.rol },
        };
}
const FindPersonsById = async function (id_persona) {
    try {
        const person = await Persona.findOnePersona(id_persona);
        if (!person) {
            throw new Error('No se encontró la persona.');
        }
        return person;
    } catch (error) {
        throw error;
    }
}
const FindAllPersons = async function (){
    try {
        const persons = await Persona.findAllPer({});
        return persons;
    } catch (error) {
        throw error;
    }
}
const FindAllUsuarios = async function () {
    try {
        const usuarios = await Persona.findAllUsu({});
        return usuarios;
    } catch (error) {
        throw error;
    }
}
const FindAllInstructores = async function () {
    try {
        const instructor = await Persona.findAllInstru({});
        return instructor;
    } catch (error) {
        throw error;
    }
}
const RegisterPerson = async function (data) {
    const { nombre, email, password, n_documento_identidad, sede, rol, n_ficha, jornada, nombre_del_programa } = data;

    // Verificar si la persona ya existe
    const [existingPerson] = await Persona.findByEmail(email);
    if (existingPerson.length > 0) {
        throw new Error('La persona ya está registrada');
    }

    // Validar campos obligatorios
    if (!nombre || !email || !password || !n_documento_identidad || !sede || !rol) {
        throw new Error('Todos los campos obligatorios deben estar completos');
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear persona base
    const id_persona = await Persona.createPersona(nombre, email, hashedPassword, n_documento_identidad, sede, rol);

    // Insertar en tabla correspondiente según el rol
    if (rol === 3) {
        if (!n_ficha || !jornada || !nombre_del_programa) {
            throw new Error('Datos adicionales necesarios para usuarios: n_ficha, jornada, nombre_del_programa');
        }
        await Persona.createUsuario(id_persona, n_ficha, jornada, nombre_del_programa);
    } else if (rol === 2) {
        if (!n_ficha || !nombre_del_programa) {
            throw new Error('Datos adicionales necesarios para instructores: n_ficha, nombre_del_programa');
        }
        await Persona.createInstructor(id_persona, n_ficha, nombre_del_programa);
    } else {
        throw new Error('Rol no válido');
    }

    return 'Persona registrada exitosamente';
};

module.exports = {
    FindPersonsById,
    FindAllPersons,
    RegisterPerson,
    Login,
    FindAllUsuarios,
    FindAllInstructores
}
    