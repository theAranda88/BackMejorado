const {Persona} = require("../../models");
const AuthService = require("../services/auth.service");
const ApiResponse = require("../utils/apiResponse");

class AuthController {
    static async loginC(req, res) {

        try {
            const { email, password } = req.body;

            const user = await Persona.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const auth = new AuthService();
            const token = await auth.login(password, user);

            const result = ApiResponse.createApiResponse('Successful login', {
                token,
                user: { id: user.id, identification: user.n_documento_identidad }
            } )

            res.json(result);

        } catch (error) {

            res.status(400).json({ error: error.message });

        }
    }

    static async logoutC(req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return res.status(401).json({status: 401, error: 'No se proporcionó un token de autenticación'})
            }

            const token = req.headers['authorization'];
            await AuthService.logout(token);
            const response = ApiResponse.createApiResponse('Session closed successfully', token)
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;