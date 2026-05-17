import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  const deliveryFee = 40;

  const gst = subtotal * 0.05;

  const total = subtotal + deliveryFee + gst;

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems,
          total,
          address,
          phone,
          paymentMethod,
        },
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
      console.error(error);

      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white px-6 py-10">

      <div className="max-w-3xl mx-auto bg-slate-900/70 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-10">
          Checkout
        </h1>

        {/* ORDER ITEMS */}

        <div className="space-y-4 mb-10">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-slate-700 pb-3"
            >
              <h2 className="text-lg font-semibold">
                {item.name}
              </h2>

              <p className="text-yellow-300 font-bold">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>

        {/* BILL DETAILS */}

        <div className="bg-slate-950 rounded-2xl p-6 mb-8 border border-slate-800">

          <div className="flex justify-between mb-3 text-lg">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-3 text-lg">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <div className="flex justify-between mb-3 text-lg">
            <span>GST (5%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-6 text-3xl font-bold text-yellow-400">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* ADDRESS */}

        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none mb-5"
        />

        {/* PHONE */}

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none mb-8"
        />

        {/* PAYMENT METHOD */}

        <div className="space-y-4 mb-10">

          <h3 className="text-2xl font-bold text-yellow-400">
            Select Payment Method
          </h3>

          {/* COD */}

          <div
            onClick={() => setPaymentMethod("Cash on Delivery")}
            className={`p-5 rounded-2xl cursor-pointer border-2 transition duration-300 ${
              paymentMethod === "Cash on Delivery"
                ? "border-yellow-400 bg-yellow-500/20"
                : "border-slate-700 bg-slate-900"
            }`}
          >
            <h4 className="text-xl font-bold">
              Cash on Delivery
            </h4>

            <p className="text-gray-400 mt-1">
              Pay when your food arrives
            </p>
          </div>

          {/* UPI */}

          <div
            onClick={() => setPaymentMethod("UPI")}
            className={`p-5 rounded-2xl cursor-pointer border-2 transition duration-300 ${
              paymentMethod === "UPI"
                ? "border-green-400 bg-green-500/20"
                : "border-slate-700 bg-slate-900"
            }`}
          >
            <h4 className="text-xl font-bold">
              UPI Payment
            </h4>

            <p className="text-gray-400 mt-1">
              Google Pay / PhonePe / Paytm
            </p>
          </div>

          {/* CARD */}

          <div
            onClick={() => setPaymentMethod("Card Payment")}
            className={`p-5 rounded-2xl cursor-pointer border-2 transition duration-300 ${
              paymentMethod === "Card Payment"
                ? "border-blue-400 bg-blue-500/20"
                : "border-slate-700 bg-slate-900"
            }`}
          >
            <h4 className="text-xl font-bold">
              Card Payment
            </h4>

            <p className="text-gray-400 mt-1">
              Visa / Mastercard / Debit Card
            </p>
          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={placeOrder}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-2xl text-xl transition duration-300"
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Checkout;