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
        const farmId = req.params.farm_id;
        try {
            const result = await this.moduleService.findAll(farmId);
            const response = ApiResponse.createApiResponse("All modules retrieved successfully", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: `Failed to retrieve modules: ${error.message}` });
        }
    }
}

module.exports = ModuleController;

