import React, { useState } from "react";

const SpaceCard = ({ space, onBook }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div
      className={`bg-surface rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer ${
        expanded ? "max-h-full" : "max-h-[24rem]"
      }`}
      onClick={toggleExpand}
    >
      <img
        src={space.main_image_url}
        alt={space.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 bg-background">
        <h2 className="text-xl font-semibold text-textdark">{space.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{space.location}</p>
        <p className="text-cta font-bold mt-2">
          KES {space.price_per_hour}/hr
        </p>

        {expanded && (
          <div className="mt-4 text-textdark text-sm space-y-2">
            <p>KES {space.price_per_day}/Day</p>
            <p>
              <strong>Description:</strong>{" "}
              {space.description || "No description provided."}
            </p>
            <p>
              <strong>Amenities:</strong>{" "}
              {space.amenities?.split(",").map((a) => a.trim()).join(", ") ||
                "No amenities listed."}
            </p>
            <p>
              <strong>Capacity:</strong>{" "}
              {space.capacity || "Unknown"} people
            </p>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBook(space);
          }}
          className="mt-4 bg-primary text-white w-full py-2 rounded-xl hover:bg-indigo-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SpaceCard;
