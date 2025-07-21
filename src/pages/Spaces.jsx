import React, { useEffect, useState } from 'react';
import SpaceCard from '../components/SpaceCard';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/spaces/spaces') //i will  Adjust API URL later 
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((err) => console.error('Error fetching spaces:', err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
};

export default Spaces;
