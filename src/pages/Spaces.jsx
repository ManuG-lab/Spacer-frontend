import React, { useState, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";
import BookingModal from "../components/BookingModal";

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    fetch("https://spacer-backend.onrender.com/api/spaces")
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((error) => console.error("Error fetching spaces:", error));
  }, []);

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Available Spaces</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.isArray(spaces) && spaces.map((space) => (
          <SpaceCard key={space.id} space={space} onBook={setSelectedSpace} />
        ))}
      </div>

      {selectedSpace && (
        <BookingModal
          space={selectedSpace}
          onClose={() => setSelectedSpace(null)}
        />
      )}
    </div>
  );
};

export default Spaces;
