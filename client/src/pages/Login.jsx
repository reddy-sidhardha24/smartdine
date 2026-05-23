import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // SHOW / HIDE PASSWORD

  const [showPassword, setShowPassword] =
    useState(false);

  // LOGIN FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    // EMPTY VALIDATION

    if (
      !email.trim() ||
      !password.trim()
    ) {

      toast.error(
        "All fields are required"
      );

      return;

    }

    // EMAIL VALIDATION

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      toast.error(
        "Enter valid email"
      );

      return;

    }

    // PASSWORD VALIDATION

    if (password.length < 6) {

      toast.error(
        "Password must contain at least 6 characters"
      );

      return;

    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success(
        "Login successful"
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-10">

          Login

        </h1>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block mb-2 text-lg font-semibold text-white">

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-2 text-lg font-semibold text-white">

              Password

            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 pr-24 text-white outline-none focus:border-yellow-400"
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
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
          >

            Login

          </button>

        </form>

        {/* REGISTER LINK */}

        <p className="text-center text-gray-400 mt-8">

          Don't have an account?

          <Link
            to="/register"
            className="text-yellow-400 font-bold ml-2 hover:underline"
          >

            Register

          </Link>

        </p>

      </div>

    </div>

  );

};

export default Login;