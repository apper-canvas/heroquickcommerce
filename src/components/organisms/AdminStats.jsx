import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import orderService from '@/services/api/orderService';
import productService from '@/services/api/productService';

const AdminStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setError('');
      setLoading(true);
      
      const [orderStats, products, lowStockProducts] = await Promise.all([
        orderService.getOrderStats(),
        productService.getAll(),
        productService.getLowStockProducts()
      ]);

      setStats({
        ...orderStats,
        totalProducts: products.length,
        lowStockCount: lowStockProducts.length,
        averageOrderValue: orderStats.total > 0 ? orderStats.totalRevenue / orderStats.total : 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading type="cards" />;
  if (error) return <Error message={error} onRetry={loadStats} />;

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toFixed(2) || '0.00'}`,
      icon: 'DollarSign',
      color: 'from-green-500 to-green-600',
      change: '+12.5%'
    },
    {
      title: 'Total Orders',
      value: stats.total || 0,
      icon: 'ShoppingBag',
      color: 'from-blue-500 to-blue-600',
      change: '+8.2%'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts || 0,
      icon: 'Package',
      color: 'from-purple-500 to-purple-600',
      change: '+5.1%'
    },
    {
      title: 'Low Stock Alert',
      value: stats.lowStockCount || 0,
      icon: 'AlertTriangle',
      color: 'from-yellow-500 to-yellow-600',
      alert: stats.lowStockCount > 0
    }
  ];

  const orderStatusCards = [
    {
      title: 'Pending Orders',
      value: stats.pending || 0,
      icon: 'Clock',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Processing',
      value: stats.processing || 0,
      icon: 'RefreshCw',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Shipped',
      value: stats.shipped || 0,
      icon: 'Truck',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Delivered',
      value: stats.delivered || 0,
      icon: 'CheckCircle',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="card-premium p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                {stat.change && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {stat.change}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <ApperIcon 
                  name={stat.icon} 
                  size={24} 
                  className={`text-white ${stat.alert ? 'animate-pulse' : ''}`} 
                />
              </div>
            </div>
            
            {stat.alert && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Order Status Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {orderStatusCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="card p-4 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${stat.color} mb-3`}>
                <ApperIcon name={stat.icon} size={20} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="card-premium p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Average Order Value
          </h4>
          <div className="text-3xl font-bold gradient-text">
            ${stats.averageOrderValue?.toFixed(2) || '0.00'}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Per order average
          </p>
        </motion.div>

        <motion.div
          className="card-premium p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory Health
          </h4>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.totalProducts - stats.lowStockCount}
              </div>
              <p className="text-sm text-gray-600">In Stock</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.lowStockCount}
              </div>
              <p className="text-sm text-gray-600">Low Stock</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminStats;