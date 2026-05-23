import {
  useContext,
  useEffect,
  useState,
} from "react";

import { CartContext } from "../context/CartContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Checkout = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    clearCart,
  } = useContext(CartContext);

  // FORM DATA

  const [formData, setFormData] =
    useState({

      fullName: "",

      mobile: "",

      address: "",

      paymentMethod:
        "Cash On Delivery",

    });

  // USER AUTH CHECK

  useEffect(() => {

    const userToken =
      localStorage.getItem("token");

    if (!userToken) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

    }

  }, [navigate]);

  // TOTAL PRICE

  const totalPrice =
    cartItems.reduce(

      (total, item) =>

        total +
        item.price * item.quantity,

      0

    );

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // PLACE ORDER

  const placeOrder = async () => {

    // VALIDATION

    if (
      !formData.fullName.trim() ||
      !formData.mobile.trim() ||
      !formData.address.trim()
    ) {

      toast.error(
        "Please fill all fields"
      );

      return;

    }

    if (
      formData.mobile.length !== 10
    ) {

      toast.error(
        "Enter valid mobile number"
      );

      return;

    }

    try {

      const token =
        localStorage.getItem("token");

      const orderData = {

        items: cartItems,

        total: totalPrice,

        customerName:
          formData.fullName,

        address:
          formData.address,

        phone:
          formData.mobile,

        paymentMethod:
          formData.paymentMethod,

      };

      const response =
        await fetch(
          "http://localhost:5000/api/orders",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            body: JSON.stringify(
              orderData
            ),

          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message
        );

      }

      toast.success(
        "Order placed successfully!"
      );

      clearCart();

      navigate("/orders");

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to place order"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-12">

      {/* HEADER */}

      <div className="mb-12">

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">

          Checkout

        </h1>

        <p className="text-gray-400 text-lg">

          Complete your order details and payment

        </p>

      </div>

      {
        cartItems.length === 0 ? (

          <div className="flex justify-center items-center mt-24">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center max-w-lg w-full">

              <h2 className="text-4xl font-bold mb-5">

                Cart is Empty

              </h2>

              <p className="text-gray-400 mb-8">

                Add items before checkout

              </p>

              <button
                onClick={() =>
                  navigate("/menu")
                }
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold transition duration-300"
              >

                Explore Menu

              </button>

            </div>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT SECTION */}

            <div className="lg:col-span-2 space-y-8">

              {/* DELIVERY DETAILS */}

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <h2 className="text-3xl font-bold text-yellow-400 mb-8">

                  Delivery Details

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* NAME */}

                  <div>

                    <label className="block mb-3 text-lg font-semibold">

                      Full Name

                    </label>

                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your name"
                      value={
                        formData.fullName
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
                    />

                  </div>

                  {/* MOBILE */}

                  <div>

                    <label className="block mb-3 text-lg font-semibold">

                      Mobile Number

                    </label>

                    <input
                      type="number"
                      name="mobile"
                      placeholder="Enter mobile number"
                      value={
                        formData.mobile
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
                    />

                  </div>

                </div>

                {/* ADDRESS */}

                <div className="mt-6">

                  <label className="block mb-3 text-lg font-semibold">

                    Delivery Address

                  </label>

                  <textarea
                    rows="5"
                    name="address"
                    placeholder="Enter complete delivery address"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 resize-none"
                  />

                </div>

              </div>

              {/* PAYMENT METHOD */}

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <h2 className="text-3xl font-bold text-yellow-400 mb-8">

                  Payment Method

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* COD */}

                  <label className={`border rounded-3xl p-6 cursor-pointer transition duration-300 ${
                    formData.paymentMethod ===
                    "Cash On Delivery"
                      ? "border-yellow-400 bg-slate-800"
                      : "border-slate-700"
                  }`}>

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash On Delivery"
                      checked={
                        formData.paymentMethod ===
                        "Cash On Delivery"
                      }
                      onChange={
                        handleChange
                      }
                      className="hidden"
                    />

                    <h3 className="text-2xl font-bold mb-3">

                      Cash On Delivery

                    </h3>

                    <p className="text-gray-400">

                      Pay when your order arrives

                    </p>

                  </label>

                  {/* UPI */}

                  <label className={`border rounded-3xl p-6 cursor-pointer transition duration-300 ${
                    formData.paymentMethod ===
                    "UPI Payment"
                      ? "border-yellow-400 bg-slate-800"
                      : "border-slate-700"
                  }`}>

                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI Payment"
                      checked={
                        formData.paymentMethod ===
                        "UPI Payment"
                      }
                      onChange={
                        handleChange
                      }
                      className="hidden"
                    />

                    <h3 className="text-2xl font-bold mb-3">

                      UPI Payment

                    </h3>

                    <p className="text-gray-400">

                      Pay securely using UPI apps

                    </p>

                  </label>

                </div>

              </div>

            </div>

            {/* RIGHT SECTION */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-fit sticky top-28">

              <h2 className="text-4xl font-extrabold text-yellow-400 mb-8">

                Order Summary

              </h2>

              {/* ITEMS */}

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">

                {
                  cartItems.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 border-b border-slate-800 pb-5"
                      >

                        <div className="flex items-center gap-4">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-2xl"
                          />

                          <div>

                            <h3 className="text-xl font-bold">

                              {item.name}

                            </h3>

                            <p className="text-gray-400">

                              Qty:
                              {" "}
                              {
                                item.quantity
                              }

                            </p>

                          </div>

                        </div>

                        <h3 className="text-xl font-bold text-yellow-400">

                          ₹
                          {
                            item.price *
                            item.quantity
                          }

                        </h3>

                      </div>

                    )
                  )
                }

              </div>

              {/* PRICE DETAILS */}

              <div className="mt-8 space-y-4 border-t border-slate-800 pt-6">

                <div className="flex justify-between text-lg">

                  <span className="text-gray-400">

                    Subtotal

                  </span>

                  <span>

                    ₹{totalPrice}

                  </span>

                </div>

                <div className="flex justify-between text-lg">

                  <span className="text-gray-400">

                    Delivery Fee

                  </span>

                  <span className="text-green-400">

                    FREE

                  </span>

                </div>

                <div className="flex justify-between text-3xl font-bold mt-6">

                  <span>

                    Total

                  </span>

                  <span className="text-yellow-400">

                    ₹{totalPrice}

                  </span>

                </div>

              </div>

              {/* PLACE ORDER BUTTON */}

              <button
                onClick={placeOrder}
                className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
              >

                Place Order

              </button>

            </div>

          </div>

        )
      }

    </div>

  );

};

export default Checkout;