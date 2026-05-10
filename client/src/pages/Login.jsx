import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full p-3 mb-4 rounded bg-gray-800"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full p-3 mb-6 rounded bg-gray-800"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;