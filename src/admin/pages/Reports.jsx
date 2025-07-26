import { useEffect, useState } from "react";

const Reports = () => {
  const [payments, setPayments] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const paymentsRes = await fetch("https://spacer-backend.onrender.com/api/payments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);

        const bookingsRes = await fetch("https://spacer-backend.onrender.com/api/admin/bookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const bookingsData = bookingsRes.ok ? await bookingsRes.json() : [];
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setPayments([]);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const totalPayments = payments.reduce(
    (sum, payment) => sum + (Number(payment.amount) || 0),
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      {loading ? (
        <p className="text-gray-500">Loading reports...</p>
      ) : (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">All Payments</h3>
            <table className="min-w-full bg-white border border-gray-300 rounded mb-2">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Payment ID</th>
                  <th className="px-4 py-2">Booking ID</th>
                  <th className="px-4 py-2">Client ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((p) => (
                    <tr key={p.id} className="border-t">
                      <td className="px-4 py-2">{p.id}</td>
                      <td className="px-4 py-2">{p.booking_id}</td>
                      <td className="px-4 py-2">{p.client_id}</td>
                      <td className="px-4 py-2">{p.amount || "-"}</td>
                      <td className="px-4 py-2">{p.payment_method || "-"}</td>
                      <td className="px-4 py-2">{p.payment_date || "-"}</td>
                      <td className="px-4 py-2">{p.payment_status || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 text-gray-500 text-center">
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="font-bold text-indigo-700">
              Total Amount Transacted: KES {totalPayments}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">All Bookings</h3>
            <table className="min-w-full bg-white border border-gray-300 rounded">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2">Booking ID</th>
                  <th className="px-4 py-2">Space</th>
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">Start</th>
                  <th className="px-4 py-2">End</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr key={b.id} className="border-t">
                      <td className="px-4 py-2">{b.id}</td>
                      <td className="px-4 py-2">{b.space?.title || b.space_id}</td>
                      <td className="px-4 py-2">{b.client_id}</td>
                      <td className="px-4 py-2">{b.start_datetime}</td>
                      <td className="px-4 py-2">{b.end_datetime}</td>
                      <td className="px-4 py-2">{b.duration_hours || "-"}</td>
                      <td className="px-4 py-2">{b.status}</td>
                      <td className="px-4 py-2">{b.total_price || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-2 text-gray-500 text-center">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
