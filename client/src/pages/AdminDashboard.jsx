import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  // WEEKLY REVENUE DATA

  const revenueData = [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 2100 },
    { day: "Wed", revenue: 1800 },
    { day: "Thu", revenue: 2500 },
    { day: "Fri", revenue: 3200 },
    { day: "Sat", revenue: 4000 },
    { day: "Sun", revenue: 2800 },
  ];

  // TOP SELLING FOODS

  const topFoods = [
    {
      name: "Chicken Biryani",
      orders: 120,
      revenue: 29800,
    },
    {
      name: "Paneer Pizza",
      orders: 96,
      revenue: 22400,
    },
    {
      name: "Chocolate Shake",
      orders: 82,
      revenue: 11800,
    },
    {
      name: "Chicken Wings",
      orders: 74,
      revenue: 19400,
    },
  ];

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      // FETCH STATS

      const statsRes = await axios.get(
        "http://localhost:5000/api/orders/admin/stats"
      );

      setStats(statsRes.data);

      // FETCH RECENT ORDERS

      const ordersRes = await axios.get(
        "http://localhost:5000/api/orders/admin"
      );

      setRecentOrders(
        ordersRes.data.slice(0, 5)
      );

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      {/* PAGE TITLE */}

      <h1 className="text-5xl font-bold text-center text-yellow-400 mb-12">
        Admin Dashboard
      </h1>

      {/* STATS CARDS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* TOTAL ORDERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-gray-400 text-lg mb-4">
            Total Orders
          </h2>

          <p className="text-5xl font-bold text-yellow-400">
            {stats.totalOrders}
          </p>

        </div>

        {/* REVENUE */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-gray-400 text-lg mb-4">
            Revenue
          </h2>

          <p className="text-5xl font-bold text-green-400">
            ₹{Number(stats.totalRevenue).toFixed(2)}
          </p>

        </div>

        {/* PENDING ORDERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-gray-400 text-lg mb-4">
            Pending Orders
          </h2>

          <p className="text-5xl font-bold text-red-400">
            {stats.pendingOrders}
          </p>

        </div>

        {/* DELIVERED ORDERS */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl hover:scale-105 transition duration-300">

          <h2 className="text-gray-400 text-lg mb-4">
            Delivered Orders
          </h2>

          <p className="text-5xl font-bold text-blue-400">
            {stats.deliveredOrders}
          </p>

        </div>

      </div>

      {/* REVENUE CHART */}

      <div className="mt-16 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          Weekly Revenue
        </h2>

        <div className="w-full h-[400px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={revenueData}>

              <XAxis
                dataKey="day"
                stroke="#ffffff"
              />

              <YAxis stroke="#ffffff" />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#facc15"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* TOP SELLING ITEMS */}

      <div className="mt-16">

        <h2 className="text-4xl font-bold text-yellow-400 mb-8">
          Top Selling Foods
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {topFoods.map((food, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300"
            >

              <h3 className="text-2xl font-bold text-white mb-4">
                {food.name}
              </h3>

              <p className="text-gray-400 mb-2">

                Orders:

                <span className="text-yellow-400 font-bold ml-2">
                  {food.orders}
                </span>

              </p>

              <p className="text-gray-400">

                Revenue:

                <span className="text-green-400 font-bold ml-2">
                  ₹{food.revenue}
                </span>

              </p>

            </div>

          ))}

        </div>

      </div>

      {/* RECENT ORDERS */}

      <div className="mt-16">

        <h2 className="text-4xl font-bold text-yellow-400 mb-8">
          Recent Orders
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          {recentOrders.map((order) => (

            <div
              key={order.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 p-6 hover:bg-slate-800/50 transition"
            >

              <div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Order #{order.id}
                </h3>

                <p className="text-gray-400">
                  {order.address}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>

              </div>

              <div className="mt-4 md:mt-0 text-right">

                <p className="text-2xl font-bold text-green-400">
                  ₹{order.total}
                </p>

                <span
                  className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-bold
                    ${
                      order.status === "Delivered"
                        ? "bg-green-500 text-white"

                        : order.status === "Out for Delivery"
                        ? "bg-blue-500 text-white"

                        : "bg-yellow-400 text-black"
                    }`}
                >
                  {order.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;