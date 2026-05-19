import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReviews from "./pages/AdminReviews";
import Careers from "./pages/Careers";
import AdminLogin from "./pages/AdminLogin";

import AdminRoute from "./components/AdminRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <BrowserRouter>

      {/* TOAST */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN ROUTES */}

      <div className="min-h-screen bg-black text-white">

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* MENU */}

          <Route
            path="/menu"
            element={<Menu />}
          />

          {/* CART */}

          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* USER ORDERS */}

          <Route
            path="/orders"
            element={<Orders />}
          />

          {/* LOGIN */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}

          <Route
            path="/register"
            element={<Register />}
          />

          {/* CAREERS */}

          <Route
            path="/careers"
            element={<Careers />}
          />

          {/* ADMIN LOGIN */}

          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />

          {/* ADMIN PANEL */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          {/* ADMIN ORDERS */}

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          {/* ADMIN DASHBOARD */}

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* ADMIN REVIEWS */}

          <Route
            path="/admin/reviews"
            element={
              <AdminRoute>
                <AdminReviews />
              </AdminRoute>
            }
          />

        </Routes>

      </div>

      {/* FOOTER */}

      <Footer />

    </BrowserRouter>

  );

}

export default App;