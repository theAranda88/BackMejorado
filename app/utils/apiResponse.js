class ApiResponse {
    static createApiResponse(message, data) {
      return {
        message,
        data: Array.isArray(data) ? data : [data] // The item data is an array of data that can be objects, primitive values, arrays, etc.
      };
    }
  }
  
  module.exports = ApiResponse;