import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const username = localStorage.getItem("username") || "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="font-medium">{username}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
