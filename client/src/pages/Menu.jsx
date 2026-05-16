import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/menu");
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
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  // LOADING SCREEN
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <h1 className="text-3xl text-yellow-400 font-bold">
          Loading Menu...
        </h1>
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredMenu.map((item) => (
          <div
            key={item.id}
            className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300"
          >

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
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
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to cart`);
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

    </div>
  );
};

export default Menu;