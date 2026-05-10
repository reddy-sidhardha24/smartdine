import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } =
    useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  return (
    <div className="p-10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">
          Cart is empty
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-400">
                    {item.description}
                  </p>

                  <p className="text-orange-400 mt-2">
                    ₹{item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-900 p-6 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">
              Cart Summary
            </h2>

            <p className="text-xl mb-2">
              Total Items:
              <span className="text-orange-400 ml-2">
                {cartItems.length}
              </span>
            </p>

            <p className="text-xl">
              Total Price:
              <span className="text-green-400 ml-2">
                ₹{totalPrice}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;