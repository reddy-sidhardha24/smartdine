const Careers = () => {

  const jobs = [
    {
      title: "Head Chef",
      restaurant: "Paradise Biryani",
      salary: "₹45,000/month",
      experience: "4+ Years",
      status: "Hiring",
    },

    {
      title: "Delivery Partner",
      restaurant: "Swifty Foods",
      salary: "₹25,000/month",
      experience: "1+ Years",
      status: "Urgent",
    },

    {
      title: "Kitchen Assistant",
      restaurant: "Burger King",
      salary: "₹18,000/month",
      experience: "Fresher",
      status: "Open",
    },

    {
      title: "Restaurant Manager",
      restaurant: "Domino's",
      salary: "₹55,000/month",
      experience: "5+ Years",
      status: "Hiring",
    },

    {
      title: "Cashier",
      restaurant: "KFC",
      salary: "₹20,000/month",
      experience: "1+ Years",
      status: "Open",
    },

    {
      title: "Cleaning Staff",
      restaurant: "Barbeque Nation",
      salary: "₹16,000/month",
      experience: "Fresher",
      status: "Urgent",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* HEADER */}

      <div className="text-center mb-16">

        <h1 className="text-6xl font-extrabold text-yellow-400 mb-6">
          Careers at SmartDine
        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">

          Join the SmartDine restaurant ecosystem and
          build your future with top restaurants,
          delivery networks, and premium food brands.

        </p>

      </div>

      {/* JOB LISTINGS */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {jobs.map((job, index) => (

          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-300"
          >

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold text-yellow-400">
                {job.title}
              </h2>

              <span
                className={`px-4 py-1 rounded-full text-sm font-bold
                  ${
                    job.status === "Urgent"
                      ? "bg-red-500 text-white"

                      : job.status === "Hiring"
                      ? "bg-green-500 text-white"

                      : "bg-blue-500 text-white"
                  }`}
              >
                {job.status}
              </span>

            </div>

            <div className="space-y-4 text-gray-300 text-lg">

              <p>
                🍽 Restaurant:
                <span className="text-white font-bold ml-2">
                  {job.restaurant}
                </span>
              </p>

              <p>
                💰 Salary:
                <span className="text-green-400 font-bold ml-2">
                  {job.salary}
                </span>
              </p>

              <p>
                🧑‍🍳 Experience:
                <span className="text-white font-bold ml-2">
                  {job.experience}
                </span>
              </p>

            </div>

            {/* PROGRESS TRACKER */}

            <div className="mt-8">

              <h3 className="text-xl font-bold text-yellow-400 mb-4">
                Hiring Progress
              </h3>

              <div className="flex items-center justify-between">

                <div className="flex flex-col items-center">

                  <div className="w-5 h-5 bg-green-400 rounded-full"></div>

                  <p className="text-sm mt-2">
                    Applied
                  </p>

                </div>

                <div className="flex-1 h-1 bg-green-400 mx-2"></div>

                <div className="flex flex-col items-center">

                  <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>

                  <p className="text-sm mt-2">
                    Interview
                  </p>

                </div>

                <div className="flex-1 h-1 bg-gray-600 mx-2"></div>

                <div className="flex flex-col items-center">

                  <div className="w-5 h-5 bg-gray-600 rounded-full"></div>

                  <p className="text-sm mt-2">
                    Selected
                  </p>

                </div>

              </div>

            </div>

            {/* APPLY BUTTON */}

            <button className="w-full mt-10 bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300">

              Apply Now

            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Careers;