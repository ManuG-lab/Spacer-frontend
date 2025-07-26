import { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    if (!token) {
      alert("No token found!");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("https://spacer-backend.onrender.com/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorText = await response.text();
        alert(`Error ${response.status}: ${errorText}`);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      alert("Error fetching payments.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (paymentId) => {
    try {
      const response = await fetch(`https://spacer-backend.onrender.com/api/payments/${paymentId}/confirm`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || data.message || "Error confirming payment");
        return;
      }
      
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, payment_status: "completed" } : p
        )
      );
      alert("Payment confirmed!");
    } catch (error) {
      alert("Network error confirming payment.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading payments...</p>;

  return payments.length === 0 ? (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>
      <p className="text-gray-600">No payments found.</p>
    </div>
  ) : (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payments</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Client ID</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Payment Date</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{p.booking_id}</td>
              <td className="px-4 py-2">{p.client_id}</td>
              <td className="px-4 py-2">{p.amount || "-"}</td>
              <td className="px-4 py-2">{p.payment_method || "-"}</td>
              <td className="px-4 py-2">{p.payment_date || "-"}</td>
              <td className="px-4 py-2">
                {p.payment_status === "completed" ? (
                  <span className="text-green-600 font-semibold">Completed</span>
                ) : (
                  <button
                    onClick={() => handleConfirm(p.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
