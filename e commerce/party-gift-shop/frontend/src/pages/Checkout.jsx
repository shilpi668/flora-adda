import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useOrders();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' });
  const [countryCode, setCountryCode] = useState('+91');
  const [formError, setFormError] = useState('');

  const handlePayment = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setFormError('Oops! All delivery details are required.');
      return;
    }

    if (formData.phone.length !== 10) {
      setFormError('Mobile number must be exactly 10 digits.');
      return;
    }

    setFormError('');
    setIsProcessing(true);
    setTimeout(async () => {
      try {
        // 1. Place the order to backend
        const methodStr = 'Cash on Delivery';
        await placeOrder(
          itemsToRender, 
          methodStr, 
          total, 
          {
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode
          }
        );
        
        // 2. Clear Shopping Cart context correctly if we are in cart mode
        if (isCartMode) {
          clearCart();
        }

        setIsProcessing(false);
        setIsSuccess(true);
      } catch (err) {
        console.error("Order placement error:", err);
        window.alert("Backend Error: " + (err.response?.data?.error || err.message));
        setFormError('Failed to place order. Please try again.');
        setIsProcessing(false);
      }
    }, 2000);
  };
  
  // Extract state passed from router
  const { product, quantity, cartCheckout } = location.state || {};

  // Determine which mode we are in
  const isCartMode = cartCheckout && cartItems.length > 0;
  const isSingleMode = !!product;

  if (!isCartMode && !isSingleMode) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">No particular items selected for checkout.</h2>
        <Link to="/" className="text-[#fbbf24] hover:underline font-bold">Return to Shop</Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={40} className="text-[#059669]" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Order Successful!</h2>
          <p className="text-gray-500 mb-8">Your order has been placed securely and will be delivered straight to you.</p>
          <div className="flex gap-4 max-w-sm mx-auto">
            <Link to="/orders" className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold py-3.5 rounded-lg transition-colors inline-block whitespace-nowrap">
              Track Order
            </Link>
            <Link to="/" className="w-full bg-white border border-gray-200 hover:border-gray-900 hover:bg-gray-50 text-black font-bold py-3.5 rounded-lg transition-colors inline-block">
              Shop More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Derive items and totals based on the mode
  const itemsToRender = isCartMode ? cartItems : [{ product, quantity: quantity || 1 }];
  
  const subtotal = isCartMode 
    ? cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    : product.price * (quantity || 1);
    
  const total = subtotal; // Free delivery

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-medium">
          <ArrowLeft size={18} /> Back directly
        </button>

        <h1 className="text-3xl font-black text-gray-900 mb-8">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Forms */}
          <div className="flex-1 space-y-8">
            
            {/* Delivery Details */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                Delivery Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#fbbf24] outline-none" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#fbbf24] outline-none" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <select 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="border border-gray-300 border-r-0 rounded-l-md p-2.5 bg-gray-50 focus:ring-2 focus:ring-[#fbbf24] outline-none text-sm text-gray-700 cursor-pointer"
                    >
                      <option value="+91">IN (+91)</option>
                      <option value="+1">US (+1)</option>
                      <option value="+44">UK (+44)</option>
                      <option value="+61">AU (+61)</option>
                      <option value="+971">UAE (+971)</option>
                    </select>
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ''); // Remove non-numeric
                        if (val.length <= 10) setFormData({...formData, phone: val});
                      }}
                      className="w-full border border-gray-300 rounded-r-md p-2.5 focus:ring-2 focus:ring-[#fbbf24] outline-none" 
                      placeholder="9876543210" 
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address <span className="text-red-500">*</span></label>
                  <textarea 
                    rows="3" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#fbbf24] outline-none resize-none" 
                    placeholder="Flat, House no., Building, Company, Apartment"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#fbbf24] outline-none" 
                    placeholder="Mumbai" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">PIN Code <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-2 focus:ring-[#fbbf24] outline-none" 
                    placeholder="400001" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                Payment Method
              </h2>

              <div className="space-y-4">
                {/* Cash on Delivery Option - ONLY Choice */}
                <div className={`flex items-center gap-3 p-4 border border-[#fbbf24] bg-yellow-50 rounded-lg`}>
                  <div className="w-4 h-4 rounded-full border-4 border-[#fbbf24] bg-white"></div>
                  <span className="font-semibold text-gray-800">Cash on Delivery (Only Available)</span>
                </div>
                <p className="text-xs text-gray-500 ml-2 italic">Note: Online payment is currently disabled. Please pay at the time of delivery.</p>
              </div>
            </div>

          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="max-h-[300px] overflow-y-auto pr-2 mb-6 border-b border-gray-100 pb-2 space-y-4">
                {itemsToRender.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded-md border border-gray-200 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{item.product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                      <p className="font-bold text-gray-900 mt-0.5">₹{item.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-gray-700 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-black text-gray-900 mb-8">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              {formError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-semibold mb-4 border border-red-100 flex items-start gap-2">
                  <ShieldCheck size={18} className="shrink-0 mt-0.5" /> 
                  <p>{formError}</p>
                </div>
              )}

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-lg py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm disabled:opacity-75"
              >
                {isProcessing ? 'Processing Payment...' : (
                  paymentMethod === 'cod' 
                    ? `Place Order (COD)` 
                    : `Pay ₹${total.toFixed(2)} via ${selectedUpi === 'custom' ? (upiSearch || 'UPI') : extendedUpiApps.find(x => x.id === selectedUpi)?.name || 'UPI'}`
                )}
                {!isProcessing && <CheckCircle size={20} />}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={14} className="text-green-600" /> Guaranteed Safe & Secure Checkout
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
