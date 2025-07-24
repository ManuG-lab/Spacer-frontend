import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Overview = () => {
  const [stats, setStats] = useState({ users: 0, spaces: 0, bookings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/admin/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const data = [
    { name: "Users", value: stats.users },
    { name: "Spaces", value: stats.spaces },
    { name: "Bookings", value: stats.bookings },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Users</p>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Spaces</p>
          <p className="text-2xl font-bold">{stats.spaces}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Bookings</p>
          <p className="text-2xl font-bold">{stats.bookings}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </div>
    </div>
  );
};

export default Overview;
