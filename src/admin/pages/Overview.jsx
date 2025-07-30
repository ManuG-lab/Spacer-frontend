import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Overview = () => {
  const [userCount, setUserCount] = useState(0);
  const [spaceCount, setSpaceCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await fetch("https://spacer-backend.onrender.com/api/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await usersRes.json();
        setUserCount(Array.isArray(usersData) ? usersData.length : 0);

        const spacesRes = await fetch("https://spacer-backend.onrender.com/api/spaces");
        const spacesData = await spacesRes.json();
        setSpaceCount(Array.isArray(spacesData) ? spacesData.length : 0);

        const bookingsRes = await fetch("https://spacer-backend.onrender.com/api/admin/bookings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingsData = await bookingsRes.json();
        setBookingCount(Array.isArray(bookingsData) ? bookingsData.length : 0);

        const paymentsRes = await fetch("https://spacer-backend.onrender.com/api/payments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const paymentsData = await paymentsRes.json();
        setPaymentCount(Array.isArray(paymentsData) ? paymentsData.length : 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  const data = [
    { name: "Users", value: userCount },
    { name: "Spaces", value: spaceCount },
    { name: "Bookings", value: bookingCount },
    { name: "Payments", value: paymentCount },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Dashboard Overview</h2>
      {loading ? (
        <p className="text-slate-500">Loading stats...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-slate-500">Users</p>
              <p className="text-3xl font-bold text-sky-700">{userCount}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-slate-500">Spaces</p>
              <p className="text-3xl font-bold text-sky-700">{spaceCount}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-slate-500">Bookings</p>
              <p className="text-3xl font-bold text-sky-700">{bookingCount}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
              <p className="text-slate-500">Payments</p>
              <p className="text-3xl font-bold text-sky-700">{paymentCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-stone-700 mb-4">Activity Summary</h3>
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#0369a1" /> {/* sky-800 */}
            </BarChart>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
