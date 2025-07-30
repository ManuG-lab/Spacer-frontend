import { NavLink } from "react-router-dom";
import { FaUsers, FaHome, FaChartLine, FaBuilding, FaBars } from "react-icons/fa";
import { useState } from "react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-indigo-600 text-white shadow-md ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-indigo-500">
        {isOpen && <span className="font-bold text-lg">Admin</span>}
        <FaBars className="cursor-pointer hover:text-cyan-300" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <nav className="p-4 space-y-3">
        {[
          { to: "/admin/overview", icon: <FaHome />, label: "Overview" },
          { to: "/admin/users", icon: <FaUsers />, label: "Users" },
          { to: "/admin/spaces", icon: <FaBuilding />, label: "Spaces" },
          { to: "/admin/reports", icon: <FaChartLine />, label: "Reports" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-white hover:bg-indigo-500 hover:text-cyan-300"
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            {isOpen && <span className="ml-3">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
