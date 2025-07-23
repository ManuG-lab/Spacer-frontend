import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MySpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/spaces/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setSpaces)
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
   const confirmDelete = window.confirm("Are you sure you want to delete this space?");
  if (!confirmDelete) return;

  const res = await fetch(`http://localhost:5000/api/spaces/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    setSpaces((prev) => prev.filter((s) => s.id !== id));
    alert("Space deleted.");
  } else {
    alert("Failed to delete.");
  }
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Spaces</h1>
        <Link
          to="/owner/add-space"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        >
          + Add New Space
        </Link>
      </div>

      {spaces.length === 0 ? (
        <p className="text-gray-600">You haven’t listed any spaces yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div key={space.id} className="border rounded-2xl shadow-lg p-4 bg-white">
              <img
                src={space.main_image_url}
                alt={space.title}
                className="h-48 w-full object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{space.title}</h2>
              <p className="text-gray-600">{space.description}</p>
              <p className="text-sm mt-2">Location: {space.location}</p>
              <p className="text-sm">Capacity: {space.capacity}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/owner/spaces/${space.id}/edit`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(space.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySpaces;
