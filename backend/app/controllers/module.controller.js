const ApiResponse = require("../utils/apiResponse");

class ModuleController {

    /**
     *
     * @param {ModuleService} moduleService
     */
    constructor(moduleService) {
        this.moduleService = moduleService;
    }

    async index(req, res) {
        try {
            const result = await this.moduleService.findAll();
            const response = ApiResponse.createApiResponse("All modules retrieved successfully", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: `Failed to retrieve modules: ${error.message}` });
        }
    }
}

module.exports = ModuleController;

