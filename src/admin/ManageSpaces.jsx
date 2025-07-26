import React, { useEffect, useState } from "react";

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/spaces", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddSpace = () => {
    fetch("http://127.0.0.1:5000/api/spaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, price_per_hour: parseFloat(price) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSpaces([...spaces, data]);
        setTitle("");
        setPrice("");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteSpace = (id) => {
    fetch(`http://127.0.0.1:5000/api/spaces/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setSpaces(spaces.filter((space) => space.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Spaces</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Space Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price per Hour"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddSpace}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Space
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {spaces.map((space) => (
          <div key={space.id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold">{space.title}</h3>
            <p>KES {space.price_per_hour}/hr</p>
            <button
              onClick={() => handleDeleteSpace(space.id)}
              className="bg-red-600 text-white px-3 py-1 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSpaces;
