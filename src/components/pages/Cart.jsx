import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CartItem from '@/components/molecules/CartItem';
import Button from '@/components/atoms/Button';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import useCart from '@/hooks/useCart';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <motion.div
        className="py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Empty
          title="Your cart is empty"
          description="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
          icon="ShoppingCart"
          actionText="Continue Shopping"
          onAction={() => navigate('/shop')}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>
        <Button
          variant="outline"
          size="sm"
          icon="Trash2"
          onClick={clearCart}
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={`${item.productId}-${JSON.stringify(item.variants)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CartItem
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          className="card-premium p-6 h-fit sticky top-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">
                {shipping === 0 ? (
                  <span className="text-success-600">Free</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="gradient-text">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {subtotal < 100 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <ApperIcon name="Truck" size={16} className="text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              icon="CreditCard"
              onClick={handleCheckout}
              className="w-full"
            >
              Proceed to Checkout
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              icon="ArrowLeft"
              onClick={() => navigate('/shop')}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Shield" size={16} className="mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Truck" size={16} className="mr-1" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="RotateCcw" size={16} className="mr-1" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;