import productsData from '@/services/mockData/products.json';

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay(300);
    return [...this.products];
  }

  async getById(id) {
    await this.delay(250);
    const product = this.products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }

  async getByCategory(category) {
    await this.delay(300);
    return this.products.filter(p => p.category === category);
  }

  async searchProducts(query) {
    await this.delay(200);
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  async getCategories() {
    await this.delay(150);
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.sort();
  }

  async create(productData) {
    await this.delay(400);
    const newId = Math.max(...this.products.map(p => p.id)) + 1;
    const newProduct = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id, productData) {
    await this.delay(350);
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = { ...this.products[index], ...productData };
    return { ...this.products[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return true;
  }

  async updateStock(id, quantity) {
    await this.delay(200);
    const product = this.products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    product.stock = Math.max(0, product.stock - quantity);
    return { ...product };
  }

  async getLowStockProducts(threshold = 20) {
    await this.delay(200);
    return this.products.filter(p => p.stock <= threshold);
  }
}

export default new ProductService();