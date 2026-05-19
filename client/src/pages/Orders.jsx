import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import api from "../api/axios";

const Orders = () => {

  // STATE

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const res =
        await api.get("/orders");

      setOrders(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch orders"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // CANCEL ORDER

  const cancelOrder =
    async (id) => {

      try {

        await api.delete(
          `/orders/${id}`
        );

        toast.success(
          "Order cancelled successfully"
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to cancel order"
        );

      }

    };

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">

      {/* TITLE */}

      <div className="text-center mb-16">

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-5">

          My Orders

        </h1>

        <p className="text-gray-400 text-xl">

          Track your SmartDine food orders

        </p>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex justify-center items-center py-32">

          <h2 className="text-3xl font-bold text-yellow-400 animate-pulse">

            Loading Orders...

          </h2>

        </div>

      ) : orders.length === 0 ? (

        /* EMPTY */

        <div className="text-center py-32">

          <h2 className="text-4xl font-bold text-red-400 mb-4">

            No Orders Found

          </h2>

          <p className="text-gray-400 text-xl">

            You have not placed any orders yet.

          </p>

        </div>

      ) : (

        /* ORDERS LIST */

        <div className="space-y-10">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
            >

              {/* HEADER */}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                <div>

                  <h2 className="text-3xl font-bold mb-3">

                    Order #{order.id}

                  </h2>

                  <p className="text-gray-400">

                    Status:
                    {" "}

                    <span className="text-green-400 font-bold">

                      {order.status || "Processing"}

                    </span>

                  </p>

                </div>

                <div className="text-left lg:text-right">

                  <h3 className="text-yellow-400 text-4xl font-extrabold">

                    ₹{order.total}

                  </h3>

                </div>

              </div>

              {/* ITEMS */}

              <div className="space-y-6">

                {order.items &&
                  order.items.map((item, index) => (

                    <div
                      key={index}
                      className="bg-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                      <div className="flex items-center gap-5">

                        <img
                          src={
                            item.image?.trim()
                              ? item.image
                              : "https://via.placeholder.com/120"
                          }
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-2xl"
                        />

                        <div>

                          <h3 className="text-2xl font-bold mb-2">

                            {item.name}

                          </h3>

                          <p className="text-gray-400">

                            Quantity:
                            {" "}
                            {item.quantity}

                          </p>

                        </div>

                      </div>

                      <div className="text-yellow-400 text-2xl font-bold">

                        ₹
                        {item.price *
                          item.quantity}

                      </div>

                    </div>

                  ))}

              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex flex-wrap gap-5">

                <button
                  className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-2xl font-bold transition duration-300"
                >
                  Track Order
                </button>

                <button
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold transition duration-300"
                >
                  Cancel Order
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Orders;