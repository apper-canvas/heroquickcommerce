import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ProductCard from '@/components/molecules/ProductCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import productService from '@/services/api/productService';
import useCart from '@/hooks/useCart';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setError('');
      setLoading(true);
      
      const [products, categoriesData] = await Promise.all([
        productService.getAll(),
        productService.getCategories()
      ]);
      
      // Get featured products (first 4)
      setFeaturedProducts(products.slice(0, 4));
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    addToCart(product, 1);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              QuickCommerce
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-8 text-primary-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover amazing products at unbeatable prices. Shop with confidence and style.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              as={Link}
              to="/shop"
              variant="secondary"
              size="lg"
              icon="ShoppingBag"
              className="bg-white text-primary-700 hover:bg-gray-50"
            >
              Shop Now
            </Button>
            <Button
              as={Link}
              to="/categories"
              variant="ghost"
              size="lg"
              icon="Grid3X3"
              className="text-white border-white hover:bg-white hover:text-primary-700"
            >
              Browse Categories
            </Button>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-400 rounded-full opacity-20 animate-bounce-slow"></div>
      </motion.section>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(category)}`}
                className="card p-6 text-center hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-full inline-flex mb-3 group-hover:from-primary-200 group-hover:to-primary-300 transition-colors">
                  <ApperIcon name="Package" size={24} className="text-primary-600" />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked products just for you
            </p>
          </div>
          <Button
            as={Link}
            to="/shop"
            variant="secondary"
            icon="ArrowRight"
            iconPosition="right"
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1, duration: 0.3 }}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={(id) => window.location.href = `/product/${id}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6 rounded-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose QuickCommerce?
          </h2>
          <p className="text-gray-600 text-lg">
            We're committed to providing the best shopping experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: 'Truck',
              title: 'Free Shipping',
              description: 'Free shipping on orders over $100'
            },
            {
              icon: 'Shield',
              title: 'Secure Payment',
              description: 'Your payment information is safe with us'
            },
            {
              icon: 'Headphones',
              title: '24/7 Support',
              description: 'Get help whenever you need it'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1, duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-6 rounded-full inline-flex mb-4">
                <ApperIcon name={feature.icon} size={32} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;