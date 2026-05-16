import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const { cartItems, removeFromCart, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  // TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  // PLACE ORDER
  const handlePlaceOrder = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems,
          total: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Order placed successfully");

      clearCart();

      navigate("/orders");

    } catch (error) {

      console.log(error);

      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400">
          Cart is empty
        </p>
      ) : (
        <div className="space-y-6">

          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 p-5 rounded-xl flex justify-between items-center"
            >

              <div>
                <h2 className="text-2xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-yellow-400">
                  ₹{item.price}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>
          ))}

          {/* CART SUMMARY */}

          <div className="bg-gray-800 p-6 rounded-xl">

            <h2 className="text-3xl font-bold mb-4">
              Cart Summary
            </h2>

            <p className="text-xl mb-6">
              Total: ₹{totalPrice}
            </p>

            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded"
            >
              Place Order
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;