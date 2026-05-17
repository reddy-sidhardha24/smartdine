import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-center text-yellow-400 mb-12">
        My Orders
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl"
          >

            {/* HEADER */}

            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">

              <div>

                <h2 className="text-4xl font-bold text-yellow-400">
                  Order #{order.id}
                </h2>

                <p className="text-gray-400 mt-2">
                  {new Date(order.created_at).toLocaleString()}
                </p>

              </div>

              {/* STATUS BADGE */}

              <div
                className={`px-5 py-2 rounded-full text-sm font-bold shadow-lg ${
                  order.status === "Preparing"
                    ? "bg-yellow-400 text-black"

                    : order.status === "Out for Delivery"
                    ? "bg-blue-500 text-white"

                    : "bg-green-500 text-white"
                }`}
              >
                {order.status}
              </div>

            </div>

            {/* ITEMS */}

            <div className="space-y-4 mb-8">

              {order.items.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border-b border-slate-700 pb-3"
                >

                  <h3 className="text-lg font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-yellow-300 font-bold">
                    ₹{item.price}
                  </p>

                </div>

              ))}

            </div>

            {/* DELIVERY TRACKER */}

            <div className="flex items-center gap-4 mt-6 flex-wrap mb-10">

              {/* PREPARING */}

              <div className="flex items-center gap-2">

                <div
                  className={`w-5 h-5 rounded-full ${
                    order.status === "Preparing" ||
                    order.status === "Out for Delivery" ||
                    order.status === "Delivered"
                      ? "bg-yellow-400"
                      : "bg-gray-600"
                  }`}
                ></div>

                <p className="text-sm font-semibold">
                  Preparing
                </p>

              </div>

              <div className="w-10 h-1 bg-gray-700 rounded"></div>

              {/* OUT FOR DELIVERY */}

              <div className="flex items-center gap-2">

                <div
                  className={`w-5 h-5 rounded-full ${
                    order.status === "Out for Delivery" ||
                    order.status === "Delivered"
                      ? "bg-blue-400"
                      : "bg-gray-600"
                  }`}
                ></div>

                <p className="text-sm font-semibold">
                  Out for Delivery
                </p>

              </div>

              <div className="w-10 h-1 bg-gray-700 rounded"></div>

              {/* DELIVERED */}

              <div className="flex items-center gap-2">

                <div
                  className={`w-5 h-5 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-400"
                      : "bg-gray-600"
                  }`}
                ></div>

                <p className="text-sm font-semibold">
                  Delivered
                </p>

              </div>

            </div>

            {/* ORDER DETAILS */}

            <div className="space-y-3 text-gray-300">

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

            {/* TOTAL */}

            <div className="mt-8">

              <h2 className="text-4xl font-extrabold text-yellow-400">
                Total: ₹{order.total}
              </h2>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Orders;