import { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/admin/reports", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <ul className="bg-white p-4 rounded shadow">
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <li key={index} className="border-b p-2">{report}</li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No reports available</li>
        )}
      </ul>
    </div>
  );
};

export default Reports;
