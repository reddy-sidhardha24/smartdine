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

  // ADMIN DATA

  const adminData =
    localStorage.getItem("adminData")
      ? JSON.parse(
          localStorage.getItem(
            "adminData"
          )
        )
      : null;

  // TOKENS

  const userToken =
    localStorage.getItem("token");

  const adminToken =
    localStorage.getItem(
      "adminToken"
    );

  // ACTIVE NAV LINK

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

          {/* PUBLIC LINKS */}

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
            to="/careers"
            className={navLink("/careers")}
          >
            Careers
          </Link>

          {/* ADMIN LINKS */}

          {adminData && (

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

          {(userToken || adminToken) && (

            <Link
              to="/cart"
              className="relative"
            >
              <FaShoppingCart className="text-2xl text-yellow-400" />
            </Link>

          )}

          {/* LOGIN BUTTONS */}

          {!userToken && !adminToken && (

            <>

              <Link
                to="/login"
                className="text-white hover:text-yellow-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300"
              >
                Register
              </Link>

              <Link
                to="/admin-login"
                className="bg-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-600"
              >
                Admin Login
              </Link>

            </>

          )}

          {/* LOGOUT */}

          {(userToken || adminToken) && (

            <button
              onClick={() => {

                localStorage.removeItem(
                  "token"
                );

                localStorage.removeItem(
                  "adminToken"
                );

                localStorage.removeItem(
                  "adminData"
                );

                window.location.href = "/";

              }}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
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

          <Link
            to="/"
            className={`block ${navLink("/")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Home
          </Link>

          <Link
            to="/menu"
            className={`block ${navLink("/menu")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Menu
          </Link>

          <Link
            to="/orders"
            className={`block ${navLink("/orders")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Orders
          </Link>

          <Link
            to="/careers"
            className={`block ${navLink("/careers")}`}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            Careers
          </Link>

          {/* ADMIN MOBILE LINKS */}

          {adminData && (

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

          {(userToken || adminToken) && (

            <Link
              to="/cart"
              className="block text-yellow-400"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Cart
            </Link>

          )}

          {/* LOGIN BUTTONS */}

          {!userToken && !adminToken && (

            <>

              <Link
                to="/login"
                className="block text-white"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-yellow-400"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Register
              </Link>

              <Link
                to="/admin-login"
                className="block text-red-400"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Admin Login
              </Link>

            </>

          )}

          {/* LOGOUT */}

          {(userToken || adminToken) && (

            <button
              onClick={() => {

                localStorage.removeItem(
                  "token"
                );

                localStorage.removeItem(
                  "adminToken"
                );

                localStorage.removeItem(
                  "adminData"
                );

                window.location.href = "/";

              }}
              className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
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