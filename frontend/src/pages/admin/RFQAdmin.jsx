import React from 'react';
import { Eye, CheckCircle2, XCircle } from 'lucide-react';
import Card from '../../components/common/Card';

const RFQAdmin = () => {
  const rfqs = [
    { id: 1, orgName: 'Black Lion Hospital', contact: 'Dr. Yosef', email: 'yosef@blacklion.gov.et', date: '2026-06-24', itemsCount: 3, status: 'PENDING' },
    { id: 2, orgName: 'Bethel Dental Clinic', contact: 'Dr. Aster', email: 'aster@betheldental.com', date: '2026-06-23', itemsCount: 1, status: 'REVIEWED' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-primary">Request for Quotes (RFQs)</h1>
        <p className="text-sm text-neutral-500">Monitor and update procurement inquiries submitted by healthcare organizations.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-light text-neutral-500 font-bold uppercase tracking-wider text-xs border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
              {rfqs.map((r) => (
                <tr key={r.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-6 py-4 font-bold text-primary">{r.orgName}</td>
                  <td className="px-6 py-4">{r.contact}</td>
                  <td className="px-6 py-4 text-neutral-500">{r.email}</td>
                  <td className="px-6 py-4 text-neutral-500">{r.date}</td>
                  <td className="px-6 py-4">{r.itemsCount} items</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                      r.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-accent hover:text-accent-dark p-1 rounded hover:bg-neutral-100 cursor-pointer">
                      <Eye className="w-4 h-4 inline" />
                    </button>
                    <button className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50 cursor-pointer">
                      <CheckCircle2 className="w-4 h-4 inline" />
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

export default RFQAdmin;
