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

  const [reviews, setReviews] = useState([]);

  const [reviewForm, setReviewForm] = useState({
    customer_name: "",
    rating: 5,
    comment: "",
  });

  const { addToCart } = useContext(CartContext);

  // FETCH MENU

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

  // FETCH REVIEWS

  const fetchReviews = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/reviews"
      );

      setReviews(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // LOAD DATA

  useEffect(() => {

    fetchMenu();

    fetchReviews();

  }, []);

  // ADD REVIEW

  const handleReviewSubmit = async () => {

    if (
      !reviewForm.customer_name ||
      !reviewForm.comment
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          food_name: selectedItem.name,
          customer_name: reviewForm.customer_name,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }
      );

      toast.success("Review added");

      fetchReviews();

      setReviewForm({
        customer_name: "",
        rating: 5,
        comment: "",
      });

    } catch (error) {

      console.log(error);

      toast.error("Failed to add review");

    }

  };

  // UNIQUE CATEGORIES

  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  // FILTER MENU

  const filteredMenu = menu.filter((item) => {

    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;

  });

  // LOADING SCREEN

  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center">

        <h1 className="text-5xl font-bold text-yellow-400 animate-pulse">
          Loading Menu...
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* TITLE */}

      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-10">
        Explore Our Menu
      </h1>

      {/* SEARCH */}

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

            {/* CONTENT */}

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

              <p className="text-gray-300 mb-4">
                {item.description}
              </p>

              {/* RESTAURANT DETAILS */}

              <div className="flex justify-between items-center mb-5">

                <div>

                  <p className="text-yellow-400 font-bold">
                    {item.restaurant_name}
                  </p>

                  <p className="text-gray-400 text-sm">
                    🚚 {item.delivery_time}
                  </p>

                </div>

                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                  ⭐ {item.rating}
                </span>

              </div>

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

      {/* NO ITEMS */}

      {filteredMenu.length === 0 && (

        <div className="text-center mt-20">

          <h2 className="text-3xl text-gray-400 font-bold">
            No food items found
          </h2>

        </div>

      )}

      {/* MODAL */}

      {selectedItem && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 overflow-y-auto">

          <div className="bg-slate-900 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative">

            {/* CLOSE */}

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

              {/* TITLE */}

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-4xl font-bold text-yellow-400">
                  {selectedItem.name}
                </h2>

                <p className="text-3xl font-bold text-green-400">
                  ₹{selectedItem.price}
                </p>

              </div>

              {/* DESCRIPTION */}

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {selectedItem.description}
              </p>

              {/* RESTAURANT */}

              <div className="flex justify-between items-center mb-8">

                <div>

                  <p className="text-yellow-400 font-bold text-lg">
                    {selectedItem.restaurant_name}
                  </p>

                  <p className="text-gray-400">
                    🚚 {selectedItem.delivery_time}
                  </p>

                </div>

                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                  ⭐ {selectedItem.rating}
                </span>

              </div>

              {/* REVIEWS */}

              <div className="mt-10">

                <h3 className="text-3xl font-bold text-yellow-400 mb-6">
                  Customer Reviews
                </h3>

                <div className="space-y-4 mb-8">

                  {reviews
                    .filter(
                      (review) =>
                        review.food_name === selectedItem.name
                    )
                    .map((review) => (

                      <div
                        key={review.id}
                        className="bg-black/40 border border-slate-700 p-5 rounded-2xl"
                      >

                        <div className="flex justify-between items-center mb-3">

                          <h4 className="text-xl font-bold text-white">
                            {review.customer_name}
                          </h4>

                          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                            ⭐ {review.rating}
                          </span>

                        </div>

                        <p className="text-gray-300">
                          {review.comment}
                        </p>

                      </div>

                    ))}

                </div>

                {/* ADD REVIEW */}

                <div className="bg-black/40 border border-slate-700 rounded-3xl p-6">

                  <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                    Add Review
                  </h3>

                  <div className="space-y-5">

                    {/* NAME */}

                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewForm.customer_name}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          customer_name: e.target.value,
                        })
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-yellow-400"
                    />

                    {/* RATING */}

                    <select
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          rating: e.target.value,
                        })
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-yellow-400"
                    >
                      <option value="5">⭐ 5</option>
                      <option value="4">⭐ 4</option>
                      <option value="3">⭐ 3</option>
                      <option value="2">⭐ 2</option>
                      <option value="1">⭐ 1</option>
                    </select>

                    {/* COMMENT */}

                    <textarea
                      rows="4"
                      placeholder="Write your review..."
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          comment: e.target.value,
                        })
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-yellow-400"
                    />

                    {/* SUBMIT */}

                    <button
                      onClick={handleReviewSubmit}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
                    >
                      Submit Review
                    </button>

                  </div>

                </div>

              </div>

              {/* CATEGORY + CART */}

              <div className="flex justify-between items-center mt-10">

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