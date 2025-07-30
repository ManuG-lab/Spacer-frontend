import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const Pay = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://spacer-backend.onrender.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          booking_id: bookingId,
          amount,
          payment_method: paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");
      alert("Payment successful!");
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#F4EEE0] shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-semibold text-[#0F1035] mb-6 text-center">
        Make Payment for Booking #{bookingId}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#365486] mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-[#365486] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7FC7D9]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#365486] mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-[#365486] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7FC7D9]"
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="mpesa">Mpesa</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#365486] hover:bg-[#0F1035] text-white py-2 px-4 rounded font-semibold transition"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Pay;
