import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-indigo-600 mb-4">
        Welcome to Spacer
      </h1>
      <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-2xl">
        Discover and book amazing spaces for your events, meetings, and creative sessions.
      </p>
      <Link
        to="/spaces"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Explore Spaces
      </Link>
    </div>
  );
};

export default Home;
