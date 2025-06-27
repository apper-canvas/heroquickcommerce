import { motion, AnimatePresence } from 'framer-motion';
import CartItem from '@/components/molecules/CartItem';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';
import useCart from '@/hooks/useCart';

const CartSidebar = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Shopping Cart ({cartItems.length})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ApperIcon name="X" size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <Empty
                      title="Your cart is empty"
                      description="Add some products to get started"
                      icon="ShoppingCart"
                    />
                  </div>
                ) : (
                  <div className="p-6 space-y-4">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={`${item.productId}-${JSON.stringify(item.variants)}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CartItem
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        size="sm"
                        icon="Trash2"
                        onClick={clearCart}
                        className="w-full text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-success-600 font-medium">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-300">
                      <span>Total</span>
                      <span className="gradient-text">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {subtotal < 100 && (
                    <p className="text-sm text-gray-600 mb-4">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <Button
                    variant="primary"
                    size="lg"
                    icon="CreditCard"
                    onClick={onCheckout}
                    className="w-full"
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartSidebar;