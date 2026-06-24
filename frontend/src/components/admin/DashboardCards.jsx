import React from 'react';
import { ShoppingBag, FileText, Users, Newspaper } from 'lucide-react';
import Card from '../common/Card';

const DashboardCards = () => {
  const stats = [
    {
      title: 'Active Products',
      value: '24',
      change: '+2 this week',
      icon: <ShoppingBag className="w-6 h-6 text-accent" />,
      color: 'bg-accent/10',
    },
    {
      title: 'RFQs Received',
      value: '18',
      change: '4 pending review',
      icon: <FileText className="w-6 h-6 text-primary" />,
      color: 'bg-primary/10',
    },
    {
      title: 'Partner Inquiries',
      value: '7',
      change: '1 new inquiry',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50',
    },
    {
      title: 'Published News',
      value: '12',
      change: 'Last post 3d ago',
      icon: <Newspaper className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">{stat.title}</p>
            <h4 className="text-2xl font-black font-heading text-primary">{stat.value}</h4>
            <p className="text-xs text-neutral-500 font-medium">{stat.change}</p>
          </div>
          <div className={`p-4 rounded-2xl ${stat.color}`}>
            {stat.icon}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
