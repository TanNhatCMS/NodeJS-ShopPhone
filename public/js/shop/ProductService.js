export class Services {
  async fetchData(endpoint, method, data = null) {
    try {
      const res = await axios({
        url: `/api/${endpoint}`,
        method,
        data,
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Return the custom JSON object for 404 errors
        return {
          status: 404,
          message: 'Product not found',
          success: false,
          data: error.response.data,  // Include the response data from the server if available
        };
      }
      // For other errors, you can handle them as needed
      console.error(error);
      return {
        status: error.response ? error.response.status : 500,
        message: error.message,
        success: false,
        data: error.response ? error.response.data : null,  // Include the response data from the server if available
      };
    }
  }

  async getProducts() {
    return this.fetchData('Products', 'GET');
  }

  async getProductById(id) {
    return this.fetchData(`Products/${id}`, 'GET');
  }

}
