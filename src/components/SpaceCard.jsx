import React, { useState } from "react";

const SpaceCard = ({ space, onBook }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div
      className={`bg-gray-200  rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer ${
        expanded ? "max-h-full" : "max-h-[24rem]"
      }`}
      onClick={toggleExpand}
    >
      <img
        src={space.main_image_url}
        alt={space.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{space.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{space.location}</p>
        <p className="text-indigo-600 font-bold mt-2">
          KES {space.price_per_hour}/hr
        </p>

        {expanded && (
          <div className="mt-4 text-gray-700 text-sm">
            <p> KES {space.price_per_day}/Day</p>
            <p><strong>Description:</strong> {space.description || "No description provided."}</p>
            <p className="mt-2">
              <strong>Amenities:</strong>{" "}
              {space.amenities.split(',').map(a => a.trim()).join(', ')
                || "No amenities listed."}
            </p>
            <p className="mt-2">
              <strong>Capacity:</strong> {space.capacity || "Unknown"} people
            </p>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBook(space);
          }}
          className="mt-4 bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;
