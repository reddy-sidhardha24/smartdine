import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}

      <div
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
        }}
      >

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-black/70"></div>

        {/* HERO CONTENT */}

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">

          <h1 className="text-6xl md:text-8xl font-extrabold text-yellow-400 mb-6 leading-tight">

            Delicious Food
            <br />

            Delivered Fast

          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed">

            Order your favorite meals from SmartDine.
            Fast delivery, premium quality, and an unforgettable taste experience.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap justify-center gap-6">

            <Link
              to="/menu"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
            >
              Explore Menu
            </Link>

            <Link
              to="/orders"
              className="border border-yellow-400 hover:bg-yellow-400 hover:text-black px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
            >
              My Orders
            </Link>

          </div>

        </div>

      </div>

      {/* FEATURED FOODS */}

      <div className="bg-black py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-14 flex-wrap gap-4">

            <div>

              <h2 className="text-5xl font-bold text-yellow-400 mb-4">
                Trending Foods
              </h2>

              <p className="text-gray-400 text-lg">
                Most loved dishes by SmartDine customers
              </p>

            </div>

            <Link
              to="/menu"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-2xl font-bold transition"
            >
              View Full Menu
            </Link>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* CARD 1 */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300">

              <img
                src="https://images.unsplash.com/photo-1563379091339-03246963d96c?q=80&w=1200&auto=format&fit=crop"
                alt="Chicken Biryani"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Chicken Biryani
                </h3>

                <p className="text-gray-400 mb-4">
                  Paradise Biryani
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-yellow-400 text-2xl font-bold">
                    ₹299
                  </span>

                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
                    ⭐ 4.8
                  </span>

                </div>

              </div>

            </div>

            {/* CARD 2 */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300">

              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
                alt="Paneer Pizza"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Paneer Pizza
                </h3>

                <p className="text-gray-400 mb-4">
                  Domino's
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-yellow-400 text-2xl font-bold">
                    ₹399
                  </span>

                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
                    ⭐ 4.7
                  </span>

                </div>

              </div>

            </div>

            {/* CARD 3 */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300">

              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop"
                alt="Burger"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Chicken Burger
                </h3>

                <p className="text-gray-400 mb-4">
                  Burger King
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-yellow-400 text-2xl font-bold">
                    ₹249
                  </span>

                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
                    ⭐ 4.6
                  </span>

                </div>

              </div>

            </div>

            {/* CARD 4 */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300">

              <img
                src="https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=1200&auto=format&fit=crop"
                alt="Chocolate Shake"
                className="w-full h-64 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Chocolate Shake
                </h3>

                <p className="text-gray-400 mb-4">
                  Shake Factory
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-yellow-400 text-2xl font-bold">
                    ₹199
                  </span>

                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
                    ⭐ 4.9
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* STATS SECTION */}

      <div className="bg-slate-950 py-20 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

            <h2 className="text-6xl font-extrabold text-yellow-400 mb-4">
              50+
            </h2>

            <p className="text-2xl text-gray-300 font-semibold">
              Delicious Food Items
            </p>

          </div>

          {/* CARD 2 */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

            <h2 className="text-6xl font-extrabold text-green-400 mb-4">
              10K+
            </h2>

            <p className="text-2xl text-gray-300 font-semibold">
              Happy Customers
            </p>

          </div>

          {/* CARD 3 */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center shadow-2xl">

            <h2 className="text-6xl font-extrabold text-blue-400 mb-4">
              24/7
            </h2>

            <p className="text-2xl text-gray-300 font-semibold">
              Fast Delivery Service
            </p>

          </div>

        </div>

      </div>

      {/* FEATURE SECTION */}

      <div className="py-24 px-6 bg-black">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}

          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
            alt="Food"
            className="rounded-3xl shadow-2xl"
          />

          {/* CONTENT */}

          <div>

            <h2 className="text-5xl font-bold text-yellow-400 mb-8 leading-tight">

              Experience Premium
              <br />

              Food Ordering

            </h2>

            <p className="text-gray-300 text-xl leading-relaxed mb-8">

              SmartDine combines beautiful design,
              fast ordering, real-time tracking,
              and premium food experiences into one modern platform.

            </p>

            <Link
              to="/menu"
              className="inline-block bg-green-500 hover:bg-green-600 px-10 py-4 rounded-2xl text-xl font-bold transition duration-300"
            >
              Start Ordering
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;