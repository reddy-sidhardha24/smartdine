import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all");

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <h1 className="text-5xl font-bold text-center text-yellow-400 mb-10">
        Admin Orders
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1e3a8a] rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-3xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-300">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">

  <div
    className={
      order.status === "Preparing"
        ? "bg-yellow-500 px-4 py-2 rounded-full font-bold text-white"
        : order.status === "Out for Delivery"
        ? "bg-blue-500 px-4 py-2 rounded-full font-bold text-white"
        : "bg-green-600 px-4 py-2 rounded-full font-bold text-white"
    }
  >
    {order.status}
  </div>

  <select
    value={order.status}
    onChange={(e) =>
      updateStatus(order.id, e.target.value)
    }
    className="bg-white text-black px-3 py-2 rounded-lg"
  >
    <option>Preparing</option>
    <option>Out for Delivery</option>
    <option>Delivered</option>
  </select>

</div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-500 pb-2"
                >
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p>
                <span className="font-bold">Address:</span>{" "}
                {order.address}
              </p>

              <p>
                <span className="font-bold">Phone:</span>{" "}
                {order.phone}
              </p>

              <p>
                <span className="font-bold">Payment:</span>{" "}
                {order.payment_method}
              </p>

              <h3 className="text-3xl font-bold text-yellow-400 mt-4">
                Total: ₹{order.total}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;