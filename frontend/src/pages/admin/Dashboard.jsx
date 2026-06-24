import React from 'react';
import { Link } from 'react-router-dom';
import { Package, FileSpreadsheet, Newspaper, Users, Activity, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: "Total Products", value: "3", icon: <Package className="w-6 h-6 text-accent" />, color: "bg-accent/10" },
    { name: "Active RFQs", value: "2", icon: <FileSpreadsheet className="w-6 h-6 text-green-500" />, color: "bg-green-50" },
    { name: "News Articles", value: "2", icon: <Newspaper className="w-6 h-6 text-yellow-500" />, color: "bg-yellow-50" },
    { name: "Partner Inquiries", value: "1", icon: <Users className="w-6 h-6 text-purple-500" />, color: "bg-purple-50" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-primary">Overview Dashboard</h1>
        <p className="text-sm text-neutral-500">Real-time statistics and quick controls for Synergy Pharma system operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">{stat.name}</p>
              <p className="text-2xl font-black text-primary font-heading">{stat.value}</p>
            </div>
            <div className={`p-3.5 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* RFQ Monitor */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold font-heading text-primary">Recent Quote Requests</h3>
            <Link to="/admin/rfqs" className="text-xs text-accent font-bold hover:underline flex items-center space-x-0.5">
              <span>View all</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-neutral-100 text-xs">
            <div className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary">Black Lion Hospital</p>
                <p className="text-neutral-400">Dr. Yosef • 3 items</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">Pending</span>
            </div>
            <div className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary">Bethel Dental Clinic</p>
                <p className="text-neutral-400">Dr. Aster • 1 item</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">Reviewed</span>
            </div>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-4">
          <h3 className="font-bold font-heading text-primary">System Activity Logs</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-2 text-neutral-600">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0"></span>
              <p>Database Flyway schema migrated to version V5 successfully.</p>
            </div>
            <div className="flex items-start space-x-2 text-neutral-600">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
              <p>Admin session initiated by user "admin" from localhost.</p>
            </div>
            <div className="flex items-start space-x-2 text-neutral-600">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0"></span>
              <p>Vite project server mounted successfully at port 5173.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
