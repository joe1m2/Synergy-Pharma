import React from 'react';
import { Mail, CheckSquare } from 'lucide-react';
import Card from '../../components/common/Card';

const PartnersAdmin = () => {
  const inquiries = [
    { id: 1, companyName: 'Astra Biotech', contact: 'Sarah Jenkins', email: 's.jenkins@astrabiotech.com', region: 'Germany', portfolio: 'Diagnostic PCR tests' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-primary">Partner Inquiries</h1>
        <p className="text-sm text-neutral-500">Review market entry registration and B2B partnership requests from global manufacturers.</p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-light text-neutral-500 font-bold uppercase tracking-wider text-xs border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Contact Person</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Product Portfolio</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-6 py-4 font-bold text-primary">{inq.companyName}</td>
                  <td className="px-6 py-4">{inq.contact}</td>
                  <td className="px-6 py-4 text-neutral-500">{inq.region}</td>
                  <td className="px-6 py-4">{inq.portfolio}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-accent hover:text-accent-dark p-2 rounded hover:bg-neutral-100 cursor-pointer inline-block"
                    >
                      <Mail className="w-4 h-4 inline" />
                    </a>
                    <button className="text-emerald-600 hover:text-emerald-700 p-2 rounded hover:bg-emerald-50 cursor-pointer">
                      <CheckSquare className="w-4 h-4 inline" />
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

export default PartnersAdmin;
