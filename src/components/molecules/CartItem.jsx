import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      onRemove(item.productId, item.variants);
    } else {
      onUpdateQuantity(item.productId, item.variants, newQuantity);
    }
  };

  const getVariantString = () => {
    if (!item.variants || Object.keys(item.variants).length === 0) return '';
    return Object.entries(item.variants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  };

  return (
    <motion.div
      className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        {getVariantString() && (
          <p className="text-sm text-gray-500">{getVariantString()}</p>
        )}
        <p className="text-lg font-semibold gradient-text">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ApperIcon name="Minus" size={16} className="text-gray-500" />
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ApperIcon name="Plus" size={16} className="text-gray-500" />
        </button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        icon="Trash2"
        onClick={() => onRemove(item.productId, item.variants)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      />
    </motion.div>
  );
};

export default CartItem;