const AdminHeader = () => {
    const username = localStorage.getItem("username") || "Admin";
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    };
  
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium">{username}</span>
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
  