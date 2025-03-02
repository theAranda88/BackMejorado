class ApiResponse {
    static createApiResponse(message, data = [], errors = []) {
      return {
        message: message,
        data: data,
        errors: errors,
      };
    }
  }
  
  module.exports = ApiResponse;