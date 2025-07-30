import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://spacer-backend.onrender.com/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h2 className="text-2xl font-bold text-stone-800 mb-6">Manage Users</h2>
      {loading ? (
        <p className="text-slate-500">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white border border-slate-200">
            <thead className="bg-slate-700 text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-sky-100">
                    <td className="p-3 text-stone-700">{user.id}</td>
                    <td className="p-3 text-stone-700">{user.name}</td>
                    <td className="p-3 text-stone-700">{user.email}</td>
                    <td className="p-3 text-stone-700">{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-slate-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
