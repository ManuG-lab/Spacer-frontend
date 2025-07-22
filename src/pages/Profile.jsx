import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://127.0.0.1:5000/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><span className="font-semibold">Name:</span> {profile.name}</p>
      <p><span className="font-semibold">Email:</span> {profile.email}</p>
      <p><span className="font-semibold">Role:</span> {profile.role}</p>
      <p><span className="font-semibold">Verified:</span> {profile.is_verified ? "Yes" : "No"}</p>
      <p><span className="font-semibold">Joined:</span> {new Date(profile.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
