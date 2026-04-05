const Order = require('./models/Order');
const sequelize = require('./config/db');

async function checkOrders() {
  try {
    const orders = await Order.findAll();
    console.log("Total Orders:", orders.length);
    orders.forEach(o => {
      console.log(`Order #${o.orderNumber}: Name=${o.customerName}, Phone=${o.customerPhone}, Address=${o.address}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkOrders();
