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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const paymentsData = paymentsRes.ok ? await paymentsRes.json() : [];
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);

        const bookingsRes = await fetch("https://spacer-backend.onrender.com/api/admin/bookings", {
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
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Reports</h2>
      {loading ? (
        <p className="text-slate-500">Loading reports...</p>
      ) : (
        <>
          <div className="mb-10 bg-white rounded-xl shadow-md p-5">
            <h3 className="text-xl font-semibold text-stone-700 mb-4">All Payments</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 text-left">
                  <tr>
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
                      <tr key={p.id} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-2">{p.id}</td>
                        <td className="px-4 py-2">{p.booking_id}</td>
                        <td className="px-4 py-2">{p.client_id}</td>
                        <td className="px-4 py-2">KES {p.amount || "-"}</td>
                        <td className="px-4 py-2">{p.payment_method || "-"}</td>
                        <td className="px-4 py-2">{p.payment_date || "-"}</td>
                        <td className="px-4 py-2">{p.payment_status || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-4 py-2 text-center text-slate-500">
                        No payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 font-semibold text-sky-800">
              Total Amount Transacted: KES {totalPayments.toLocaleString()}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="text-xl font-semibold text-stone-700 mb-4">All Bookings</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 text-left">
                  <tr>
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
                      <tr key={b.id} className="border-t hover:bg-slate-50">
                        <td className="px-4 py-2">{b.id}</td>
                        <td className="px-4 py-2">{b.space?.title || b.space_id}</td>
                        <td className="px-4 py-2">{b.client_id}</td>
                        <td className="px-4 py-2">{b.start_datetime}</td>
                        <td className="px-4 py-2">{b.end_datetime}</td>
                        <td className="px-4 py-2">{b.duration_hours || "-"}</td>
                        <td className="px-4 py-2">{b.status}</td>
                        <td className="px-4 py-2">KES {b.total_price || "-"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-4 py-2 text-center text-slate-500">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
