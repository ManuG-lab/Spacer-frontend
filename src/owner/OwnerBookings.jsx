import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://spacer-backend.onrender.com/api/owner/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then(setBookings)
      .catch((err) => {
        setBookings([]);
        console.error(err);
      });
  }, [token]);

  const handleAction = async (bookingId, action) => {
    const endpoint =
      action === "confirm"
        ? `https://spacer-backend.onrender.com/api/owner/bookings/${bookingId}/approve`
        : `https://spacer-backend.onrender.com/api/owner/bookings/${bookingId}/decline`;

    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId
              ? { ...b, status: action === "confirm" ? "confirmed" : "declined" }
              : b
          )
        );
        toast.success(`Booking ${action}ed.`);
      } else {
        toast.error(`Failed to ${action} booking.`);
      }
    } catch (err) {
      toast.error("Network error.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">My Space Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-[#4B5563]">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-[#1E3A8A] mb-1">
                {booking.space?.title || "Unnamed Space"}
              </h2>
              <p className="text-sm text-[#6B7280] mb-2">
                Booked by: {booking.client_id || "Unknown"}
              </p>
              <p className="text-sm font-medium mb-3">
                Status:{" "}
                {booking.status === "confirmed"
                  ? "✅ Confirmed"
                  : booking.status === "declined"
                  ? "❌ Declined"
                  : "⏳ Pending"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(booking.id, "confirm")}
                  className="bg-[#10B981] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#059669] transition"
                  disabled={booking.status === "confirmed"}
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleAction(booking.id, "decline")}
                  className="bg-[#EF4444] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#DC2626] transition"
                  disabled={booking.status === "declined"}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerBookings;
