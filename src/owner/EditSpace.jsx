// components/EditSpace.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch space. You may not have permission.");
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
      toast.success("Space updated successfully!");
      navigate("/owner/spaces");
    } else {
      alert("Update failed");
    }
  };

  if (!formData) return <p className="p-4 text-slate-600">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Edit Space</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["title", "description", "location", "main_image_url"].map((field) => (
          <div key={field}>
            <label className="block font-semibold capitalize text-slate-700 mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        {["capacity", "price_per_hour", "price_per_day"].map((field) => (
          <div key={field}>
            <label className="block font-semibold capitalize text-slate-700 mb-1">
              {field.replace(/_/g, " ")}
            </label>
            <input
              type="number"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full border border-slate-300 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <label className="font-semibold text-slate-700">Available</label>
          <input
            type="checkbox"
            name="is_available"
            checked={formData.is_available}
            onChange={handleChange}
            className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditSpace;
