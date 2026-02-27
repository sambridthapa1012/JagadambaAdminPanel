import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  LogOut,
  ChevronDown,
} from "lucide-react";

const Sidebar = () => {
  const [openOrders, setOpenOrders] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  return (
    <aside className="w-64 h-screen bg-white fixed left-0 top-0 border-r">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center text-xl font-bold border-b">
        Hardware Admin
      </div>

      <nav className="p-4 space-y-2">

        <NavItem
          to="/admin"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        {/* ===== PRODUCTS ===== */}
        <button
          onClick={() => setOpenProducts(!openProducts)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <Package size={18} />
            Products
          </span>
          <ChevronDown
            size={16}
            className={`transition ${openProducts ? "rotate-180" : ""}`}
          />
        </button>

        {openProducts && (
          <div className="ml-6 space-y-1">
            <SubNavItem to="/admin/products">Product List</SubNavItem>
            <SubNavItem to="/admin/categories">Categories</SubNavItem>
          </div>
        )}

        {/* ===== ORDERS ===== */}
        <button
          onClick={() => setOpenOrders(!openOrders)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <ShoppingCart size={18} />
            Orders
          </span>
          <ChevronDown
            size={16}
            className={`transition ${openOrders ? "rotate-180" : ""}`}
          />
        </button>

        {openOrders && (
          <div className="ml-6 space-y-1">
            <SubNavItem to="/admin/orders">User Orders</SubNavItem>
            <SubNavItem to="/admin/orders/bulk">Bulk Orders</SubNavItem>
          </div>
        )}

        {/* ===== USERS ===== */}
        <button
          onClick={() => setOpenUsers(!openUsers)}
          className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <span className="flex items-center gap-3">
            <Users size={18} />
            Users
          </span>
          <ChevronDown
            size={16}
            className={`transition ${openUsers ? "rotate-180" : ""}`}
          />
        </button>

        {openUsers && (
          <div className="ml-6 space-y-1">
            <SubNavItem to="/admin/users/create">Create User</SubNavItem>
            <SubNavItem to="/admin/users">User List</SubNavItem>
          </div>
        )}
        <NavItem
          to="/admin/invoices"
          icon={<FileText size={18} />}
          label="Invoice"
        />

        {/* Logout */}
        <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-red-500 hover:bg-red-50 mt-6">
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition
       ${isActive ? "bg-orange-500 text-white" : "hover:bg-gray-100"}`
    }
  >
    {icon}
    {label}
  </NavLink>
);
 

const SubNavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-lg text-sm transition
       ${isActive ? "bg-orange-100 text-orange-600" : "hover:bg-gray-100"}`
    }
  >
    {children}
  </NavLink>
  

);

export default Sidebar;
