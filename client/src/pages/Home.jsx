import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* HERO SECTION */}
      <div
        className="h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="bg-black/70 p-10 rounded-2xl text-center max-w-3xl">
          <h1 className="text-6xl font-extrabold text-yellow-400 mb-6">
            Welcome to SmartDine
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Delicious food delivered fast to your doorstep.
            Explore premium dishes, burgers, pizzas, shakes,
            biryanis and more with a modern dining experience.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            <Link to="/menu">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-xl text-lg font-bold transition">
                Explore Menu
              </button>
            </Link>

            <Link to="/orders">
              <button className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-xl text-lg font-bold transition">
                My Orders
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="py-20 px-8">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-14">
          Why Choose SmartDine?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              Fast Delivery
            </h3>

            <p className="text-gray-300">
              Get your favorite meals delivered quickly with
              smooth ordering experience.
            </p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">
              Premium Quality
            </h3>

            <p className="text-gray-300">
              Carefully prepared dishes using fresh ingredients
              and authentic flavors.
            </p>
          </div>

          <div className="bg-[#111827] p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">
              Easy Ordering
            </h3>

            <p className="text-gray-300">
              Add items to cart, place orders instantly,
              and track your food history easily.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;