const { Usuario } = require("../../models");
const { Persona } = require("../../models");
class UsuarioService {
  // Crear un nuevo usuario
  async crearUsuario(usuarioData) {
    try {
      const usuario = await Usuario.create(usuarioData);
      return usuario;
    } catch (error) {
      throw new Error('Error al crear el usuario: ' + error.message);
    }
  }

  // Obtener un usuario por ID
  async obtenerUsuarioPorId(idUsuario) {
    try {
      const usuario = await Usuario.findByPk(idUsuario, {
        include: [{ model: db.Persona, as: 'persona' }] // Incluir datos de la persona
      });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Error al obtener el usuario: ' + error.message);
    }
  }

  // Actualizar un usuario
  async actualizarUsuario(idUsuario, nuevosDatos) {
    try {
      const usuario = await Usuario.findByPk(idUsuario);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      await usuario.update(nuevosDatos);
      return usuario;
    } catch (error) {
      throw new Error('Error al actualizar el usuario: ' + error.message);
    }
  }

  // Eliminar un usuario
  async eliminarUsuario(idUsuario) {
    try {
      const usuario = await Usuario.findByPk(idUsuario);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      await usuario.destroy();
      return { mensaje: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }

  // Obtener todos los usuarios
  async obtenerTodosLosUsuarios() {
    try {
      const usuarios = await Usuario.findAll({
        include: [{ model: Persona, as: 'persona' }] // Incluir datos de la persona
      });
      return usuarios;
    } catch (error) {
      throw new Error('Error al obtener los usuarios: ' + error.message);
    }
  }
}

module.exports = new UsuarioService();

