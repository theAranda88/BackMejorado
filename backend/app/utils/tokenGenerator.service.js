const jwt = require('jsonwebtoken');

class TokenGeneratorService {
    async generateToken(user) {
        const { id_persona, dni } = user;
        const payload = { id_persona, dni };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: '5h' };
        return jwt.sign(payload, secret, options);
    }
}
module.exports = TokenGeneratorService;