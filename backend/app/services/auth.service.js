const bcrypt = require("bcrypt");

class AuthService {

    /**
     * @param {BlackListService} blackListService
     * @param {TokenGeneratorService} tokenGenerator
     */
    constructor(blackListService, tokenGenerator) {
        this.blackListService = blackListService;
        this.tokenGenerator = tokenGenerator;
    }

    async login(password, user) {

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw Error(`Password not match`);
        }

        return await this.tokenGenerator.generateToken(user);

    }

    async logout(token) {
        try {
            await this.blackListService.addToken(token);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;