import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SpacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/spaces/${id}`)
      .then(res => setSpace(res.data))
      .catch(err => console.error('Error fetching space:', err));
  }, [id]);

  if (!space) return <div className="text-center mt-10 text-gray-500">Loading space details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">{space.title}</h2>
      <p className="text-gray-700 mb-3">{space.description}</p>
      <p className="text-gray-600 mb-6">Capacity: <strong>{space.capacity}</strong></p>
      <button
        onClick={() => navigate(`/book/${space.id}`)}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Book This Space
      </button>
    </div>
  );
};

export default SpacePage;
