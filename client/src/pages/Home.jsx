import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}

      <div className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-red-500/10 to-orange-500/10 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">

          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* LEFT */}

            <div>

              <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">

                Delicious Food
                <span className="block text-yellow-400">
                  Delivered Fast
                </span>

              </h1>

              <p className="text-gray-400 text-xl mb-10 leading-relaxed">

                SmartDine brings your favorite meals,
                desserts, drinks, and fast food directly
                to your doorstep with lightning-fast delivery.

              </p>

              <div className="flex gap-5">

                <Link
                  to="/menu"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-2xl font-bold text-lg transition"
                >
                  Explore Menu
                </Link>

                <Link
                  to="/orders"
                  className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-2xl font-bold text-lg transition"
                >
                  My Orders
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Food Banner"
                className="rounded-3xl shadow-2xl border border-slate-800"
              />

              <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700 p-5 rounded-2xl shadow-xl">

                <p className="text-gray-400 text-sm">
                  Orders Delivered
                </p>

                <h2 className="text-3xl font-bold text-yellow-400">
                  10K+
                </h2>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FEATURES */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-bold text-center text-yellow-400 mb-16">
          Why Choose SmartDine
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl">

            <h3 className="text-3xl font-bold mb-4 text-yellow-400">
              Fast Delivery
            </h3>

            <p className="text-gray-400 text-lg">
              Get your food delivered quickly with
              live order updates and smooth tracking.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl">

            <h3 className="text-3xl font-bold mb-4 text-green-400">
              Fresh Food
            </h3>

            <p className="text-gray-400 text-lg">
              High-quality meals prepared fresh
              from top-rated restaurants.
            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl">

            <h3 className="text-3xl font-bold mb-4 text-blue-400">
              Easy Ordering
            </h3>

            <p className="text-gray-400 text-lg">
              Smooth cart, checkout, payment,
              and order management experience.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Home;