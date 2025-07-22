import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5000/api/bookings/my-bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">{booking.space.title}</h3>
            <p>Status: {booking.status}</p>
            <p>
              {booking.start_datetime} - {booking.end_datetime}
            </p>
            <p>Total: KES {booking.total_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
