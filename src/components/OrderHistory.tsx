'use client';
import { useState, useEffect } from 'react';
import { Order } from '@/types';

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-lg">Order #{order.id}</h4>
                  <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    {order.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Items:</p>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p>
                  <strong>Shipping:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No orders yet.</div>
      )}
    </div>
  );
}