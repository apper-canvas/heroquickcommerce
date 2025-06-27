import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminStats from '@/components/organisms/AdminStats';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import orderService from '@/services/api/orderService';
import productService from '@/services/api/productService';

const AdminDashboard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setError('');
      setLoading(true);
      
      const [orders, products] = await Promise.all([
        orderService.getRecentOrders(5),
        productService.getLowStockProducts(10)
      ]);
      
      setRecentOrders(orders);
      setLowStockProducts(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'primary';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      default: return 'gray';
    }
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats */}
      <AdminStats />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Add Product', icon: 'Plus', path: '/admin/products/new', variant: 'primary' },
          { label: 'View Orders', icon: 'ShoppingBag', path: '/admin/orders', variant: 'secondary' },
          { label: 'Manage Products', icon: 'Package', path: '/admin/products', variant: 'secondary' },
          { label: 'Store Settings', icon: 'Settings', path: '/admin/settings', variant: 'secondary' }
        ].map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              as={Link}
              to={action.path}
              variant={action.variant}
              icon={action.icon}
              className="w-full h-20 flex-col text-center justify-center"
            >
              {action.label}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Button
              as={Link}
              to="/admin/orders"
              variant="ghost"
              size="sm"
              icon="ArrowRight"
              iconPosition="right"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">#{order.id}</span>
                    <Badge variant={getStatusColor(order.status)} size="sm">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.customer.name} • ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Low Stock Alerts</h2>
            <Button
              as={Link}
              to="/admin/products"
              variant="ghost"
              size="sm"
              icon="ArrowRight"
              iconPosition="right"
            >
              Manage
            </Button>
          </div>

          <div className="space-y-4">
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="CheckCircle" size={48} className="mx-auto mb-2 text-green-500" />
                <p>All products are well stocked!</p>
              </div>
            ) : (
              lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Only {product.stock} left in stock
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="warning" size="sm">
                      Low Stock
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;