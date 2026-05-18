import { useContext, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { CartContext } from "../context/CartContext";

const Checkout = () => {

  const {
    cartItems,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  // CHECKOUT FUNCTION

  const handleCheckout = async () => {

    // NAME VALIDATION

    if (!name.trim()) {

      toast.error("Name is required");

      return;

    }

    // PHONE VALIDATION

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone)) {

      toast.error(
        "Enter valid 10-digit phone number"
      );

      return;

    }

    // ADDRESS VALIDATION

    if (address.trim().length < 10) {

      toast.error(
        "Address must contain at least 10 characters"
      );

      return;

    }

    // PAYMENT VALIDATION

    if (!paymentMethod) {

      toast.error(
        "Please select payment method"
      );

      return;

    }

    // EMPTY CART VALIDATION

    if (cartItems.length === 0) {

      toast.error("Cart is empty");

      return;

    }

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems,
          total: totalPrice,
          address,
          phone,
          paymentMethod,
          customerName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Order placed successfully"
      );

      clearCart();

      navigate("/orders");

    } catch (error) {

      console.log(error);

      toast.error("Checkout failed");

    }

  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* PAGE TITLE */}

      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-14">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT SECTION */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Delivery Details
          </h2>

          <div className="space-y-6">

            {/* NAME */}

            <div>

              <label className="block mb-2 text-lg font-semibold">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

            {/* PHONE */}

            <div>

              <label className="block mb-2 text-lg font-semibold">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

            {/* ADDRESS */}

            <div>

              <label className="block mb-2 text-lg font-semibold">
                Delivery Address
              </label>

              <textarea
                rows="5"
                placeholder="Enter complete delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
              />

            </div>

            {/* PAYMENT */}

            <div>

              <label className="block mb-2 text-lg font-semibold">
                Payment Method
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
              >
                <option value="COD">
                  Cash on Delivery
                </option>

                <option value="UPI">
                  UPI Payment
                </option>

                <option value="Card">
                  Credit / Debit Card
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl h-fit">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Order Summary
          </h2>

          {/* CART ITEMS */}

          <div className="space-y-5 mb-10 max-h-[400px] overflow-y-auto pr-2">

            {cartItems.map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center bg-black/40 border border-slate-700 rounded-2xl p-4"
              >

                <div>

                  <h3 className="text-xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {item.restaurant_name}
                  </p>

                </div>

                <p className="text-yellow-400 text-xl font-bold">
                  ₹{item.price}
                </p>

              </div>

            ))}

          </div>

          {/* TOTAL */}

          <div className="flex justify-between items-center mb-10 border-t border-slate-700 pt-6">

            <h3 className="text-3xl font-bold">
              Total
            </h3>

            <p className="text-4xl font-extrabold text-green-400">
              ₹{totalPrice}
            </p>

          </div>

          {/* PLACE ORDER BUTTON */}

          <button
            onClick={handleCheckout}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-5 rounded-2xl text-2xl font-bold transition duration-300"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default Checkout;