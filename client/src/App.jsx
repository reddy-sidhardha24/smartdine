import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";


import ProtectedRoute from "./routes/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />

      <div className="bg-black text-white min-h-screen flex flex-col">

        {/* NAVBAR */}

        <Navbar />

        {/* PAGE CONTENT */}

        <div className="flex-grow">

          <Routes>

            {/* PUBLIC ROUTES */}

            <Route path="/" element={<Home />} />

            <Route path="/menu" element={<Menu />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />


            {/* PROTECTED ROUTES */}

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />

          </Routes>

        </div>

        {/* FOOTER */}

        <Footer />

      </div>
    </>
  );
}

export default App;