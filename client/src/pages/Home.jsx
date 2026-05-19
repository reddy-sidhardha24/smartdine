import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

const Home = () => {

  const [foods, setFoods] = useState([]);

  // FETCH MENU ITEMS

  const fetchFoods = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/menu"
      );

      setFoods(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchFoods();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}

      <section className="relative px-6 lg:px-20 py-24 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/5 to-red-500/10 blur-3xl"></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <div>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight mb-8">

              Delicious Food <br />

              Delivered <span className="text-yellow-400">
                Fast
              </span>

            </h1>

            <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl">

              SmartDine delivers premium meals from
              top restaurants with lightning-fast
              delivery, secure ordering, and the best
              dining experience.

            </p>

            <div className="flex flex-wrap gap-6">

              <Link
                to="/menu"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
              >
                Explore Menu
              </Link>

              <Link
                to="/careers"
                className="border border-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
              >
                Careers
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="relative flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Food"
              className="w-full max-w-2xl rounded-3xl shadow-2xl object-cover"
            />

          </div>

        </div>

      </section>

      {/* TRENDING FOODS */}

      <section className="px-6 lg:px-20 py-20">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">

          <div>

            <h2 className="text-5xl font-extrabold text-yellow-400 mb-4">

              Trending Foods

            </h2>

            <p className="text-gray-400 text-xl">

              Most loved dishes by SmartDine customers

            </p>

          </div>

          <Link
            to="/menu"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 w-fit"
          >
            View Full Menu
          </Link>

        </div>

        {/* FOOD GRID */}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {foods.slice(0, 4).map((item) => (

            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"
            >

              {/* FOOD IMAGE */}

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

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h3 className="text-2xl font-bold text-white mb-2">

                      {item.name}

                    </h3>

                    <p className="text-gray-400">

                      {item.restaurant_name}

                    </p>

                  </div>

                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">

                    ⭐ {item.rating}

                  </span>

                </div>

                <div className="flex justify-between items-center mt-6">

                  <p className="text-3xl font-extrabold text-yellow-400">

                    ₹{item.price}

                  </p>

                  <p className="text-gray-400">

                    🚚 {item.delivery_time}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="px-6 lg:px-20 py-20">

        <h2 className="text-5xl font-extrabold text-center text-yellow-400 mb-16">

          Why Choose SmartDine?

        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

            <div className="text-6xl mb-6">
              ⚡
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Fast Delivery
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">

              Lightning-fast delivery network ensuring
              hot and fresh food reaches your doorstep.

            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

            <div className="text-6xl mb-6">
              🍔
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Premium Food
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">

              Top-rated restaurants and premium dishes
              crafted by experienced chefs.

            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

            <div className="text-6xl mb-6">
              🔒
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Secure Ordering
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">

              Safe payments, encrypted transactions,
              and reliable order management system.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;