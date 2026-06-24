import React from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const ProductsAdmin = () => {
  const products = [
    { id: 1, brandName: 'Amoxil-S 500', genericName: 'Amoxicillin 500mg', category: 'Antibiotics', manufacturer: 'SDF Pharma', status: 'Active' },
    { id: 2, brandName: 'Optima Monitor X3', genericName: 'Multi-parameter Patient Monitor', category: 'Patient Monitors', manufacturer: 'GE Healthcare', status: 'Active' },
    { id: 3, brandName: 'Accu-Check Rapid HIV', genericName: 'HIV 1/2 Rapid Test Kit', category: 'Rapid Tests', manufacturer: 'Roche Diagnostics', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-heading text-primary">Manage Products</h1>
          <p className="text-sm text-neutral-500">Add, edit, or delete items from the digital product catalog.</p>
        </div>
        <Button variant="accent" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Button>
      </div>

      <Card className="p-0 overflow-hidden">
        {/* Search header */}
        <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-neutral-light">
          <div className="relative flex items-center w-full sm:max-w-xs">
            <Search className="absolute left-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2 border border-neutral-300 rounded-xl text-sm bg-white"
              placeholder="Search catalog..."
            />
          </div>
        </div>

        {/* Table layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-light text-neutral-500 font-bold uppercase tracking-wider text-xs border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4">Brand Name</th>
                <th className="px-6 py-4">Generic Molecule</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Manufacturer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium text-neutral-700">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50/50 transition">
                  <td className="px-6 py-4 font-bold text-primary">{p.brandName}</td>
                  <td className="px-6 py-4 italic text-neutral-500">{p.genericName}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">{p.manufacturer}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                      {p.status}
                    </span>
                  </td>
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

export default ProductsAdmin;
