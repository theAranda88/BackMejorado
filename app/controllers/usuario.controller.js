const UsuarioService = require('../services/usuario.service');

class UsuarioController {
  // Crear un nuevo usuario
  async crearUsuarioC(req, res) {
    try {
      const usuario = await UsuarioService.crearUsuario(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener un usuario por ID
  async obtenerUsuarioC(req, res) {
    try {
      const usuario = await UsuarioService.obtenerUsuarioPorId(req.params.id);
      res.json(usuario);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  // Actualizar un usuario
  async actualizarUsuarioC(req, res) {
    try {
      const usuario = await UsuarioService.actualizarUsuario(req.params.id, req.body);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Eliminar un usuario
  async eliminarUsuarioC(req, res) {
    try {
      const resultado = await UsuarioService.eliminarUsuario(req.params.id);
      res.json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Obtener todos los usuarios
  async obtenerTodosLosUsuariosC(req, res) {
    try {
      const usuarios = await UsuarioService.obtenerTodosLosUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();


// let PersonaService = require('../services/persona.service');

// class PersonaController {
//     static async getAll(req, res) {
//         try {
//             const persona = await PersonaService.getAllPersonas();
//             res.status(200).json(persona);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     }
// }

// module.exports = PersonaController;