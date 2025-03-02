// middlewares/validarToken.js
const jwt = require('jsonwebtoken');
const ListaNegraService = require('../app/services/ListaNegra');

class ValidarTokenMiddleware {
  static async validador(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
      const tokenEnLista = await ListaNegraService.tokenEnListaNegra(token);      
      if (tokenEnLista) {
        return res.status(401).json({ error: 'Token en lista negra' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token no válido' });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ValidarTokenMiddleware;