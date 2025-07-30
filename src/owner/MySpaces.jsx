import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MySpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://spacer-backend.onrender.com/api/spaces/my", {
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

    const res = await fetch(`https://spacer-backend.onrender.com/api/spaces/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setSpaces((prev) => prev.filter((s) => s.id !== id));
      toast.success("Space deleted.");
    } else {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen text-[#1F2937]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Spaces</h1>
        <Link
          to="/owner/add-space"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-xl shadow"
        >
          + Add New Space
        </Link>
      </div>

      {spaces.length === 0 ? (
        <p className="text-gray-600">You haven’t listed any spaces yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div key={space.id} className="bg-white border border-[#E5E7EB] rounded-2xl shadow p-4">
              <img
                src={space.main_image_url}
                alt={space.title}
                className="h-48 w-full object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{space.title}</h2>
              <p className="text-[#6B7280]">{space.description}</p>
              <p className="text-sm mt-2">Location: {space.location}</p>
              <p className="text-sm">Capacity: {space.capacity}</p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/owner/spaces/${space.id}/edit`)}
                  className="bg-[#F59E0B] text-white px-3 py-1 rounded-lg hover:bg-[#D97706]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(space.id)}
                  className="bg-[#EF4444] text-white px-3 py-1 rounded-lg hover:bg-[#DC2626]"
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
