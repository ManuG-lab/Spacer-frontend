import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://spacer-backend.onrender.com/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 text-center">

        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.role.toUpperCase()}</p>

        <div className="text-left space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Verified:</span>{" "}
            <span
              className={`inline-block px-2 py-1 rounded-full text-white text-xs ${
                user.is_verified ? "bg-green-500" : "bg-red-400"
              }`}
            >
              {user.is_verified ? "Yes" : "No"}
            </span>
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button onClick ={handleLogout} className="bg-blue-400 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
