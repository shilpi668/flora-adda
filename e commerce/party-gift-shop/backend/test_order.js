const axios = require('axios');

async function testOrder() {
  try {
    const orderData = {
      id: "TEST-" + Date.now(),
      customerName: "Test User",
      customerEmail: "test@example.com",
      customerPhone: "1234567890",
      address: "123 Test Street",
      city: "Test City",
      pincode: "110001",
      totalAmount: 99.00,
      paymentMethod: "Cash on Delivery",
      items: [
        { productId: 1, quantity: 1 }
      ]
    };
    
    console.log("Sending Test Order...");
    const res = await axios.post('http://localhost:5000/api/orders', orderData);
    console.log("Response:", res.data);
  } catch (err) {
    console.error("Test Failed:", err.response ? err.response.data : err.message);
  }
}

testOrder();
