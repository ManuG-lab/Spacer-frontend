import React from 'react';

const SpaceCard = ({ space }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
    <img
      src={space.image}
      alt={space.name}
      className="w-full h-48 object-cover"
    />
      <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800">{space.name}</h2>
        <p className="text-gray-600 text-sm mt-2">{space.location}</p>
        <p className="text-indigo-600 font-bold mt-2">${space.price}/hour</p>
        <button className="mt-4 bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;
