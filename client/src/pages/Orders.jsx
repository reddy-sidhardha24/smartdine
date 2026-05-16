import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8 text-center">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">
          No orders found
        </p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-900 p-6 rounded-xl shadow-lg"
            >

              <h2 className="text-2xl font-semibold mb-3">
                Order #{order.id}
              </h2>

              <p className="mb-2 text-yellow-400">
                Total: ₹{order.total}
              </p>

              <p className="mb-4 text-sm text-gray-400">
                {new Date(order.created_at).toLocaleString()}
              </p>

              <div className="space-y-2">

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-gray-700 pb-2"
                  >
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Orders;