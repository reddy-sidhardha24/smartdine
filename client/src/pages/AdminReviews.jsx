// ==============================
// ADMINREVIEWS.JSX
// ==============================

const AdminReviews = () => {

  const reviews = [

    {
      id: 1,
      user: "Rahul",
      food: "Chicken Biryani",
      rating: 5,
      review:
        "Amazing taste and fast delivery.",
    },

    {
      id: 2,
      user: "Sneha",
      food: "Paneer Pizza",
      rating: 4,
      review:
        "Loved the cheese and quality.",
    },

  ];

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">

      <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-14">

        Customer Reviews

      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {reviews.map((item) => (

          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >

            <div className="flex justify-between items-center mb-5">

              <div>

                <h2 className="text-3xl font-bold">

                  {item.user}

                </h2>

                <p className="text-gray-400">

                  {item.food}

                </p>

              </div>

              <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">

                ⭐ {item.rating}

              </div>

            </div>

            <p className="text-gray-300 text-lg leading-relaxed">

              {item.review}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default AdminReviews;