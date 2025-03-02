const { Listanegra } = require('../../models_bck');

class ListaNegraService {
  static async agregarToken(token) {
    try {
      const resultado = await Listanegra.create( {token} );
      return resultado;
    } catch (error) {
      throw new Error(`Error al agregar el token: ${error.message}`);
    }
  }

  static async tokenEnListaNegra(token) {
    try {
      console.log('Token utilizado en la consulta:', token);
      console.log(Listanegra);
      const resultado = await Listanegra.count({ where: { token } });
      console.log(resultado);
      return resultado ;
       // Devuelve `true` si el token existe, `false` si no
    } catch (error) {
      throw new Error(`Error al verificar el token: ${error.message}`);
    }
  }

  static async eliminarToken(token) {
    try {
      const resultado = await Listanegra.destroy({ where: { token } });
      return resultado;
    } catch (error) {
      throw new Error(`Error al eliminar el token: ${error.message}`);
    }
  }

  static async obtenerTodosLosTokens() {
    try {
      const tokens = await Listanegra.findAll({
        attributes: ['token', 'created_at'],
      });
      return tokens;
    } catch (error) {
      throw new Error(`Error al obtener los tokens: ${error.message}`);
    }
  }

  static async vaciarListaNegra() {
    try {
      const resultado = await Listanegra.destroy({ where: {}, truncate: true });
      console.log('Lista negra vaciada exitosamente');
      return resultado;
    } catch (error) {
      throw new Error(`Error al vaciar la lista negra: ${error.message}`);
    }
  }
}

module.exports = ListaNegraService;