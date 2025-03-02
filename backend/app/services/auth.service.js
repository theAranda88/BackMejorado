const bcrypt = require("bcrypt");
const MiddlewareCrearToken = require("../../middleware/CrearToken.Orm");
const ListaNegraService = require("./ListaNegra");

class AuthService {
    async login(password, user) {

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw Error(`Password not match`);
        }

        return await MiddlewareCrearToken.CrearToken(user);

    }

    static async logout(token) {
        try {
            await ListaNegraService.agregarToken(token);
            const result =  { message: 'Session closed successfully' };
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;