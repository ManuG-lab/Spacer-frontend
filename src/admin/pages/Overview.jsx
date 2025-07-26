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
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const usersData = await usersRes.json();
        setUserCount(Array.isArray(usersData) ? usersData.length : 0);

        const spacesRes = await fetch("https://spacer-backend.onrender.com/api/spaces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const spacesData = await spacesRes.json();
        setSpaceCount(Array.isArray(spacesData) ? spacesData.length : 0);

        const bookingsRes = await fetch("https://spacer-backend.onrender.com/api/admin/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingsData = await bookingsRes.json();
        setBookingCount(Array.isArray(bookingsData) ? bookingsData.length : 0);

        
        const paymentsRes = await fetch("https://spacer-backend.onrender.com/api/payments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const paymentsData = await paymentsRes.json();
        setPaymentCount(Array.isArray(paymentsData) ? paymentsData.length : 0);

      } catch (error) {
        console.error("Error fetching counts:", error);
        setUserCount(0);
        setSpaceCount(0);
        setBookingCount(0);
        setPaymentCount(0);
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-600">Users</p>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-600">Spaces</p>
              <p className="text-2xl font-bold">{spaceCount}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-600">Bookings</p>
              <p className="text-2xl font-bold">{bookingCount}</p>
            </div>
            <div className="bg-white p-4 rounded shadow text-center">
              <p className="text-gray-600">Payments</p>
              <p className="text-2xl font-bold">{paymentCount}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
