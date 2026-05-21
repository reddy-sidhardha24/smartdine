import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const AdminOrders = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/orders/all"
        );

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

  // UPDATE STATUS

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status }
      );

      toast.success(
        `Order marked as ${status}`
      );

      fetchOrders();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update status"
      );

    }

  };

  // STATUS COLORS

  const statusColor = (status) => {

    if (
      status === "Preparing"
    ) {

      return "bg-yellow-500";

    }

    if (
      status === "Out for Delivery"
    ) {

      return "bg-blue-500";

    }

    if (
      status === "Delivered"
    ) {

      return "bg-green-600";

    }

    return "bg-red-500";

  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-yellow-400">

            Admin Orders

          </h1>

          <p className="text-gray-400 mt-2">

            Manage customer orders and delivery status

          </p>

        </div>

        <div className="bg-slate-900 px-6 py-4 rounded-2xl border border-slate-700">

          <h2 className="text-3xl font-bold text-yellow-400">

            {orders.length}

          </h2>

          <p className="text-gray-400">

            Total Orders

          </p>

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="text-center py-32">

          <h2 className="text-4xl font-bold text-yellow-400">

            Loading Orders...

          </h2>

        </div>

      ) : orders.length === 0 ? (

        <div className="text-center py-32">

          <h2 className="text-4xl font-bold text-red-400">

            No Orders Found

          </h2>

        </div>

      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl"
            >

              {/* TOP */}

              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-8">

                <div>

                  <h2 className="text-3xl font-bold text-yellow-400">

                    Order #{order.id}

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {new Date(
                      order.created_at
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="flex items-center gap-4">

                  {/* STATUS */}

                  <div
                    className={`${statusColor(order.status)} px-5 py-3 rounded-full font-bold`}
                  >

                    {order.status}

                  </div>

                  {/* SELECT */}

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="bg-black border border-slate-700 px-4 py-3 rounded-xl text-white"
                  >

                    <option>
                      Preparing
                    </option>

                    <option>
                      Out for Delivery
                    </option>

                    <option>
                      Delivered
                    </option>

                    <option>
                      Cancelled
                    </option>

                  </select>

                </div>

              </div>

              {/* ITEMS */}

              <div className="space-y-5">

                {order.items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-slate-700 pb-4"
                    >

                      <div className="flex items-center gap-5">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />

                        <div>

                          <h3 className="text-2xl font-bold">

                            {item.name}

                          </h3>

                          <p className="text-gray-400">

                            Quantity:
                            {" "}
                            {item.quantity}

                          </p>

                        </div>

                      </div>

                      <p className="text-2xl font-bold text-yellow-400">

                        ₹{item.price}

                      </p>

                    </div>

                  )
                )}

              </div>

              {/* DETAILS */}

              <div className="mt-8 grid md:grid-cols-3 gap-6">

                <div className="bg-black border border-slate-800 rounded-2xl p-5">

                  <p className="text-gray-400 mb-2">

                    Address

                  </p>

                  <h3 className="text-lg font-bold">

                    {order.address}

                  </h3>

                </div>

                <div className="bg-black border border-slate-800 rounded-2xl p-5">

                  <p className="text-gray-400 mb-2">

                    Phone

                  </p>

                  <h3 className="text-lg font-bold">

                    {order.phone}

                  </h3>

                </div>

                <div className="bg-black border border-slate-800 rounded-2xl p-5">

                  <p className="text-gray-400 mb-2">

                    Payment

                  </p>

                  <h3 className="text-lg font-bold">

                    {order.payment_method}

                  </h3>

                </div>

              </div>

              {/* TOTAL */}

              <div className="text-right mt-8">

                <h2 className="text-4xl font-bold text-yellow-400">

                  Total:
                  {" "}
                  ₹{order.total}

                </h2>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default AdminOrders;