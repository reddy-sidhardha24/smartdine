import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const deliveryFee = 40;

  const gst = subtotal * 0.05;

  const grandTotal = subtotal + deliveryFee + gst;

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        items: cartItems,
        total: grandTotal,
        address,
        phone,
        paymentMethod,
      };

      await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");

      clearCart();

      navigate("/orders");
    } catch (error) {
      console.log(error);

      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        Checkout
      </h1>

      <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-xl">

        <div className="space-y-4 mb-8">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-700 pb-3"
            >
              <h2>{item.name}</h2>

              <p>₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 text-lg mb-8">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="flex justify-between">
            <span>GST (5%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-yellow-400 text-2xl font-bold">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 rounded bg-slate-800 border border-gray-700"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 rounded bg-slate-800 border border-gray-700"
          />

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-4 rounded bg-slate-800 border border-gray-700"
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card Payment</option>
          </select>

          <button
            onClick={handleOrder}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-lg"
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;