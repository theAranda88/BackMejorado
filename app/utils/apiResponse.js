class ApiResponse {
    static createApiResponse(message, data) {
      return {
        message,
        data: Array.isArray(data) ? data : [data]
      };
    }
  }
  
  module.exports = ApiResponse;