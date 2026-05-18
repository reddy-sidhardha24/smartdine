import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-slate-800 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

        {/* BRAND */}

        <div>

          <h2 className="text-4xl font-extrabold text-yellow-400 mb-5">
            SmartDine
          </h2>

          <p className="text-gray-400 leading-relaxed">
            SmartDine is a modern food ordering platform
            delivering delicious meals with fast delivery,
            premium experience, and real-time order tracking.
          </p>

        </div>

        {/* QUICK LINKS */}

        <div>

          <h3 className="text-2xl font-bold text-yellow-400 mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-300">

            <Link
              to="/"
              className="hover:text-yellow-400 transition"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="hover:text-yellow-400 transition"
            >
              Menu
            </Link>

            <Link
              to="/orders"
              className="hover:text-yellow-400 transition"
            >
              Orders
            </Link>

            <Link
              to="/admin/dashboard"
              className="hover:text-yellow-400 transition"
            >
              Dashboard
            </Link>

          </div>

        </div>

        {/* CONTACT */}

        <div>

          <h3 className="text-2xl font-bold text-yellow-400 mb-5">
            Contact
          </h3>

          <div className="space-y-3 text-gray-300">

            <p>
              Kavali, Andhra Pradesh
            </p>

            <p>
              support@smartdine.com
            </p>

            <p>
              +91 23132036
            </p>

          </div>

        </div>

        {/* SOCIAL LINKS */}

        <div>

          <h3 className="text-2xl font-bold text-yellow-400 mb-5">
            Follow Us
          </h3>

          <div className="flex gap-5 text-3xl">

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-400 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter />
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM BAR */}

      <div className="border-t border-slate-800 py-6 text-center text-gray-500 text-sm">

        © 2026 SmartDine. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;