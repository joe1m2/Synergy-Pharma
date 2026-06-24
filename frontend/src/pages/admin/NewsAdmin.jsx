import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const NewsAdmin = () => {
  const articles = [
    { id: 1, title: 'Synergy Pharma Partners with GE Healthcare', date: '2026-06-20', author: 'Admin' },
    { id: 2, title: 'EFDA Regulatory Updates for 2026', date: '2026-05-14', author: 'Admin' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading text-primary">Manage News & Updates</h1>
          <p className="text-sm text-neutral-500">Publish or delete articles, announcements, and compliance summaries.</p>
        </div>
        <Button variant="accent" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-light text-neutral-500 font-bold uppercase tracking-wider text-xs border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
              {articles.map((a) => (
                <tr key={a.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-6 py-4 font-bold text-primary">{a.title}</td>
                  <td className="px-6 py-4 text-neutral-500">{a.date}</td>
                  <td className="px-6 py-4">{a.author}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-accent hover:text-accent-dark p-1 rounded hover:bg-neutral-100 cursor-pointer">
                      <Edit className="w-4 h-4 inline" />
                    </button>
                    <button className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 cursor-pointer">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default NewsAdmin;
