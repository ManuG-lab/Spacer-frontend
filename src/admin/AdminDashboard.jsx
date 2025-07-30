import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 text-gray-800">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6 overflow-auto bg-white shadow-inner rounded-tl-xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
