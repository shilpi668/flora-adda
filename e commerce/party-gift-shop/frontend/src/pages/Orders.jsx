import React from 'react';
import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import { Package, XCircle, CheckCircle, Truck, Clock } from 'lucide-react';

const Orders = () => {
  const { orders, cancelOrder } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">No orders yet</h2>
          <p className="text-gray-500 mb-8">You haven't placed any orders. Start exploring our collection!</p>
          <Link to="/" className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-bold py-3.5 rounded-lg transition-colors inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Cancelled': return 'text-red-600 bg-red-50 border-red-200';
      case 'Shipped': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Delivered': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
          <p className="text-gray-500 mt-2">Track, manage, and view your recent purchases.</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Order Header */}
              <div className="bg-gray-50/50 p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="grid grid-cols-2 sm:flex sm:gap-8 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Order ID</p>
                    <p className="font-bold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Date Placed</p>
                    <p className="font-bold text-gray-900">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium mb-1">Total Amount</p>
                    <p className="font-bold text-gray-900">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  
                  {order.status === 'Processing' && (
                    <button 
                      onClick={() => {
                        if(window.confirm('Are you sure you want to cancel this order?')) {
                          cancelOrder(order.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-1 transition-colors bg-white border border-red-100 px-3 py-1.5 rounded-lg shadow-sm hover:bg-red-50"
                    >
                      <XCircle size={16} /> Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order Content */}
              <div className="p-4 sm:p-6">
                
                {/* Visual Tracking Timeline */}
                <div className="mb-10 mt-2 relative">
                  {order.status === 'Cancelled' ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-3 border border-red-100">
                      <XCircle /> 
                      <div>
                        <p className="font-bold">Order Cancelled</p>
                        <p className="text-sm text-red-600/80">This order was cancelled before shipping and will not be delivered.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between relative max-w-2xl mx-auto px-4 z-0">
                      {/* Connecting Line background */}
                      <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-gray-200 -translate-y-1/2 -z-10 rounded-full"></div>
                      
                      {/* Connecting Line active */}
                      <div className={`absolute top-1/2 left-[10%] h-1 bg-green-500 -translate-y-1/2 -z-10 rounded-full transition-all duration-1000 ${
                        order.status === 'Processing' ? 'w-[25%]' : 
                        order.status === 'Shipped' ? 'w-[75%]' : 
                        order.status === 'Delivered' ? 'w-[80%]' : 'w-0'
                      }`}></div>

                      {/* Step 1 */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                          <CheckCircle size={16} />
                        </div>
                        <span className="text-xs font-bold text-gray-700">Placed</span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                          {order.status === 'Processing' ? <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span></span> : <Clock size={16} />}
                        </div>
                        <span className={`text-xs font-bold ${['Processing', 'Shipped', 'Delivered'].includes(order.status) ? 'text-gray-700' : 'text-gray-400'}`}>Processing</span>
                      </div>

                      {/* Step 3 */}
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${['Shipped', 'Delivered'].includes(order.status) ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                          <Truck size={16} />
                        </div>
                        <span className={`text-xs font-bold ${['Shipped', 'Delivered'].includes(order.status) ? 'text-gray-700' : 'text-gray-400'}`}>Shipped</span>
                      </div>

                      {/* Step 4 */}
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'}`}>
                          <Package size={16} />
                        </div>
                        <span className={`text-xs font-bold ${order.status === 'Delivered' ? 'text-gray-700' : 'text-gray-400'}`}>Delivered</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Items inside this package</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name} 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200 shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 leading-snug line-clamp-2">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="font-black text-gray-900">₹{item.product.price}</p>
                          {order.status !== 'Cancelled' && (
                            <p className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                              Expected arrival: 3-5 Business Days
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;
