import { useState } from "react";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // REGISTER FUNCTION

  const handleRegister = async (e) => {

    e.preventDefault();

    // EMPTY VALIDATION

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {

      toast.error("All fields are required");

      return;

    }

    // EMAIL VALIDATION

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      toast.error("Enter valid email");

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
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-10">
          Register
        </h1>

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >

          {/* NAME */}

          <div>

            <label className="block mb-2 text-lg font-semibold text-white">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

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

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="text-center text-gray-400 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-yellow-400 font-bold ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;