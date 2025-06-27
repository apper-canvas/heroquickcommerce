import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('quickcommerce-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quickcommerce-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedVariants = {}) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product.id && 
      JSON.stringify(item.variants) === JSON.stringify(selectedVariants)
    );

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
      toast.success(`Updated ${product.name} quantity in cart`);
    } else {
      const newItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        variants: selectedVariants
      };
      setCartItems([...cartItems, newItem]);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const removeFromCart = (productId, variants = {}) => {
    const updatedItems = cartItems.filter(
      item => !(item.productId === productId && 
      JSON.stringify(item.variants) === JSON.stringify(variants))
    );
    setCartItems(updatedItems);
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, variants, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, variants);
      return;
    }

    const updatedItems = cartItems.map(item => {
      if (item.productId === productId && 
          JSON.stringify(item.variants) === JSON.stringify(variants)) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
};

export default useCart;