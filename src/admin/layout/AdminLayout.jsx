import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      {/* 👇 push content to the right */}
      <div className="ml-64">
        <Navbar />
        <main className="pt-20">
  <Outlet />
</main>
      </div>
    </div>
  );
};

export default AdminLayout;
