// src/pages/Home.jsx
import SpaceCard from '../components/SpaceCard.jsx';
import { useEffect, useState } from 'react';

export default function Home() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/spaces/spaces')
      .then(response => response.json())
      .then(data => setSpaces(data))
      .catch(error => console.error('Error fetching spaces:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Spaces</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {spaces.map(space => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}
