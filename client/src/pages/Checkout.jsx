import { useContext, useEffect } from "react";

import { CartContext } from "../context/CartContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Checkout = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    clearCart,
  } = useContext(CartContext);

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

  // PLACE ORDER

  const placeOrder = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const orderData = {

        items: cartItems,

        total: totalPrice,

        address:
          "Default Address",

        phone:
          "9999999999",

        paymentMethod:
          "Cash On Delivery",

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

    <div className="min-h-screen bg-black text-white px-6 py-12">

      <h1 className="text-5xl font-bold text-yellow-400 mb-10">

        Checkout

      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold">

            Cart is Empty

          </h2>

        </div>

      ) : (

        <div className="grid gap-6">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 p-5 rounded-2xl flex justify-between items-center"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">

                    {item.name}

                  </h2>

                  <p className="text-yellow-400 text-xl">

                    ₹{item.price}

                  </p>

                  <p className="text-gray-400">

                    Quantity:
                    {" "}
                    {item.quantity}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-2xl font-bold text-yellow-400">

                  ₹
                  {item.price *
                    item.quantity}

                </p>

              </div>

            </div>

          ))}

          {/* TOTAL */}

          <div className="bg-slate-900 p-6 rounded-2xl">

            <h2 className="text-3xl font-bold text-yellow-400 mb-5">

              Total:
              {" "}
              ₹{totalPrice}

            </h2>

            <button
              onClick={placeOrder}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-lg"
            >

              Place Order

            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default Checkout;