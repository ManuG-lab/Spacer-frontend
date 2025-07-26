// components/EditSpace.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditSpace = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://spacer-backend.onrender.com/api/spaces/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch space");
        return res.json();
      })
      .then(setFormData)
      .catch(console.error)
      .catch((err) => {
  console.error(err);
  alert("Failed to fetch space. You may not have permission.");
  navigate("/owner/spaces");
});
      
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://spacer-backend.onrender.com/api/spaces/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Space updated successfully!");
      navigate("/owner/spaces");
    } else {
      alert("Update failed");
    }
  };

  if (!formData) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Space</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "location", "main_image_url"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        ))}
        {["capacity", "price_per_hour", "price_per_day"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace(/_/g, " ")}</label>
            <input
              type="number"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        ))}
        <div>
          <label className="block font-medium">Available</label>
          <input
            type="checkbox"
            name="is_available"
            checked={formData.is_available}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditSpace;
