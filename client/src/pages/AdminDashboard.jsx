// ==============================
// ADMINDASHBOARD.JSX
// ==============================

import { useEffect, useState } from "react";

import api from "../api/axios";

const AdminDashboard = () => {

  const [orders, setOrders] =
    useState([]);

  const [menu, setMenu] =
    useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const ordersRes =
        await api.get("/orders");

      const menuRes =
        await api.get("/menu");

      setOrders(ordersRes.data);

      setMenu(menuRes.data);

    } catch (error) {

      console.log(error);

    }

  };

  // CALCULATIONS

  const totalRevenue =
    orders.reduce(
      (acc, order) =>
        acc + Number(order.total),
      0
    );

  return (

    <div className="min-h-screen bg-black text-white px-6 lg:px-20 py-14">

      <h1 className="text-5xl font-extrabold text-yellow-400 text-center mb-16">

        Admin Dashboard

      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-gray-400 text-xl mb-4">

            Total Orders

          </h2>

          <h1 className="text-5xl font-extrabold text-yellow-400">

            {orders.length}

          </h1>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-gray-400 text-xl mb-4">

            Revenue

          </h2>

          <h1 className="text-5xl font-extrabold text-green-400">

            ₹{totalRevenue}

          </h1>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-gray-400 text-xl mb-4">

            Menu Items

          </h2>

          <h1 className="text-5xl font-extrabold text-blue-400">

            {menu.length}

          </h1>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;