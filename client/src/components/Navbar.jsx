import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {

  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-10 py-5 flex justify-between items-center">

      {/* LOGO */}

      <Link
        to="/"
        className="text-3xl font-bold text-yellow-400"
      >
        SmartDine
      </Link>

      {/* NAV LINKS */}

      <div className="flex gap-6 items-center">

        <Link
          to="/"
          className="hover:text-yellow-400"
        >
          Home
        </Link>

        <Link
          to="/menu"
          className="hover:text-yellow-400"
        >
          Menu
        </Link>

        <Link
          to="/cart"
          className="hover:text-yellow-400 relative"
        >
          Cart

          {cartItems.length > 0 && (
            <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        <Link
          to="/orders"
          className="hover:text-yellow-400"
        >
          Orders
        </Link>

        {!token ? (
          <Link
            to="/login"
            className="hover:text-yellow-400"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
};

export default Navbar;