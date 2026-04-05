import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Package, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 font-bold uppercase tracking-widest">Loading Dashboard...</div>;

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2 font-medium">Real-time performance metrics and recent activities.</p>
      </header>
      
      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <Package size={80} />
          </div>
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Products</h3>
          <p className="text-4xl font-black text-gray-900 mb-2">{stats.totalProducts}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit">
            <TrendingUp size={12} /> Active Catalog
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <ShoppingBag size={80} />
          </div>
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Total Orders</h3>
          <p className="text-4xl font-black text-gray-900 mb-2">{stats.totalOrders}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit">
             Completed & Pending
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={80} />
          </div>
          <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">Gross Revenue</h3>
          <p className="text-4xl font-black text-gray-900 mb-2">₹{Number(stats.totalRevenue).toLocaleString()}</p>
          <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full w-fit">
             Lifetime Sales
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black tracking-tight text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats.recentOrders.length === 0 ? (
              <p className="text-gray-400 text-center py-10 font-bold uppercase tracking-widest text-xs">No Recent Orders</p>
            ) : (
              stats.recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 flex items-center justify-center text-gray-400">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">#{order.orderNumber} – {order.customerName}</p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">
                        <Clock size={10} /> {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900 text-sm">₹{order.totalAmount}</p>
                    <span className="text-[10px] uppercase font-bold text-blue-600 leading-none">{order.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-white text-xl font-black mb-2">Inventory Control</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">Instantly manage your product catalog, update prices, or restock items with ease.</p>
                <Link 
                  to="/admin/inventory" 
                  className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold text-sm inline-block hover:bg-gray-100 transition shadow-xl shadow-black/20"
                >
                  Manage Products
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5">
                <Package size={200} className="text-white" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
