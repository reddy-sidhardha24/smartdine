import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/stats"
      );

      setStats(res.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-center text-yellow-400 mb-12">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* TOTAL ORDERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <h2 className="text-gray-400 text-lg mb-4">
            Total Orders
          </h2>

          <p className="text-5xl font-bold text-yellow-400">
            {stats.totalOrders}
          </p>

        </div>

        {/* REVENUE */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <h2 className="text-gray-400 text-lg mb-4">
            Revenue
          </h2>

          <p className="text-5xl font-bold text-green-400">
            ₹{Number(stats.totalRevenue).toFixed(2)}
          </p>

        </div>

        {/* PENDING */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <h2 className="text-gray-400 text-lg mb-4">
            Pending Orders
          </h2>

          <p className="text-5xl font-bold text-red-400">
            {stats.pendingOrders}
          </p>

        </div>

        {/* DELIVERED */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

          <h2 className="text-gray-400 text-lg mb-4">
            Delivered Orders
          </h2>

          <p className="text-5xl font-bold text-blue-400">
            {stats.deliveredOrders}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;