import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [space, setSpace] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    amenities: "",
    price_per_hour: "",
    price_per_day: "",
    is_available: false,
    main_image_url: "",
  });

  const fetchSpace = async () => {
    try {
      const res = await fetch(`http://localhost:5000/spaces/${id}`);
      if (!res.ok) throw new Error("Failed to fetch space");
      const data = await res.json();
      setSpace(data);
      setFormData({
        ...data,
        amenities: Array.isArray(data.amenities)
          ? data.amenities.join(", ")
          : data.amenities,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSpace();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/spaces/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          amenities: formData.amenities.split(",").map((a) => a.trim()),
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        alert("Space updated successfully!");
        navigate(`/spaces/${updated.id}`);
      } else {
        const err = await res.json();
        alert(err.error || "Update failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this space?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/spaces/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Space deleted successfully!");
        navigate("/my-spaces");
      } else {
        const err = await res.json();
        alert(err.error || "Delete failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!space) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Space</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        {[
          { name: "title", label: "Title" },
          { name: "description", label: "Description" },
          { name: "location", label: "Location" },
          { name: "capacity", label: "Capacity", type: "number" },
          { name: "amenities", label: "Amenities (comma-separated)" },
          { name: "price_per_hour", label: "Price per Hour", type: "number" },
          { name: "price_per_day", label: "Price per Day", type: "number" },
          { name: "main_image_url", label: "Main Image URL" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <div className="flex items-center space-x-2">
          <label className="font-semibold">Is Available</label>
          <input
            type="checkbox"
            name="is_available"
            checked={formData.is_available}
            onChange={handleChange}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Space
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Space
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSpace;
