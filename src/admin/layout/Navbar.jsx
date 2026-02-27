import { Bell, User } from "lucide-react";


const Navbar = () => {
  
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <h1 className="font-semibold text-lg">Admin Dashboard</h1>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer text-gray-600" />
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="text-gray-600" />
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
