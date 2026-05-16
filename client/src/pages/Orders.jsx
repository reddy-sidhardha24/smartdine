import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "bg-yellow-500";

      case "Cooking":
        return "bg-orange-500";

      case "Out for Delivery":
        return "bg-blue-500";

      case "Delivered":
        return "bg-green-500";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
        My Orders
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">

        {orders.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">
            No orders found
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-slate-900 rounded-2xl p-6 shadow-lg"
            >

              <div className="flex justify-between items-center mb-5">

                <div>
                  <h2 className="text-2xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </div>
              </div>

              <div className="space-y-3 mb-5">
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

              <div className="space-y-2 text-gray-300">

                <p>
                  <span className="font-bold text-white">
                    Address:
                  </span>{" "}
                  {order.address}
                </p>

                <p>
                  <span className="font-bold text-white">
                    Phone:
                  </span>{" "}
                  {order.phone}
                </p>

                <p>
                  <span className="font-bold text-white">
                    Payment:
                  </span>{" "}
                  {order.payment_method}
                </p>
              </div>

              <div className="mt-6 flex justify-between items-center">

                <h3 className="text-2xl font-bold text-yellow-400">
                  Total: ₹{Number(order.total).toFixed(2)}
                </h3>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;