import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import { toast } from "react-toastify";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [reviewData, setReviewData] =
    useState({});

  // FETCH ORDERS

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

        setOrders(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);

  // HANDLE REVIEW INPUT

  const handleReviewChange = (
    orderId,
    field,
    value
  ) => {

    setReviewData({

      ...reviewData,

      [orderId]: {

        ...reviewData[orderId],

        [field]: value,

      },

    });

  };

  // SUBMIT REVIEW

  const submitReview = async (
    item,
    orderId
  ) => {

    try {

      const data =
        reviewData[orderId];

      if (
        !data?.rating ||
        !data?.comment
      ) {

        toast.error(
          "Please add rating and review"
        );

        return;

      }

      await api.post("/reviews", {

        food_name: item.name,

        customer_name:
          "Customer",

        rating: Number(
          data.rating
        ),

        comment: data.comment,

      });

      toast.success(
        "Review submitted successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to submit review"
      );

    }

  };

  // STATUS COLORS

  const getStatusColor = (
    status
  ) => {

    if (
      status === "Delivered"
    ) {

      return "bg-green-500";

    }

    if (
      status === "Preparing"
    ) {

      return "bg-yellow-400 text-black";

    }

    return "bg-blue-500";

  };

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-12">

      {/* HEADER */}

      <div className="mb-14">

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">

          Your Orders

        </h1>

        <p className="text-gray-400 text-lg">

          Track your food orders and delivery status

        </p>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold text-yellow-400">

            Loading Orders...

          </h2>

        </div>

      ) : orders.length === 0 ? (

        <div className="flex justify-center items-center mt-24">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-xl w-full">

            <h2 className="text-4xl font-bold mb-5">

              No Orders Found

            </h2>

            <p className="text-gray-400">

              Your placed orders will appear here

            </p>

          </div>

        </div>

      ) : (

        <div className="space-y-10">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            >

              {/* TOP */}

              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 px-8 py-6 border-b border-slate-800">

                <div>

                  <h2 className="text-3xl font-extrabold text-yellow-400">

                    Order #{order.id}

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {new Date(
                      order.created_at
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="flex items-center gap-5">

                  <div className={`${getStatusColor(
                    order.status
                  )} px-6 py-3 rounded-2xl font-bold text-lg`}>

                    {order.status}

                  </div>

                  <h2 className="text-3xl font-extrabold text-yellow-400">

                    ₹{order.total}

                  </h2>

                </div>

              </div>

              {/* ITEMS */}

              <div className="p-8 space-y-6">

                {order.items.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="bg-black border border-slate-800 rounded-3xl p-6"
                    >

                      <div className="flex flex-col lg:flex-row justify-between gap-6">

                        {/* LEFT */}

                        <div className="flex gap-5">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-28 h-28 rounded-2xl object-cover"
                          />

                          <div>

                            <h3 className="text-3xl font-bold">

                              {item.name}

                            </h3>

                            <p className="text-gray-400 mt-2 text-lg">

                              Quantity:
                              {" "}
                              {item.quantity}

                            </p>

                            <p className="text-yellow-400 font-bold text-2xl mt-3">

                              ₹{item.price}

                            </p>

                          </div>

                        </div>

                        {/* REVIEW SECTION */}

                        {
                          order.status ===
                          "Delivered" && (

                            <div className="lg:w-[400px] bg-slate-900 border border-slate-800 rounded-3xl p-6">

                              <h3 className="text-2xl font-bold text-yellow-400 mb-5">

                                Give Review

                              </h3>

                              {/* RATING */}

                              <select
                                value={
                                  reviewData[
                                    order.id
                                  ]?.rating || ""
                                }
                                onChange={(e) =>
                                  handleReviewChange(
                                    order.id,
                                    "rating",
                                    e.target.value
                                  )
                                }
                                className="w-full bg-black border border-slate-700 rounded-2xl px-5 py-4 mb-5 outline-none focus:border-yellow-400"
                              >

                                <option value="">

                                  Select Rating

                                </option>

                                <option value="5">

                                  ⭐⭐⭐⭐⭐

                                </option>

                                <option value="4">

                                  ⭐⭐⭐⭐

                                </option>

                                <option value="3">

                                  ⭐⭐⭐

                                </option>

                                <option value="2">

                                  ⭐⭐

                                </option>

                                <option value="1">

                                  ⭐

                                </option>

                              </select>

                              {/* COMMENT */}

                              <textarea
                                rows="4"
                                placeholder="Write your review..."
                                value={
                                  reviewData[
                                    order.id
                                  ]?.comment || ""
                                }
                                onChange={(e) =>
                                  handleReviewChange(
                                    order.id,
                                    "comment",
                                    e.target.value
                                  )
                                }
                                className="w-full bg-black border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 resize-none"
                              />

                              {/* BUTTON */}

                              <button
                                onClick={() =>
                                  submitReview(
                                    item,
                                    order.id
                                  )
                                }
                                className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl font-bold text-lg transition duration-300"
                              >

                                Submit Review

                              </button>

                            </div>

                          )
                        }

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Orders;