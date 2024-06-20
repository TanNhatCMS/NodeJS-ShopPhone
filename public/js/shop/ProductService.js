export class Services {
  async fetchData(endpoint, method, data = null) {
    try {
      const res = await axios({
        url: `http://localhost:3000/${endpoint}`,
        method,
        data,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getProducts() {
    return this.fetchData('Products', 'GET');
  }

  async getProductById(id) {
    return this.fetchData(`Products/${id}`, 'GET');
  }

}
