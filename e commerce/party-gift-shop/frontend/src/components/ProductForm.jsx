import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ProductForm = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    categoryId: '',
    stock: 25 // Default
  });
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Load categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    fetchCategories();

    // If editing a product, pre-fill form
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        categoryId: product.categoryId,
        stock: product.stock || 25
      });
      setPreviewUrl(product.image_url);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Reset image URL if manual upload is chosen
      setFormData({ ...formData, image_url: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = formData.image_url;

      // If a file is selected, upload it first
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('image', selectedFile);
        const uploadRes = await axios.post('http://localhost:5000/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      const finalData = { ...formData, image_url: imageUrl };

      if (product) {
        // Update existing product
        await axios.put(`http://localhost:5000/api/products/${product.id}`, finalData);
      } else {
        // Create new product
        await axios.post('http://localhost:5000/api/products', finalData);
      }
      onSave();
    } catch (error) {
      console.error("Failed to save product", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Red Rose Bouquet"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
              <input 
                type="number" 
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="999"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select 
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 transition"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Product Photo</label>
              <div className="flex flex-col gap-3">
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-gray-200 shadow-inner" />
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-black file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition cursor-pointer"
                />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">--- OR ---</p>
                <input 
                  type="text" 
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Paste Image URL instead..."
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 transition text-sm"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Stock</label>
              <input 
                type="number" 
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          <div className="pt-6 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              {product ? 'Update Details' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
