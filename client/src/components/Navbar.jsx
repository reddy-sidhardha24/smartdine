import { Link, useLocation } from "react-router-dom";

import { useState } from "react";

import {
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {

  const location = useLocation();

  const [menuOpen, setMenuOpen] =
    useState(false);

  // CHECK ADMIN LOGIN

  const adminToken =
    localStorage.getItem("adminToken");

  // ACTIVE NAV STYLE

  const navLink = (path) => {

    return location.pathname === path
      ? "text-yellow-400 font-bold"
      : "text-white hover:text-yellow-400";

  };

  // LOGOUT FUNCTION

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminData");

    localStorage.removeItem("token");

    window.location.href = "/admin-login";

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

          {/* HOME */}

          <Link
            to="/"
            className={navLink("/")}
          >
            Home
          </Link>

          {/* MENU */}

          <Link
            to="/menu"
            className={navLink("/menu")}
          >
            Menu
          </Link>

          {/* ORDERS */}

          <Link
            to="/orders"
            className={navLink("/orders")}
          >
            Orders
          </Link>

          {/* CAREERS */}

          <Link
            to="/careers"
            className={navLink("/careers")}
          >
            Careers
          </Link>

          {/* ADMIN LINKS */}

          {adminToken && (
            <>

              <Link
                to="/admin"
                className={navLink("/admin")}
              >
                Admin
              </Link>

              <Link
                to="/admin/dashboard"
                className={navLink("/admin/dashboard")}
              >
                Dashboard
              </Link>

              <Link
                to="/admin/reviews"
                className={navLink("/admin/reviews")}
              >
                Reviews
              </Link>

              <Link
                to="/admin/orders"
                className={navLink("/admin/orders")}
              >
                Admin Orders
              </Link>

            </>
          )}

          {/* CART */}

          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart className="text-2xl text-yellow-400" />
          </Link>

          {/* LOGIN / LOGOUT */}

          {!adminToken ? (

            <Link
              to="/admin-login"
              className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-xl font-bold text-black transition duration-300"
            >
              Admin Login
            </Link>

          ) : (

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold text-white transition duration-300"
            >
              Logout
            </button>

          )}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          className="md:hidden text-3xl text-yellow-400"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {menuOpen
            ? <FaTimes />
            : <FaBars />}

        </button>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-6 space-y-5 text-lg">

          {/* HOME */}

          <Link
            to="/"
            className={`block ${navLink("/")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          {/* MENU */}

          <Link
            to="/menu"
            className={`block ${navLink("/menu")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Menu
          </Link>

          {/* ORDERS */}

          <Link
            to="/orders"
            className={`block ${navLink("/orders")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Orders
          </Link>

          {/* CAREERS */}

          <Link
            to="/careers"
            className={`block ${navLink("/careers")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Careers
          </Link>

          {/* ADMIN LINKS */}

          {adminToken && (
            <>

              <Link
                to="/admin"
                className={`block ${navLink("/admin")}`}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Admin
              </Link>

              <Link
                to="/admin/dashboard"
                className={`block ${navLink("/admin/dashboard")}`}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Dashboard
              </Link>

              <Link
                to="/admin/reviews"
                className={`block ${navLink("/admin/reviews")}`}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Reviews
              </Link>

              <Link
                to="/admin/orders"
                className={`block ${navLink("/admin/orders")}`}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Admin Orders
              </Link>

            </>
          )}

          {/* CART */}

          <Link
            to="/cart"
            className="block text-yellow-400"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Cart
          </Link>

          {/* LOGIN / LOGOUT */}

          {!adminToken ? (

            <Link
              to="/admin-login"
              className="block bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-bold text-black text-center"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Admin Login
            </Link>

          ) : (

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold text-white"
            >
              Logout
            </button>

          )}

        </div>

      )}

    </nav>

  );

};

export default Navbar;