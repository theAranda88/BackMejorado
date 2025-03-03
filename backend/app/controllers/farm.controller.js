const ApiResponse = require("../utils/apiResponse");

class FarmController {

    /**
     *
     * @param {FarmService} farmService
     */
    constructor(farmService) {
        this.farmService = farmService;
    }

    async index(req, res) {
        try {
            const result = await this.farmService.findAll();
            const response = ApiResponse.createApiResponse("All farms retrieved successfully", result)
            return res.json(response);
        } catch (error) {
            res.status(500).json({ error: `Failed to retrieve farms: ${error.message}` });
        }
    }
}

module.exports = FarmController;