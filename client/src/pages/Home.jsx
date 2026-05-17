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

        {/* CONTENT */}

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