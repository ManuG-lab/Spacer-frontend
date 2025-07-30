import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view bookings.");
      setLoading(false);
      return;
    }

    fetch("https://spacer-backend.onrender.com/api/bookings", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 422) {
            throw new Error("Unauthorized: Please log in again.");
          }
          if (res.status === 403) {
            throw new Error("Access denied: Only clients can view bookings.");
          }
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          console.error("Unexpected API response:", data);
          setError("Unexpected data format from server.");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleInvoice = async (bookingId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to generate an invoice.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking_id: bookingId }),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.message);
      } else if (response.status === 409) {
        toast.warning(data.message);
      } else {
        toast.error(data.message || "Failed to generate invoice.");
      }
    } catch (error) {
      console.error("Invoice generation error:", error);
      toast.error("Something went wrong while generating the invoice.");
    }
  };

  const handlePayment = (bookingId) => {
    navigate(`/pay/${bookingId}`);
  };

  if (loading) return <p className="p-6 text-[#64748B]">Loading your bookings...</p>;
  if (error) return <p className="p-6 text-[#EF4444] font-medium">Error: {error}</p>;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen text-[#1F2937]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#4F46E5]">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-[#64748B]">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-5 shadow-sm hover:shadow-md rounded-xl border border-[#E5E7EB]"
            >
              <h3 className="text-xl font-semibold text-[#1F2937] mb-2">
                {booking.space.title}
              </h3>
              <p className="text-sm text-[#475569] mb-1">
                {new Date(booking.start_datetime).toLocaleString()} –{" "}
                {new Date(booking.end_datetime).toLocaleString()}
              </p>
              <p className="text-sm text-[#334155] mb-3">
                Total: <span className="font-semibold">KES {booking.total_price}</span>
              </p>

              <div className="flex flex-wrap gap-3 items-center mt-4">
                {booking.status === "pending" && (
                  <span className="bg-[#E5E7EB] text-[#475569] px-4 py-2 rounded cursor-not-allowed">
                    Pending
                  </span>
                )}

                {booking.status === "declined" && (
                  <span className="bg-[#EF4444] text-white px-4 py-2 rounded cursor-not-allowed">
                    Declined
                  </span>
                )}

                {booking.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => handleInvoice(booking.id)}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded"
                    >
                      Get Invoice
                    </button>
                    <button
                      onClick={() => handlePayment(booking.id)}
                      className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded"
                    >
                      Make Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
