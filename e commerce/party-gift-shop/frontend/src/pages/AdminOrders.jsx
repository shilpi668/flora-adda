import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, User, Clock, CheckCircle, Truck, XCircle } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchOrders = async () => {
    try {
      setErrorMsg(null);
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      setErrorMsg(error.message || "Failed to connect to backend");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order Management</h1>
          <p className="text-gray-500 mt-1">Review and manage all user orders across the platform.</p>
        </div>
        <div className="flex gap-4">
           {errorMsg && (
             <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 text-sm font-bold flex items-center gap-2">
                <XCircle size={16} /> Error: {errorMsg}
             </div>
           )}
           <button 
             onClick={fetchOrders}
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition"
           >
             Refresh List
           </button>
           <div className="bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-gray-500 text-sm font-bold">Total Orders: {orders.length}</span>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">Loading Orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-20 rounded-2xl border border-dashed border-gray-200 text-center text-gray-400">
             <Package size={48} className="mx-auto mb-4 opacity-20" />
             <p className="font-bold">No orders found in the database.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Order / Information</th>
                  <th className="px-6 py-4 text-left">Customer Details</th>
                  <th className="px-6 py-4 text-left">Delivery Address</th>
                  <th className="px-6 py-4 text-left">Items Ordered</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors align-top">
                    <td className="px-6 py-4">
                      <div className="font-black text-gray-900 leading-none">#{order.orderNumber}</div>
                      <div className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mt-2">
                        <Clock size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                         <div className="bg-blue-50 p-1.5 rounded-lg text-blue-500 mt-0.5"><User size={14} /></div>
                         <div>
                            <div className="font-bold text-gray-900 text-sm leading-none mb-1">{order.customerName || "No Name"}</div>
                            <div className="text-xs text-gray-500 mb-1">{order.customerEmail || "No Email"}</div>
                            <div className="text-[11px] font-black text-blue-600 bg-blue-50/50 px-1.5 py-0.5 rounded inline-block">📞 {order.customerPhone || "No Phone"}</div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-700 leading-relaxed max-w-[200px]">
                        <p className="font-medium">{order.address}</p>
                        <p className="text-gray-500 mt-0.5">{order.city}, {order.pincode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.OrderItems.map((item, idx) => (
                          <div key={idx} className="text-[11px] text-gray-700 font-medium">
                            <span className="font-black text-gray-900">×{item.quantity}</span> {item.Product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-gray-900">₹{order.totalAmount}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{order.paymentMethod}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
