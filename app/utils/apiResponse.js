class ApiResponse {
    static createApiResponse(message, data) {
      return {
        message,
        data: Array.isArray(data) ? data : [data] // El item data es un array de datos que pueden ser objetos, valores primitivos, arrays, etc.
      };
    }
  }
  
  module.exports = ApiResponse;