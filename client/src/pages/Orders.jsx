import { useEffect, useState } from "react";

import api from "../api/axios";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await api.get(
            "/orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(res.data);

        setOrders(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-yellow-400 mb-10">

        Your Orders

      </h1>

      {loading ? (

        <h2>Loading...</h2>

      ) : orders.length === 0 ? (

        <h2>No Orders Found</h2>

      ) : (

        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-slate-900 p-6 rounded-2xl"
            >

              <div className="flex justify-between mb-5">

                <div>

                  <h2 className="text-2xl font-bold text-yellow-400">

                    Order #{order.id}

                  </h2>

                  <p className="text-gray-400">

                    {new Date(
                      order.created_at
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold h-fit">

                  {order.status}

                </div>

              </div>

              <div className="space-y-4">

                {order.items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex justify-between border-b border-slate-700 pb-3"
                    >

                      <div>

                        <h3 className="text-xl font-semibold">

                          {item.name}

                        </h3>

                        <p className="text-gray-400">

                          Quantity:
                          {" "}
                          {item.quantity}

                        </p>

                      </div>

                      <p className="text-yellow-400 font-bold">

                        ₹{item.price}

                      </p>

                    </div>

                  )
                )}

              </div>

              <div className="text-right mt-6">

                <h2 className="text-3xl font-bold text-yellow-400">

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

export default Orders;