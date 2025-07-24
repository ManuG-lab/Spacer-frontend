import { useEffect, useState } from "react";

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/spaces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Spaces</h2>
      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Location</th>
          </tr>
        </thead>
        <tbody>
          {spaces.length > 0 ? (
            spaces.map((space) => (
              <tr key={space.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{space.id}</td>
                <td className="p-3">{space.name}</td>
                <td className="p-3">${space.price_per_hour}</td>
                <td className="p-3">{space.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No spaces found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSpaces;
