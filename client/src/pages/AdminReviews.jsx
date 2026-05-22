// ==============================
// ADMINREVIEWS.JSX
// ==============================

import { useEffect, useState } from "react";

import api from "../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";

const AdminReviews = () => {

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH REVIEWS

  useEffect(() => {

    const fetchReviews =
      async () => {

        try {

          const res =
            await api.get(
              "/reviews"
            );

          setReviews(res.data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchReviews();

  }, []);

  // ANALYTICS DATA

  const totalReviews =
    reviews.length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (acc, item) =>
              acc + item.rating,
            0
          ) / totalReviews
        ).toFixed(1)
      : 0;

  const ratingDistribution = [

    {
      name: "5 Stars",
      value:
        reviews.filter(
          (item) => item.rating === 5
        ).length,
    },

    {
      name: "4 Stars",
      value:
        reviews.filter(
          (item) => item.rating === 4
        ).length,
    },

    {
      name: "3 Stars",
      value:
        reviews.filter(
          (item) => item.rating === 3
        ).length,
    },

    {
      name: "2 Stars",
      value:
        reviews.filter(
          (item) => item.rating === 2
        ).length,
    },

    {
      name: "1 Star",
      value:
        reviews.filter(
          (item) => item.rating === 1
        ).length,
    },

  ];

  const foodRatings =
    reviews.map((item) => ({

      name: item.food_name,

      rating: item.rating,

    }));

  const bestRatedFood =
    reviews.length > 0
      ? reviews.reduce(
          (best, current) =>
            current.rating >
            best.rating
              ? current
              : best
        ).food_name
      : "No Reviews";

  const COLORS = [
    "#facc15",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#a855f7",
  ];

  // LOADING SCREEN

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex justify-center items-center">

        <h1 className="text-4xl font-bold text-yellow-400">

          Loading Reviews...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">

      {/* HEADER */}

      <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-14">

        Customer Reviews

      </h1>

      {/* REVIEW ANALYTICS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">

        {/* TOTAL REVIEWS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-gray-400 mb-4">

            Total Reviews

          </h2>

          <p className="text-6xl font-extrabold text-yellow-400">

            {totalReviews}

          </p>

        </div>

        {/* AVERAGE RATING */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-gray-400 mb-4">

            Average Rating

          </h2>

          <p className="text-6xl font-extrabold text-green-400">

            ⭐ {averageRating}

          </p>

        </div>

        {/* BEST RATED FOOD */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-gray-400 mb-4">

            Best Rated Food

          </h2>

          <p className="text-4xl font-extrabold text-blue-400">

            {bestRatedFood}

          </p>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-10 mb-20">

        {/* PIE CHART */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8 text-yellow-400">

            Rating Distribution

          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={ratingDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >

                {
                  ratingDistribution.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-8 text-yellow-400">

            Food Ratings

          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={foodRatings}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="rating"
                fill="#facc15"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* LINE CHART */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:col-span-2">

          <h2 className="text-3xl font-bold mb-8 text-yellow-400">

            Review Performance Trend

          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <LineChart data={foodRatings}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="rating"
                stroke="#22c55e"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* REVIEWS GRID */}

      <div className="grid md:grid-cols-2 gap-10">

        {reviews.map((item) => (

          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >

            <div className="flex justify-between items-center mb-5">

              <div>

                <h2 className="text-3xl font-bold">

                  {item.customer_name}

                </h2>

                <p className="text-gray-400">

                  {item.food_name}

                </p>

              </div>

              <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">

                ⭐ {item.rating}

              </div>

            </div>

            <p className="text-gray-300 text-lg leading-relaxed">

              {item.comment}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default AdminReviews;