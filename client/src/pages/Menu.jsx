import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { CartContext } from "../context/CartContext";

const Menu = () => {

  const [menu, setMenu] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [selectedItem, setSelectedItem] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/menu"
      );

      setMenu(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load menu");

    } finally {

      setLoading(false);

    }
  };

  // UNIQUE CATEGORIES

  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  // FILTER LOGIC

  const filteredMenu = menu.filter((item) => {

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;
  });

  // LOADING SKELETON

  if (loading) {
    return (
      <div className="min-h-screen bg-black px-6 py-10">

        <h1 className="text-5xl font-bold text-center text-yellow-400 mb-12">
          Loading Menu...
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[...Array(8)].map((_, index) => (

            <div
              key={index}
              className="bg-slate-900 rounded-3xl overflow-hidden animate-pulse"
            >

              {/* IMAGE */}

              <div className="h-64 bg-slate-800"></div>

              {/* CONTENT */}

              <div className="p-5 space-y-4">

                <div className="h-6 bg-slate-700 rounded w-3/4"></div>

                <div className="h-4 bg-slate-700 rounded"></div>

                <div className="h-4 bg-slate-700 rounded w-5/6"></div>

                <div className="flex justify-between items-center pt-3">

                  <div className="h-8 w-20 bg-slate-700 rounded-full"></div>

                  <div className="h-10 w-28 bg-slate-700 rounded-xl"></div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* PAGE TITLE */}

      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-10">
        Explore Our Menu
      </h1>

      {/* SEARCH BAR */}

      <div className="max-w-2xl mx-auto mb-8">

        <input
          type="text"
          placeholder="Search food items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#111827] border border-gray-700 text-white outline-none focus:border-yellow-400"
        />

      </div>

      {/* CATEGORY BUTTONS */}

      <div className="flex flex-wrap justify-center gap-4 mb-12">

        {categories.map((cat, index) => (

          <button
            key={index}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold transition duration-300
              ${
                category === cat
                  ? "bg-yellow-400 text-black"
                  : "bg-[#111827] text-white hover:bg-yellow-500 hover:text-black"
              }`}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* MENU GRID */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {filteredMenu.map((item) => (

          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
          >

            {/* IMAGE */}

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop";
              }}
            />

            {/* CARD CONTENT */}

            <div className="p-5">

              {/* NAME + PRICE */}

              <div className="flex justify-between items-center mb-3">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <span className="text-yellow-400 text-xl font-bold">
                  ₹{item.price}
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="text-gray-300 mb-5">
                {item.description}
              </p>

              {/* CATEGORY + BUTTON */}

              <div className="flex justify-between items-center">

                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {item.category}
                </span>

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    addToCart(item);

                    toast.success(
                      `${item.name} added to cart`
                    );

                  }}
                  className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* NO ITEMS FOUND */}

      {filteredMenu.length === 0 && (

        <div className="text-center mt-20">

          <h2 className="text-3xl text-gray-400 font-bold">
            No food items found
          </h2>

        </div>

      )}

      {/* FOOD DETAILS MODAL */}

      {selectedItem && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">

          <div className="bg-slate-900 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative">

            {/* CLOSE BUTTON */}

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-bold"
            >
              X
            </button>

            {/* IMAGE */}

            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-80 object-cover"
            />

            {/* CONTENT */}

            <div className="p-8">

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-4xl font-bold text-yellow-400">
                  {selectedItem.name}
                </h2>

                <p className="text-3xl font-bold text-green-400">
                  ₹{selectedItem.price}
                </p>

              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="flex justify-between items-center">

                <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">
                  {selectedItem.category}
                </span>

                <button
                  onClick={() => {

                    addToCart(selectedItem);

                    toast.success(
                      `${selectedItem.name} added to cart`
                    );

                  }}
                  className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-2xl font-bold text-lg"
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Menu;