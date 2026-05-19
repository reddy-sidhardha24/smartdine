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
      total + item.price * item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-yellow-400 mb-10">

        Your Cart

      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-3xl font-semibold mb-4">
            Cart is Empty
          </h2>

          <Link
            to="/menu"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            Explore Menu
          </Link>

        </div>

      ) : (

        <div className="grid gap-6">

          {cartItems.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-5 flex items-center justify-between"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-yellow-400 text-xl mt-2">
                    ₹{item.price}
                  </p>

                  <p className="text-gray-400 mt-1">
                    Quantity: {item.quantity}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold"
              >
                Remove
              </button>

            </div>

          ))}

          <div className="bg-slate-900 p-6 rounded-2xl mt-5">

            <h2 className="text-3xl font-bold text-yellow-400">

              Total: ₹{totalPrice}

            </h2>

            <Link
              to="/checkout"
              className="inline-block mt-5 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold"
            >
              Proceed To Checkout
            </Link>

          </div>

        </div>

      )}

    </div>

  );

};

export default Cart;