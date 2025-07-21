import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Spaces from './pages/Spaces';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/spaces/spaces")
      .then((res) => res.json())
      .then((data) => setSpaces(data))
      .catch((error) => console.error("Error fetching spaces:", error));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home spaces={spaces} />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
