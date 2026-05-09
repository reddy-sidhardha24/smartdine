function Hero() {
  return (
    <section className="text-center px-6">
      <h1 className="text-6xl font-bold mb-6">
        Welcome to SmartDine
      </h1>

      <p className="text-gray-300 text-lg mb-8">
        Order your favorite food quickly and easily.
      </p>

      <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg text-lg font-semibold transition">
        Explore Menu
      </button>
    </section>
  );
}

export default Hero;