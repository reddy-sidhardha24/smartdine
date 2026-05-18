import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { CartContext } from "../context/CartContext";

const Cart = () => {

  const {
    cartItems,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  // EMPTY CART UI

  if (cartItems.length === 0) {

    return (

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">

        {/* IMAGE */}

        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-56 mb-10 opacity-80"
        />

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6">

          Your Cart is Empty

        </h1>

        {/* DESCRIPTION */}

        <p className="text-gray-400 text-xl max-w-2xl leading-relaxed mb-10">

          Looks like you haven't added any delicious food yet.
          Explore our premium menu and discover amazing dishes.

        </p>

        {/* BUTTON */}

        <Link
          to="/menu"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
        >
          Explore Menu
        </Link>

      </div>

    );

  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* TITLE */}

      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-14">
        Your Cart
      </h1>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* CART ITEMS */}

        <div className="lg:col-span-2 space-y-6">

          {cartItems.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >

              {/* IMAGE */}

              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-64 h-64 object-cover"
              />

              {/* CONTENT */}

              <div className="flex-1 p-8 flex flex-col justify-between">

                <div>

                  {/* NAME + PRICE */}

                  <div className="flex justify-between items-center mb-4">

                    <h2 className="text-3xl font-bold text-yellow-400">
                      {item.name}
                    </h2>

                    <p className="text-2xl font-bold text-green-400">
                      ₹{item.price}
                    </p>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-gray-300 mb-5 leading-relaxed">
                    {item.description}
                  </p>

                  {/* RESTAURANT */}

                  <div className="flex justify-between items-center mb-5">

                    <div>

                      <p className="text-yellow-400 font-bold">
                        {item.restaurant_name}
                      </p>

                      <p className="text-gray-400 text-sm">
                        🚚 {item.delivery_time}
                      </p>

                    </div>

                    <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
                      ⭐ {item.rating}
                    </span>

                  </div>

                </div>

                {/* REMOVE BUTTON */}

                <button
                  onClick={() => {

                    removeFromCart(item.id);

                    toast.success(
                      `${item.name} removed from cart`
                    );

                  }}
                  className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl text-lg font-bold transition duration-300 w-fit"
                >
                  Remove Item
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl h-fit sticky top-28">

          <h2 className="text-4xl font-bold text-yellow-400 mb-10">
            Order Summary
          </h2>

          {/* TOTAL ITEMS */}

          <div className="flex justify-between items-center mb-6">

            <p className="text-xl text-gray-300">
              Total Items
            </p>

            <p className="text-2xl font-bold text-white">
              {cartItems.length}
            </p>

          </div>

          {/* TOTAL PRICE */}

          <div className="flex justify-between items-center mb-10 border-b border-slate-700 pb-6">

            <p className="text-2xl font-bold">
              Total Price
            </p>

            <p className="text-4xl font-extrabold text-green-400">
              ₹{totalPrice}
            </p>

          </div>

          {/* BUTTONS */}

          <div className="space-y-5">

            {/* CHECKOUT */}

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
            >
              Proceed to Checkout
            </button>

            {/* CLEAR CART */}

            <button
              onClick={() => {

                clearCart();

                toast.success("Cart cleared");

              }}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-2xl text-xl font-bold transition duration-300"
            >
              Clear Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;