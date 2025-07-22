import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center text-white text-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to Spacer</h1>
        <p className="text-xl mb-6">Discover & book amazing spaces around you</p>
        <Link to="/about" className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition">
          Learn More
        </Link>
        <Link to="/spaces" className="ml-4 bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800 transition">
          Explore Spaces
        </Link>
      </div>
    </section>
    </div>

  );
}

