import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const AdminReviews = () => {

  const [reviews, setReviews] = useState([]);

  // FETCH REVIEWS

  const fetchReviews = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/reviews"
      );

      setReviews(res.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch reviews");

    }

  };

  useEffect(() => {

    fetchReviews();

  }, []);

  // DELETE REVIEW

  const deleteReview = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/reviews/${id}`
      );

      toast.success("Review deleted");

      fetchReviews();

    } catch (error) {

      console.log(error);

      toast.error("Failed to delete review");

    }

  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      {/* TITLE */}

      <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-14">
        Admin Review Management
      </h1>

      {/* REVIEWS */}

      <div className="max-w-7xl mx-auto space-y-8">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
          >

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

              <div>

                <h2 className="text-3xl font-bold text-yellow-400">
                  {review.food_name}
                </h2>

                <p className="text-gray-400 mt-2">
                  By {review.customer_name}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-lg">
                  ⭐ {review.rating}
                </span>

                <button
                  onClick={() => deleteReview(review.id)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-bold"
                >
                  Delete
                </button>

              </div>

            </div>

            {/* COMMENT */}

            <div className="bg-black/40 border border-slate-700 rounded-2xl p-6">

              <p className="text-lg text-gray-300 leading-relaxed">
                {review.comment}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminReviews;