import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    if (!token) {
      toast.error("No token found!");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("https://spacer-backend.onrender.com/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Error ${response.status}: ${errorText}`);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      toast.error("Error fetching payments.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (paymentId) => {
    try {
      const response = await fetch(
        `https://spacer-backend.onrender.com/api/payments/${paymentId}/confirm`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || data.message || "Error confirming payment");
        return;
      }

      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, payment_status: "completed" } : p
        )
      );
      toast.success("Payment confirmed!");
    } catch (error) {
      toast.error("Network error confirming payment.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-[#4B5563] py-10">Loading payments...</p>
    );

  return payments.length === 0 ? (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Payments</h2>
      <p className="text-[#6B7280]">No payments found.</p>
    </div>
  ) : (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-[#374151]">
              <th className="px-4 py-3 text-sm font-medium">Booking ID</th>
              <th className="px-4 py-3 text-sm font-medium">Client ID</th>
              <th className="px-4 py-3 text-sm font-medium">Amount</th>
              <th className="px-4 py-3 text-sm font-medium">Payment Method</th>
              <th className="px-4 py-3 text-sm font-medium">Payment Date</th>
              <th className="px-4 py-3 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#4B5563]">
            {payments.map((p, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-3">{p.booking_id}</td>
                <td className="px-4 py-3">{p.client_id}</td>
                <td className="px-4 py-3">{p.amount || "-"}</td>
                <td className="px-4 py-3">{p.payment_method || "-"}</td>
                <td className="px-4 py-3">{p.payment_date || "-"}</td>
                <td className="px-4 py-3">
                  {p.payment_status === "completed" ? (
                    <span className="text-[#10B981] font-semibold">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => handleConfirm(p.id)}
                      className="bg-[#1E3A8A] text-white px-3 py-1 rounded-lg hover:bg-[#1A307A] transition"
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
    </div>
  );
};

export default Payments;
