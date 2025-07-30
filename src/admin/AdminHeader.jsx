import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminHeader = () => {
    const username = localStorage.getItem("username") || "Admin";
      const navigate = useNavigate();
  
    const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
    toast.success("Logged out successfully!");
  };
  
    return (
      <header className="bg-gray-900 shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium text-indigo-600">{username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
    );
  };
  
  export default AdminHeader;
  