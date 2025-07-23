import { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPayments = async () => {
      if (!token) {
        alert("No token found!");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/payments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
          alert(`Error ${response.status}: ${errorText}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Fetched payments data:", data)
        setPayments(data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Error fetching payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  const handleConfirm = async (paymentId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/payments/${paymentId}/confirm`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
      },
    });

    const data = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (!response.ok) {
      console.error("Error confirming payment:", data.error || data.message);
      return;
    }

    console.log("Payment confirmed successfully:", data.payment);
    // Optional: Refresh payments list or update UI state
  } catch (error) {
    console.error("Network error:", error);
  }
};

  if (loading) return <p className="text-center text-gray-600">Loading payments...</p>;

  return (
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
