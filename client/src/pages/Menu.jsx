import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  FaShoppingCart,
  FaFire,
} from "react-icons/fa";

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

  const [filteredItems, setFilteredItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  // FETCH MENU

  const fetchMenu = async () => {

    try {

      const res =
        await api.get("/menu");

      setMenuItems(res.data);

      setFilteredItems(res.data);

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

  // PROFESSIONAL FIXED CATEGORIES

  const categories = [

    "All",

    "Tiffins",

    "Biryani",

    "Pizza",

    "Burgers",

    "Indian Meals",

    "Chinese",

    "Curry Combos",

    "Breads & Rotis",

    "Ice Creams",

    "Desserts",

    "Beverages",

  ];

  // FILTER LOGIC

  useEffect(() => {

    let updatedItems =
      [...menuItems];

    // CATEGORY FILTER

    if (
      selectedCategory !== "All"
    ) {

      updatedItems =
        updatedItems.filter(
          (item) =>
            item.category ===
            selectedCategory
        );

    }

    // SEARCH FILTER

    if (search.trim()) {

      updatedItems =
        updatedItems.filter(
          (item) =>

            item.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            item.restaurant_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

            ||

            item.category
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

        );

    }

    setFilteredItems(
      updatedItems
    );

  }, [
    selectedCategory,
    search,
    menuItems,
  ]);

  // ADD TO CART

  const handleAddToCart = (
    item
  ) => {

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

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14 overflow-hidden">

      {/* HERO SECTION */}

      <div className="relative mb-20">

        <div className="absolute inset-0 bg-yellow-500/10 blur-[120px]"></div>

        <div className="relative z-10 text-center">

          <div className="inline-flex items-center gap-3 bg-slate-900 border border-yellow-400/20 px-6 py-3 rounded-full mb-8">

            <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

            <span className="text-yellow-400 font-semibold">

              Live Restaurant Menu

            </span>

          </div>

          <h1 className="text-6xl lg:text-7xl font-extrabold text-yellow-400 mb-6 leading-tight">

            Discover Amazing <br />

            Food Near You

          </h1>

          <p className="text-gray-400 text-xl max-w-4xl mx-auto leading-relaxed">

            Explore premium dishes from top-rated restaurants with
            lightning-fast delivery and unforgettable taste experiences.

          </p>

        </div>

      </div>

      {/* SEARCH BAR */}

      <div className="flex justify-center mb-12">

        <div className="relative w-full max-w-3xl">

          <input
            type="text"
            placeholder="Search foods, restaurants, categories..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-3xl px-8 py-5 text-lg outline-none focus:border-yellow-400 shadow-2xl"
          />

        </div>

      </div>

      {/* CATEGORY FILTERS */}

      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 mb-16">

        {categories.map(
          (category, index) => (

            <button
              key={index}
              onClick={() =>
                setSelectedCategory(
                  category
                )
              }
              className={`px-7 py-4 rounded-2xl whitespace-nowrap font-bold text-lg transition duration-300 border

              ${
                selectedCategory ===
                category

                  ? "bg-yellow-400 text-black border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.35)]"

                  : "bg-slate-900 border-slate-700 hover:border-yellow-400 hover:text-yellow-400"
              }`}
            >

              {category}

            </button>

          )
        )}

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex justify-center items-center py-40">

          <h2 className="text-4xl font-bold text-yellow-400 animate-pulse">

            Loading Menu...

          </h2>

        </div>

      ) : filteredItems.length === 0 ? (

        <div className="text-center py-40">

          <h2 className="text-5xl font-bold text-red-400 mb-5">

            No Food Items Found

          </h2>

          <p className="text-gray-400 text-xl">

            Try another category or search term.

          </p>

        </div>

      ) : (

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {filteredItems.map(
            (item) => (

              <div
                key={item.id}
                className="group bg-slate-900 border border-slate-800 rounded-[35px] overflow-hidden shadow-2xl hover:border-yellow-400/40 hover:-translate-y-2 transition duration-500"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden">

                  <img
                    src={
                      item.image?.trim()

                        ? item.image

                        : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                    }
                    alt={item.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* CATEGORY */}

                  <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md text-yellow-400 px-4 py-2 rounded-full text-sm font-bold border border-yellow-400/30">

                    {item.category}

                  </div>

                  {/* BESTSELLER */}

                  {
                    item.rating >= 4.8 && (

                      <div className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl">

                        <FaFire />

                        Bestseller

                      </div>

                    )
                  }

                </div>

                {/* CONTENT */}

                <div className="p-7">

                  {/* HEADER */}

                  <div className="flex justify-between items-start mb-5 gap-4">

                    <div>

                      <h2 className="text-3xl font-bold mb-2 leading-tight">

                        {item.name}

                      </h2>

                      <p className="text-gray-400 text-lg">

                        {
                          item.restaurant_name
                        }

                      </p>

                    </div>

                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold shadow-lg text-lg whitespace-nowrap">

                      ⭐ {item.rating}

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  <p className="text-gray-300 leading-relaxed text-lg mb-7 h-[90px] overflow-hidden">

                    {item.description}

                  </p>

                  {/* DELIVERY + PRICE */}

                  <div className="flex justify-between items-center mb-8">

                    <div>

                      <p className="text-gray-400 mb-1">

                        Delivery Time

                      </p>

                      <p className="font-bold text-lg">

                        🚚 {
                          item.delivery_time
                        }

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-gray-400 mb-1">

                        Price

                      </p>

                      <p className="text-yellow-400 text-4xl font-extrabold">

                        ₹{item.price}

                      </p>

                    </div>

                  </div>

                  {/* ADD TO CART */}

                  <button
                    onClick={() =>
                      handleAddToCart(
                        item
                      )
                    }
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-5 rounded-2xl text-xl transition duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-[0_0_25px_rgba(250,204,21,0.25)]"
                  >

                    <FaShoppingCart />

                    Add To Cart

                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

};

export default Menu;