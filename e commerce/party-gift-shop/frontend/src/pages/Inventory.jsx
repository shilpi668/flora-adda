import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { Plus, Edit3, Trash2, Box, AlertCircle, CheckCircle2 } from 'lucide-react';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product", error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setIsFormOpen(false);
    fetchProducts();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Inventory</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your product catalog and stock levels.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all font-bold flex items-center gap-2 active:scale-95"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Product Details</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Stock Status</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Inventory...</span>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <Box size={40} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 font-bold">Your inventory is empty. Start by adding your first product!</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={product.image_url} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100 border border-transparent group-hover:border-indigo-100 transition-colors" />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5"></div>
                      </div>
                      <div>
                        <div className="font-black text-gray-900 text-sm">{product.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">ID: PROD-{product.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-indigo-100">
                      {product.Category?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="font-black text-gray-900">₹{Number(product.price).toLocaleString()}</div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       {product.stock < 10 ? (
                         <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                           <AlertCircle size={12} />
                           <span className="text-[10px] font-black uppercase">{product.stock || 0} Low Stock</span>
                         </div>
                       ) : (
                         <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                           <CheckCircle2 size={12} />
                           <span className="text-[10px] font-black uppercase">{product.stock || 25} In Stock</span>
                         </div>
                       )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};

export default Inventory;
