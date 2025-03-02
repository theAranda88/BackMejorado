// middlewares/validarToken.js
const jwt = require('jsonwebtoken');
const BlackListService = require('../services/blacklist.service');

class ValidateTokenMiddleware {
  static async validate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token there is not' });
    }

    try {
      const blackListService = new BlackListService();
      const isTokenInBlackList = await blackListService.isTokenInBlackList(token);
      if (isTokenInBlackList) {
        return res.status(401).json({ error: 'Token In Black List' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token not valid' });
        }

        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ValidateTokenMiddleware;