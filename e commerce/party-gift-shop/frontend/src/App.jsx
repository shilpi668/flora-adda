import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Delivery from './pages/Delivery';
import Contact from './pages/Contact';
import PaymentDelivery from './pages/PaymentDelivery';
import Blog from './pages/Blog';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Inventory from './pages/Inventory';
import AdminOrders from './pages/AdminOrders';

const UserLayout = () => (
  <div className="font-sans text-gray-900 min-h-screen flex flex-col selection:bg-[var(--primary)] selection:text-white">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Admin Protector
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="delivery" element={<Delivery />} />
                <Route path="contact" element={<Contact />} />
                <Route path="payment-delivery" element={<PaymentDelivery />} />
                <Route path="blog" element={<Blog />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="cart" element={<Cart />} />
                <Route path="orders" element={<Orders />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
