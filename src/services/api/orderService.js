import ordersData from '@/services/mockData/orders.json';

class OrderService {
  constructor() {
    this.orders = [...ordersData];
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay(300);
    return [...this.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await this.delay(250);
    const order = this.orders.find(o => o.id === id);
    if (!order) {
      throw new Error('Order not found');
    }
    return { ...order };
  }

  async getByStatus(status) {
    await this.delay(300);
    return this.orders.filter(o => o.status === status);
  }

  async create(orderData) {
    await this.delay(500);
    const newId = `ORD-${String(this.orders.length + 1).padStart(3, '0')}`;
    const newOrder = {
      ...orderData,
      id: newId,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.orders.push(newOrder);
    return { ...newOrder };
  }

  async updateStatus(id, status) {
    await this.delay(300);
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    this.orders[index].status = status;
    return { ...this.orders[index] };
  }

  async delete(id) {
    await this.delay(300);
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) {
      throw new Error('Order not found');
    }
    this.orders.splice(index, 1);
    return true;
  }

  async getRecentOrders(limit = 5) {
    await this.delay(200);
    return [...this.orders]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  async getOrderStats() {
    await this.delay(250);
    const total = this.orders.length;
    const pending = this.orders.filter(o => o.status === 'pending').length;
    const processing = this.orders.filter(o => o.status === 'processing').length;
    const shipped = this.orders.filter(o => o.status === 'shipped').length;
    const delivered = this.orders.filter(o => o.status === 'delivered').length;
    
    const totalRevenue = this.orders.reduce((sum, order) => sum + order.total, 0);
    
    return {
      total,
      pending,
      processing,
      shipped,
      delivered,
      totalRevenue
    };
  }
}

export default new OrderService();