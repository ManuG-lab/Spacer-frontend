import React, { useState, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";
import BookingModal from "../components/BookingModal";

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/spaces")
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((error) => console.error("Error fetching spaces:", error));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.isArray(spaces) && spaces.map((space) => (
  <SpaceCard key={space.id} space={space} onBook={setSelectedSpace} />
))}

      {selectedSpace && (
        <BookingModal space={selectedSpace} onClose={() => setSelectedSpace(null)} />
      )}
    </div>
  );
};

export default Spaces;
