const {User} = require("../../models");
const AuthService = require("../services/auth.service");
const ApiResponse = require("../utils/apiResponse");

class AuthController {

    /**
     *
     * @param {BlackListService} blackListService
     * @param {TokenGeneratorService} tokenGenerator
     */
    constructor(blackListService, tokenGenerator) {
        this.authService = new AuthService(blackListService, tokenGenerator);
    }

    async login(req, res) {

        try {
            const {email, password} = req.body;

            const user = await User.findOne({where: {email}});
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            const token = await this.authService.login(password, user);

            const result = ApiResponse.createApiResponse('Successful login', [{
                token,
                user: {id: user.id, identification: user.n_documento_identidad}
            }]);

            res.json(result);

        } catch (error) {
            console.log('here');
            res.status(400).json({error: error.message});

        }
    }

    async logout(req, res, next) {

        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return res.status(401).json({status: 401, error: 'No token provided'});
            }

            const token = req.headers['authorization'];
            await this.authService.logout(token);
            const response = ApiResponse.createApiResponse('Session closed')
            return res.status(200).json(response);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = AuthController;