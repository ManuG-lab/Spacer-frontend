import React, { useState } from "react";
import { toast } from 'react-toastify';

const BookingModal = ({ space, onClose }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to book.");
      return;
    }

    const res = await fetch("https://spacer-backend.onrender.com/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        space_id: space.id,
        start_datetime: start,
        end_datetime: end,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Booking successful!");
      onClose();
    } else {
      toast.error(data.error || "Booking failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-[#0F172A] mb-4">
          Book <span className="font-bold">{space.title}</span>
        </h2>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        />
        <button
          onClick={handleBooking}
          className="bg-[#3B82F6] hover:bg-[#2563eb] text-white font-medium px-4 py-2 rounded-lg w-full transition duration-200"
        >
          Confirm Booking
        </button>
        <button
          onClick={onClose}
          className="mt-3 text-[#EF4444] hover:underline w-full text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
