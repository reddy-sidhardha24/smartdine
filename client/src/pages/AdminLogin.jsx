import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AdminLogin = () => {

  const navigate = useNavigate();

  const { loginAdmin } = useAuth();

  // FORM STATE

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  // SHOW / HIDE PASSWORD

  const [showPassword, setShowPassword] =
    useState(false);

  // LOADING

  const [loading, setLoading] =
    useState(false);

  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // HANDLE LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      // CONTEXT LOGIN

      loginAdmin(
        res.data.token,
        res.data.admin
      );

      toast.success(
        "Admin login successful"
      );

      // REDIRECT

      navigate("/admin-dashboard");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-4">

          SmartDine

        </h1>

        <p className="text-center text-gray-400 mb-10 text-lg">

          Secure Admin Access

        </p>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-7"
        >

          {/* EMAIL */}

          <div>

            <label className="block text-lg font-semibold mb-3">

              Email

            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400"
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block text-lg font-semibold mb-3">

              Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 pr-28 outline-none focus:border-yellow-400"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-yellow-400 font-semibold hover:text-yellow-300 transition"
              >

                {
                  showPassword
                    ? "Hide"
                    : "Show"
                }

              </button>

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-xl transition duration-300"
          >

            {loading
              ? "Logging in..."
              : "Admin Login"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminLogin;