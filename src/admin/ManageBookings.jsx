import React, { useEffect, useState } from "react";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://spacer-backend.onrender.com/api/owner/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (id, action) => {
    fetch(`https://spacer-backend.onrender.com/api/owner/bookings/${id}/${action}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() =>
        setBookings(
          bookings.map((b) =>
            b.id === id ? { ...b, status: action === "approve" ? "confirmed" : "declined" } : b
          )
        )
      )
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold">{b.space.title}</h3>
            <p>Status: {b.status}</p>
            <p>
              {new Date(b.start_datetime).toLocaleString()} -{" "}
              {new Date(b.end_datetime).toLocaleString()}
            </p>

            {b.status === "pending" && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(b.id, "approve")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(b.id, "decline")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
