import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSpace = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: "",
    amenities: "",
    price_per_hour: "",
    price_per_day: "",
    main_image_url: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      capacity: parseInt(formData.capacity),
      amenities: formData.amenities.split(",").map((item) => item.trim()),
      price_per_hour: parseFloat(formData.price_per_hour),
      price_per_day: parseFloat(formData.price_per_day),
    };

    const res = await fetch("http://localhost:5000/api/spaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Space created successfully.");
      navigate("/owner/spaces");
    } else {
      const err = await res.json();
      alert(err.message || "Failed to create space.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Space</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-3 border rounded-xl"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border rounded-xl"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-3 border rounded-xl"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          className="w-full p-3 border rounded-xl"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma-separated)"
          className="w-full p-3 border rounded-xl"
          value={formData.amenities}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="price_per_hour"
          placeholder="Price Per Hour"
          className="w-full p-3 border rounded-xl"
          value={formData.price_per_hour}
          onChange={handleChange}
        />
        <input
          type="number"
          step="0.01"
          name="price_per_day"
          placeholder="Price Per Day"
          className="w-full p-3 border rounded-xl"
          value={formData.price_per_day}
          onChange={handleChange}
        />
        <input
          type="text"
          name="main_image_url"
          placeholder="Main Image URL"
          className="w-full p-3 border rounded-xl"
          value={formData.main_image_url}
          onChange={handleChange}
        />
        {formData.main_image_url && (
          <img
            src={formData.main_image_url}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSpace;
