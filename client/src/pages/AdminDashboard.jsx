import { useEffect, useState } from "react";

import api from "../api/axios";

import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const AdminDashboard = () => {

  const [stats, setStats] =
    useState({

      totalOrders: 0,

      totalRevenue: 0,

      pendingOrders: 0,

      deliveredOrders: 0,

    });

  const [loading, setLoading] =
    useState(true);

  // FETCH DASHBOARD STATS

  const fetchStats = async () => {

    try {

      const res =
        await api.get(
          "/orders/admin/stats"
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchStats();

  }, []);

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex justify-center items-center">

        <h1 className="text-4xl font-bold text-yellow-400">

          Loading Dashboard...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">

      {/* HEADER */}

      <div className="mb-16">

        <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">

          Admin Dashboard

        </h1>

        <p className="text-gray-400 text-xl">

          SmartDine business overview and analytics

        </p>

      </div>

      {/* STATS GRID */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

        {/* TOTAL ORDERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-yellow-400 transition">

          <div className="flex justify-between items-center mb-6">

            <FaShoppingBag className="text-5xl text-yellow-400" />

            <span className="text-gray-400">

              Orders

            </span>

          </div>

          <h2 className="text-5xl font-extrabold text-yellow-400">

            {stats.totalOrders}

          </h2>

          <p className="text-gray-400 mt-3">

            Total orders placed

          </p>

        </div>

        {/* REVENUE */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-green-400 transition">

          <div className="flex justify-between items-center mb-6">

            <FaMoneyBillWave className="text-5xl text-green-400" />

            <span className="text-gray-400">

              Revenue

            </span>

          </div>

          <h2 className="text-5xl font-extrabold text-green-400">

            ₹{stats.totalRevenue}

          </h2>

          <p className="text-gray-400 mt-3">

            Total business revenue

          </p>

        </div>

        {/* PENDING */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-400 transition">

          <div className="flex justify-between items-center mb-6">

            <FaClock className="text-5xl text-blue-400" />

            <span className="text-gray-400">

              Pending

            </span>

          </div>

          <h2 className="text-5xl font-extrabold text-blue-400">

            {stats.pendingOrders}

          </h2>

          <p className="text-gray-400 mt-3">

            Orders in progress

          </p>

        </div>

        {/* DELIVERED */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-purple-400 transition">

          <div className="flex justify-between items-center mb-6">

            <FaCheckCircle className="text-5xl text-purple-400" />

            <span className="text-gray-400">

              Delivered

            </span>

          </div>

          <h2 className="text-5xl font-extrabold text-purple-400">

            {stats.deliveredOrders}

          </h2>

          <p className="text-gray-400 mt-3">

            Successfully delivered

          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-16">

        <h2 className="text-4xl font-bold text-yellow-400 mb-8">

          Quick Actions

        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:scale-105 transition">

            <h3 className="text-3xl font-bold mb-4">

              Manage Orders

            </h3>

            <p className="text-gray-400">

              Update delivery statuses and monitor active orders.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:scale-105 transition">

            <h3 className="text-3xl font-bold mb-4">

              Menu Management

            </h3>

            <p className="text-gray-400">

              Add, edit, and remove menu items from SmartDine.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:scale-105 transition">

            <h3 className="text-3xl font-bold mb-4">

              Customer Reviews

            </h3>

            <p className="text-gray-400">

              Monitor feedback and customer satisfaction.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;