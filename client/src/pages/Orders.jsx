import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH ORDERS

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

      console.log(error);

      toast.error("Failed to fetch orders");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center">

        <h1 className="text-5xl font-bold text-yellow-400 animate-pulse">
          Loading Orders...
        </h1>

      </div>

    );

  }

  // EMPTY ORDERS SCREEN

  if (orders.length === 0) {

    return (

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">

        {/* IMAGE */}

        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="No Orders"
          className="w-56 mb-10 opacity-80"
        />

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6">

          No Orders Yet

        </h1>

        {/* DESCRIPTION */}

        <p className="text-gray-400 text-xl max-w-2xl leading-relaxed mb-10">

          You haven't placed any food orders yet.
          Start exploring our delicious menu and enjoy premium food delivery.

        </p>

        {/* BUTTON */}

        <Link
          to="/menu"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
        >
          Order Now
        </Link>

      </div>

    );

  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* PAGE TITLE */}

      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-14">
        My Orders
      </h1>

      {/* ORDERS LIST */}

      <div className="max-w-7xl mx-auto space-y-8">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">

              <div>

                <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                  Order #{order.id}
                </h2>

                <p className="text-gray-400">
                  {new Date(order.created_at).toLocaleString()}
                </p>

              </div>

              {/* STATUS */}

              <span
                className={`px-6 py-3 rounded-full text-lg font-bold w-fit
                  ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-white"

                      : order.status === "Out for Delivery"
                      ? "bg-blue-500 text-white"

                      : "bg-yellow-400 text-black"
                  }`}
              >
                {order.status}
              </span>

            </div>

            {/* ITEMS */}

            <div className="space-y-5 mb-8">

              {order.items.map((item, index) => (

                <div
                  key={index}
                  className="bg-black/40 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                >

                  <div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.name}
                    </h3>

                    <p className="text-gray-400">
                      {item.restaurant_name}
                    </p>

                  </div>

                  <p className="text-2xl font-bold text-green-400">
                    ₹{item.price}
                  </p>

                </div>

              ))}

            </div>

            {/* ORDER DETAILS */}

            <div className="grid md:grid-cols-2 gap-8 border-t border-slate-700 pt-8">

              {/* ADDRESS */}

              <div>

                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  Delivery Address
                </h3>

                <p className="text-gray-300 leading-relaxed">
                  {order.address}
                </p>

              </div>

              {/* PAYMENT + TOTAL */}

              <div className="space-y-4">

                <div className="flex justify-between items-center">

                  <p className="text-xl text-gray-300">
                    Payment Method
                  </p>

                  <p className="text-xl font-bold text-white">
                    {order.paymentmethod}
                  </p>

                </div>

                <div className="flex justify-between items-center">

                  <p className="text-2xl font-bold">
                    Total
                  </p>

                  <p className="text-4xl font-extrabold text-green-400">
                    ₹{order.total}
                  </p>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Orders;