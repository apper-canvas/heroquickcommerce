import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    await onAddToCart(product);
    setLoading(false);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'Out of Stock', variant: 'danger' };
    if (product.stock <= 10) return { label: 'Low Stock', variant: 'warning' };
    return { label: 'In Stock', variant: 'success' };
  };

  const stockStatus = getStockStatus();

  return (
    <motion.div
      className="card group cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          onClick={() => onViewDetails(product.id)}
        />
        
        <div className="absolute top-3 left-3">
          <Badge variant={stockStatus.variant} size="sm">
            {stockStatus.label}
          </Badge>
        </div>
        
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <button
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            onClick={() => onViewDetails(product.id)}
          >
            <ApperIcon name="Eye" size={16} className="text-gray-700" />
          </button>
        </motion.div>
      </div>
      
      <div className="p-4">
        <h3 
          className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer"
          onClick={() => onViewDetails(product.id)}
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold gradient-text">
            ${product.price}
          </span>
          <Badge variant="gray" size="sm">
            {product.category}
          </Badge>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="success"
            size="sm"
            icon="ShoppingCart"
            onClick={handleAddToCart}
            loading={loading}
            disabled={product.stock === 0}
            className="w-full"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;