import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full bg-white shadow-md rounded overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
