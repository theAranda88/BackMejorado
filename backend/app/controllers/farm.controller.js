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

    async create(req, res) {
        try {
            const { name, address, latitude, longitude, users = [] } = req.body;
            
            const newFarm = await this.farmService.create({
                name,
                address,
                latitude,
                longitude,
                users
            });

            const response = ApiResponse.createApiResponse(
                "Farm created successfully", 
                newFarm
            );
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating farm:", error);
            const response = ApiResponse.createApiResponse(
                "Failed to create farm", 
                [], 
                [{ msg: error.message }]
            );
            return res.status(500).json(response);
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const farm = await this.farmService.findById(id);
            
            const response = ApiResponse.createApiResponse(
                "Farm retrieved successfully", 
                farm
            );
            return res.json(response);
        } catch (error) {
            console.error("Error retrieving farm:", error);
            const response = ApiResponse.createApiResponse(
                "Failed to retrieve farm", 
                [], 
                [{ msg: error.message }]
            );
            
            if (error.message.includes("not found")) {
                return res.status(404).json(response);
            }
            
            return res.status(500).json(response);
        }
    }
}

module.exports = FarmController;

