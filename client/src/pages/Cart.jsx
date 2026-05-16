import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">
          Cart is empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-64 h-52 object-cover"
                />

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {item.name}
                    </h2>

                    <p className="text-gray-400 mb-3">
                      {item.description}
                    </p>

                    <p className="text-yellow-400 text-xl font-bold">
                      ₹{item.price}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg mt-4 w-fit"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-slate-900 p-6 rounded-xl">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span>Total:</span>

              <span className="text-yellow-400">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-lg mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;