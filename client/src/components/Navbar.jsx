import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (path) => {
    return location.pathname === path
      ? "text-yellow-400 font-bold"
      : "text-white hover:text-yellow-400";
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        {/* LOGO */}

        <Link
          to="/"
          className="text-4xl font-extrabold text-yellow-400"
        >
          SmartDine
        </Link>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-8 text-lg">

          <Link
            to="/"
            className={navLink("/")}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={navLink("/menu")}
          >
            Menu
          </Link>

          <Link
            to="/orders"
            className={navLink("/orders")}
          >
            Orders
          </Link>

          <Link
            to="/admin/dashboard"
            className={navLink("/admin/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className={navLink("/admin/orders")}
          >
            Admin
          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart className="text-2xl text-yellow-400" />
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

        {/* MOBILE BUTTON */}

        <button
          className="md:hidden text-3xl text-yellow-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-6 space-y-5 text-lg">

          <Link
            to="/"
            className={`block ${navLink("/")}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={`block ${navLink("/menu")}`}
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </Link>

          <Link
            to="/orders"
            className={`block ${navLink("/orders")}`}
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>

          <Link
            to="/admin/dashboard"
            className={`block ${navLink("/admin/dashboard")}`}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className={`block ${navLink("/admin/orders")}`}
            onClick={() => setMenuOpen(false)}
          >
            Admin Orders
          </Link>

          <Link
            to="/cart"
            className="block text-yellow-400"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

      )}

    </nav>
  );
};

export default Navbar;