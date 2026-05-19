import { useEffect, useState, useContext } from "react";

import { FaShoppingCart } from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../api/axios";

import { CartContext } from "../context/CartContext";

const Menu = () => {

  // CART CONTEXT

  const { addToCart } =
    useContext(CartContext);

  // STATES

  const [menuItems, setMenuItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH MENU

  const fetchMenu = async () => {

    try {

      const res =
        await api.get("/menu");

      setMenuItems(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch menu"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchMenu();

  }, []);

  // HANDLE ADD TO CART

  const handleAddToCart = (item) => {

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });

    toast.success(
      `${item.name} added to cart`
    );

  };

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">

      {/* TITLE */}

      <div className="text-center mb-16">

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-5">

          Explore Our Menu

        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto">

          Discover premium dishes from top restaurants
          with lightning-fast delivery and delicious taste.

        </p>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex justify-center items-center py-32">

          <h2 className="text-3xl font-bold text-yellow-400 animate-pulse">

            Loading Menu...

          </h2>

        </div>

      ) : menuItems.length === 0 ? (

        <div className="text-center py-32">

          <h2 className="text-4xl font-bold text-red-400 mb-4">

            No Food Items Found

          </h2>

          <p className="text-gray-400 text-xl">

            Admin has not added menu items yet.

          </p>

        </div>

      ) : (

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {menuItems.map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"
            >

              {/* IMAGE */}

              <img
                src={
                  item.image?.trim()
                    ? item.image
                    : "https://via.placeholder.com/400"
                }
                alt={item.name}
                className="w-full h-64 object-cover"
              />

              {/* CONTENT */}

              <div className="p-6">

                {/* HEADER */}

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h2 className="text-3xl font-bold mb-2">

                      {item.name}

                    </h2>

                    <p className="text-gray-400">

                      {item.restaurant}

                    </p>

                  </div>

                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">

                    ⭐ {item.rating}

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="text-gray-300 leading-relaxed mb-6">

                  {item.description}

                </p>

                {/* DELIVERY */}

                <div className="flex justify-between items-center mb-6">

                  <span className="text-gray-400">

                    🚚 {item.deliverytime}

                  </span>

                  <span className="text-yellow-400 text-3xl font-extrabold">

                    ₹{item.price}

                  </span>

                </div>

                {/* BUTTON */}

                <button
                  onClick={() =>
                    handleAddToCart(item)
                  }
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-lg transition duration-300 flex items-center justify-center gap-3"
                >

                  <FaShoppingCart />

                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Menu;