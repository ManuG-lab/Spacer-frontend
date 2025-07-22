import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpacePage from './pages/SpacePage';
import BookingPage from './pages/BookingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="p-6 text-xl">Welcome to Spacer</div>} />
        <Route path="/space/:id" element={<SpacePage />} />
        <Route path="/book/:id" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
