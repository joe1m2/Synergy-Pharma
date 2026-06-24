import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, 
  Package, 
  FileSpreadsheet, 
  Newspaper, 
  Users, 
  ArrowLeft, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, end: true },
    { name: 'Products Catalog', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Quote Requests (RFQ)', path: '/admin/rfqs', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { name: 'News & Updates', path: '/admin/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Partner Inquiries', path: '/admin/partners', icon: <Users className="w-5 h-5" /> },
  ];

  const activeClass = "flex items-center space-x-3 bg-primary-light text-white px-4 py-3 rounded-lg font-medium transition duration-150";
  const inactiveClass = "flex items-center space-x-3 text-neutral-300 hover:bg-primary-light/50 hover:text-white px-4 py-3 rounded-lg font-medium transition duration-150";

  return (
    <aside className="w-64 bg-primary text-white flex flex-col min-h-screen border-r border-primary-dark">
      {/* Admin Title */}
      <div className="p-6 border-b border-primary-dark">
        <Link to="/admin" className="flex flex-col">
          <span className="text-lg font-bold font-heading tracking-wide">SYNERGY ADMIN</span>
          <span className="text-xs text-neutral-400">Control Panel</span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-grow p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-primary-dark space-y-2">
        <Link
          to="/"
          className="flex items-center space-x-3 text-neutral-400 hover:text-white px-4 py-2 text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-400 hover:text-red-300 px-4 py-2 text-sm w-full text-left transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
