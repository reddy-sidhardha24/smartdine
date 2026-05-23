import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

const Home = () => {

  const [foods, setFoods] =
    useState([]);

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

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO SECTION */}

      <section className="relative px-6 lg:px-20 py-24">

        {/* BACKGROUND EFFECT */}

        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/5 to-red-500/10 blur-3xl"></div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}

          <div>

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-slate-900 border border-yellow-400/30 px-5 py-3 rounded-full mb-8">

              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>

              <p className="text-yellow-400 font-semibold">

                Live Food Delivery Platform

              </p>

            </div>

            {/* TITLE */}

            <h1 className="text-6xl lg:text-8xl font-extrabold leading-tight mb-8">

              Delicious Food

              <br />

              Delivered

              <span className="text-yellow-400">
                {" "}
                Fast
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="text-gray-300 text-xl leading-relaxed mb-10 max-w-2xl">

              SmartDine delivers premium meals from
              top restaurants with lightning-fast
              delivery, secure ordering, and the best
              dining experience in real time.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-6">

              <Link
                to="/menu"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-5 rounded-2xl text-xl font-bold transition duration-300 shadow-[0_0_35px_rgba(250,204,21,0.35)] hover:scale-105"
              >

                Explore Menu

              </Link>

              <Link
                to="/orders"
                className="border border-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-5 rounded-2xl text-xl font-bold transition duration-300 hover:scale-105"
              >

                Orders

              </Link>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-3 gap-6 mt-16">

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">

                <h2 className="text-4xl font-extrabold text-yellow-400 mb-2">

                  10K+

                </h2>

                <p className="text-gray-400">

                  Orders Delivered

                </p>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">

                <h2 className="text-4xl font-extrabold text-yellow-400 mb-2">

                  500+

                </h2>

                <p className="text-gray-400">

                  Restaurants

                </p>

              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">

                <h2 className="text-4xl font-extrabold text-yellow-400 mb-2">

                  4.9★

                </h2>

                <p className="text-gray-400">

                  Customer Rating

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}

          <div className="relative flex justify-center">

            {/* GLOW */}

            <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-[120px] rounded-full"></div>

            {/* MAIN IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Food"
              className="relative z-10 w-full max-w-3xl rounded-[40px] shadow-[0_0_60px_rgba(250,204,21,0.15)] object-cover border border-slate-800 hover:scale-105 transition duration-500"
            />

            {/* FLOATING CARD */}

            <div className="absolute bottom-[-20px] left-[-20px] bg-slate-900 border border-slate-700 rounded-3xl px-6 py-5 shadow-2xl z-20">

              <p className="text-gray-400 text-sm mb-1">

                Delivery Time

              </p>

              <h3 className="text-3xl font-extrabold text-yellow-400">

                15-20 Min

              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* TRENDING FOODS */}

      <section className="px-6 lg:px-20 py-24">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-16">

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
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-2xl text-lg font-bold transition duration-300 hover:scale-105 w-fit"
          >

            View Full Menu

          </Link>

        </div>

        {/* FOOD GRID */}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

          {foods.slice(0, 4).map((item) => (

            <div
              key={item.id}
              className="group bg-slate-900 border border-slate-800 rounded-[35px] overflow-hidden hover:border-yellow-400/40 hover:-translate-y-3 transition duration-500 shadow-2xl"
            >

              {/* IMAGE */}

              <div className="overflow-hidden">

                <img
                  src={
                    item.image?.trim()
                      ? item.image
                      : "https://via.placeholder.com/400"
                  }
                  alt={item.name}
                  className="w-full h-72 object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              {/* CONTENT */}

              <div className="p-7">

                <div className="flex justify-between items-start mb-5">

                  <div>

                    <h3 className="text-3xl font-bold mb-2">

                      {item.name}

                    </h3>

                    <p className="text-gray-400 text-lg">

                      {item.restaurant_name}

                    </p>

                  </div>

                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold shadow-lg">

                    ⭐ {item.rating}

                  </div>

                </div>

                <div className="flex justify-between items-center">

                  <p className="text-4xl font-extrabold text-yellow-400">

                    ₹{item.price}

                  </p>

                  <p className="text-gray-400 font-semibold">

                    🚚 {item.delivery_time}

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="px-6 lg:px-20 py-24">

        <div className="text-center mb-20">

          <h2 className="text-6xl font-extrabold text-yellow-400 mb-6">

            Why Choose SmartDine?

          </h2>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto">

            Experience premium real-time food delivery
            with secure ordering and lightning-fast service.

          </p>

        </div>

        {/* CARDS */}

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD */}

          <div className="group bg-slate-900 border border-slate-800 hover:border-yellow-400/30 rounded-[35px] p-10 text-center transition duration-500 hover:-translate-y-3 shadow-2xl">

            <div className="text-7xl mb-8 group-hover:scale-110 transition duration-300">

              ⚡

            </div>

            <h3 className="text-4xl font-bold mb-5">

              Fast Delivery

            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">

              Lightning-fast delivery network ensuring
              hot and fresh food reaches your doorstep.

            </p>

          </div>

          {/* CARD */}

          <div className="group bg-slate-900 border border-slate-800 hover:border-yellow-400/30 rounded-[35px] p-10 text-center transition duration-500 hover:-translate-y-3 shadow-2xl">

            <div className="text-7xl mb-8 group-hover:scale-110 transition duration-300">

              🍔

            </div>

            <h3 className="text-4xl font-bold mb-5">

              Premium Food

            </h3>

            <p className="text-gray-400 leading-relaxed text-lg">

              Top-rated restaurants and premium dishes
              crafted by experienced chefs.

            </p>

          </div>

          {/* CARD */}

          <div className="group bg-slate-900 border border-slate-800 hover:border-yellow-400/30 rounded-[35px] p-10 text-center transition duration-500 hover:-translate-y-3 shadow-2xl">

            <div className="text-7xl mb-8 group-hover:scale-110 transition duration-300">

              🔒

            </div>

            <h3 className="text-4xl font-bold mb-5">

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