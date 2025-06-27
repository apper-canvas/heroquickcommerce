import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/organisms/Header';
import CartSidebar from '@/components/organisms/CartSidebar';
import Home from '@/components/pages/Home';
import Shop from '@/components/pages/Shop';
import ProductDetail from '@/components/pages/ProductDetail';
import Cart from '@/components/pages/Cart';
import Checkout from '@/components/pages/Checkout';
import AdminDashboard from '@/components/pages/AdminDashboard';
import AdminProducts from '@/components/pages/AdminProducts';
import AdminOrders from '@/components/pages/AdminOrders';
import { useNavigate } from 'react-router-dom';

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleAdmin = () => {
    setIsAdmin(!isAdmin);
    if (!isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isAdmin={isAdmin} 
        onToggleAdmin={handleToggleAdmin}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;