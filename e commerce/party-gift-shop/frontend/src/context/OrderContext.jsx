import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    // Load from local storage
    const saved = localStorage.getItem('userOrders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to local storage whenever orders change
  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = async (items, paymentMethod, totalAmount, customerDetails) => {
    const orderData = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...customerDetails,
      totalAmount,
      paymentMethod,
      items: items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    console.log("Placing Order with data:", orderData);

    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData);
      
      // Update local state for immediate feedback
      const newOrder = {
        ...response.data,
        items: items, // Keep full product info for local display
        date: new Date().toISOString(),
      };
      
      setOrders(prev => [newOrder, ...prev]);
      return newOrder.id;
    } catch (error) {
      console.error("Failed to place order to backend:", error);
      throw error;
    }
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId && order.status === 'Processing' 
        ? { ...order, status: 'Cancelled' } 
        : order
    ));
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
