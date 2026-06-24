import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { useAuth } from '../hooks/useAuth';
import { ShieldAlert, Bell, Globe } from 'lucide-react';

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex bg-neutral-light min-h-screen">
      {/* Admin Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center space-x-2 text-primary font-semibold">
            <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
            <span>Secure Admin Dashboard</span>
          </div>

          {/* User Widget */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-neutral-500 hover:text-primary flex items-center space-x-1 text-sm transition">
              <Globe className="w-4 h-4" />
              <span>Public Site</span>
            </Link>
            <div className="flex items-center space-x-2 border-l border-neutral-200 pl-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-neutral-800">{user?.username || 'Admin User'}</p>
                <p className="text-xs text-neutral-400">System Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Panel Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-neutral-light">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
