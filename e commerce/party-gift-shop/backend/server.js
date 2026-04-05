require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sequelize = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes

// Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let whereClause = {};
    if (category) {
      whereClause.categoryId = category;
    }
    const products = await Product.findAll({ where: whereClause, include: Category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create Product
app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update Product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.update(req.body, { where: { id } });
    const updatedProduct = await Product.findByPk(id);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// --- Order Routes ---

// Create Order (User Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const fs = require('fs');
    fs.writeFileSync('debug_order.json', JSON.stringify(req.body, null, 2));
    console.log("Received Order Request:", req.body);
    const { id, customerName, customerEmail, customerPhone, address, city, pincode, totalAmount, paymentMethod, items } = req.body;
    
    // 1. Create the Order
    const order = await Order.create({
      orderNumber: id, customerName, customerEmail, customerPhone, address, city, pincode, totalAmount, paymentMethod
    });

    // 2. Create the OrderItems
    const orderItems = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get All Orders (Admin Dashboard)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [Product]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// --- Admin Stats ---
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum('totalAmount') || 0;
    
    // Get recent orders for dashboard
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    console.error("Admin stats fetch failed:", error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Database Sync and Server Start
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Database sync failed:', err);
});
