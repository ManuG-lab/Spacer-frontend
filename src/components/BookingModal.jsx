import React, { useState } from "react";
import { toast } from 'react-toastify';

const BookingModal = ({ space, onClose }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    console.log("Token before booking:", token);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Book {space.title}</h2>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border w-full p-2 mb-2"
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border w-full p-2 mb-2"
        />
        <button onClick={handleBooking} className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
          Confirm Booking
        </button>
        <button onClick={onClose} className="mt-2 text-red-500">Cancel</button>
      </div>
    </div>
  );
};

export default BookingModal;
