import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleInvoice = (bookingId) => {
    // TODO: Link this to your invoice logic or download action
    alert(`Generating invoice for booking #${bookingId}`);
  };

  const handlePayment = (bookingId) => {
    // TODO: Link this to your payment logic
    alert(`Redirecting to payment for booking #${bookingId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-5 shadow rounded-xl">
            <h3 className="text-xl font-semibold mb-2">{booking.space.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {new Date(booking.start_datetime).toLocaleString()} –{" "}
              {new Date(booking.end_datetime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-700 mb-3">
              Total: <span className="font-semibold">KES {booking.total_price}</span>
            </p>

            <div className="flex flex-wrap gap-3 items-center mt-4">
              {booking.status === "pending" && (
                <button
                  className="bg-gray-300 text-gray-700 cursor-not-allowed px-4 py-2 rounded"
                  disabled
                >
                  Pending
                </button>
              )}

              {booking.status === "declined" && (
                <button
                  className="bg-red-500 text-white cursor-not-allowed px-4 py-2 rounded"
                  disabled
                >
                  Declined
                </button>
              )}

              {booking.status === "confirmed" && (
                <>
                  <button
                    onClick={() => handleInvoice(booking.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Get Invoice
                  </button>
                  <button
                    onClick={() => handlePayment(booking.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Make Payment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
