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

  async addProduct(data) {
    await this.fetchData('admin/add-product', 'POST', data);
  }

  async getProducts() {
    return this.fetchData('Products', 'GET');
  }


  async deleteProduct(id) {
    await this.fetchData(`admin/Product/${id}`, 'DELETE');
  }

  async getProductById(id) {
    return this.fetchData(`Products/${id}`, 'GET');
  }

  async updateProduct(data) {
    await this.fetchData(`admin/Product/${data.id}`, 'PUT', data);
  }
}
