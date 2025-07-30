import { useEffect, useState } from "react";

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch("https://spacer-backend.onrender.com/api/spaces", {
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
      <h2 className="text-2xl font-bold mb-6 text-midnight-navy">Manage Spaces</h2>
      <div className="overflow-x-auto rounded shadow-md">
        <table className="w-full bg-soft-white rounded border border-mist-gray">
          <thead className="bg-steel-blue text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price/hr</th>
              <th className="p-4 text-left">Price/day</th>
              <th className="p-4 text-left">Capacity</th>
              <th className="p-4 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {spaces.length > 0 ? (
              spaces.map((space) => (
                <tr key={space.id} className="border-b border-mist-gray hover:bg-sky-blue/10">
                  <td className="p-4">{space.id}</td>
                  <td className="p-4">{space.title}</td>
                  <td className="p-4">{space.price_per_hour}/=</td>
                  <td className="p-4">{space.price_per_day}/=</td>
                  <td className="p-4">{space.capacity}</td>
                  <td className="p-4">{space.location}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No spaces found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSpaces;
