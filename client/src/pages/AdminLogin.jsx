import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // LOGIN FUNCTION

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      toast.error("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "adminData",
        JSON.stringify(res.data.admin)
      );

      toast.success(
        "Admin login successful"
      );

      // REDIRECT

      navigate("/admin");

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
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        {/* TITLE */}

        <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-4">

          SmartDine

        </h1>

        <p className="text-center text-gray-400 text-lg mb-10">

          Admin Authentication Portal

        </p>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block mb-3 text-lg font-bold text-white">

              Email

            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-yellow-400"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-3 text-lg font-bold text-white">

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
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
          >

            {loading
              ? "Logging In..."
              : "Admin Login"}

          </button>

        </form>

        {/* TEST CREDENTIALS */}

        <div className="mt-10 bg-slate-800 rounded-2xl p-5">

          <h3 className="text-yellow-400 font-bold mb-3">

            Test Credentials

          </h3>

          <p className="text-gray-300">

            Email:
            <span className="text-white ml-2">
              admin@smartdine.com
            </span>
          </p>

          <p className="text-gray-300 mt-2">

            Password:
            <span className="text-white ml-2">
              admin123
            </span>

          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;