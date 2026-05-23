import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import { Link } from "react-router-dom";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
  } = useContext(CartContext);

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-12">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-12">

        <div>

          <h1 className="text-5xl font-extrabold text-yellow-400">

            Your Cart

          </h1>

          <p className="text-gray-400 mt-3 text-lg">

            Review your selected food items

          </p>

        </div>

        {
          cartItems.length > 0 && (

            <div className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl">

              <p className="text-gray-400 text-sm">

                Total Items

              </p>

              <h2 className="text-3xl font-bold text-yellow-400">

                {cartItems.length}

              </h2>

            </div>

          )
        }

      </div>

      {/* EMPTY CART */}

      {
        cartItems.length === 0 ? (

          <div className="flex flex-col items-center justify-center mt-28">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-lg w-full shadow-2xl">

              <h2 className="text-4xl font-bold text-white mb-5">

                Your Cart is Empty

              </h2>

              <p className="text-gray-400 text-lg mb-8">

                Looks like you haven't added anything yet.

              </p>

              <Link
                to="/menu"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold text-lg transition duration-300"
              >

                Explore Menu

              </Link>

            </div>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* CART ITEMS */}

            <div className="lg:col-span-2 space-y-6">

              {
                cartItems.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-yellow-400 transition duration-300 shadow-xl"
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-5">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-2xl border border-slate-700"
                        />

                        <div>

                          <h2 className="text-3xl font-bold mb-3">

                            {item.name}

                          </h2>

                          <p className="text-yellow-400 text-2xl font-bold">

                            ₹{item.price}

                          </p>

                          <p className="text-gray-400 mt-2 text-lg">

                            Quantity:
                            {" "}
                            <span className="text-white font-semibold">

                              {item.quantity}

                            </span>

                          </p>

                          <p className="text-gray-500 mt-2">

                            Subtotal:
                            {" "}
                            ₹
                            {item.price *
                              item.quantity}

                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="flex flex-col items-end gap-4">

                        <button
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold transition duration-300"
                        >

                          Remove

                        </button>

                      </div>

                    </div>

                  )
                )
              }

            </div>

            {/* ORDER SUMMARY */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-fit sticky top-28 shadow-2xl">

              <h2 className="text-4xl font-extrabold text-yellow-400 mb-8">

                Order Summary

              </h2>

              {/* SUMMARY */}

              <div className="space-y-5 border-b border-slate-800 pb-8">

                <div className="flex justify-between text-lg">

                  <span className="text-gray-400">

                    Items

                  </span>

                  <span className="font-semibold">

                    {cartItems.length}

                  </span>

                </div>

                <div className="flex justify-between text-lg">

                  <span className="text-gray-400">

                    Delivery

                  </span>

                  <span className="text-green-400 font-semibold">

                    Free

                  </span>

                </div>

                <div className="flex justify-between text-lg">

                  <span className="text-gray-400">

                    Taxes

                  </span>

                  <span className="font-semibold">

                    Included

                  </span>

                </div>

              </div>

              {/* TOTAL */}

              <div className="flex justify-between items-center mt-8 mb-10">

                <h3 className="text-2xl font-bold">

                  Total

                </h3>

                <h2 className="text-4xl font-extrabold text-yellow-400">

                  ₹{totalPrice}

                </h2>

              </div>

              {/* CHECKOUT BUTTON */}

              <Link
                to="/checkout"
                className="block w-full text-center bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
              >

                Proceed To Checkout

              </Link>

              {/* CONTINUE SHOPPING */}

              <Link
                to="/menu"
                className="block text-center mt-5 text-gray-400 hover:text-yellow-400 transition duration-300"
              >

                Continue Shopping

              </Link>

            </div>

          </div>

        )
      }

    </div>

  );

};

export default Cart;