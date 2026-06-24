import React from 'react';
import { Link } from 'react-router-dom';
import { Beaker, Activity, FileText, ArrowRight } from 'lucide-react';
import Card from '../common/Card';

const ProductCategories = () => {
  return (
    <section className="bg-neutral-light py-20 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black font-heading text-primary">Core Procurement Verticals</h2>
            <p className="mt-2 text-neutral-600 max-w-xl">
              Quickly browse our verified medical inventory. Add items to your basket to request a quote.
            </p>
          </div>
          <Link to="/products" className="mt-4 md:mt-0 text-accent font-bold hover:text-accent-light flex items-center space-x-1 group cursor-pointer">
            <span>View all categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Card className="flex flex-col justify-between h-48">
            <Beaker className="w-8 h-8 text-accent" />
            <div>
              <h3 className="text-lg font-bold font-heading text-primary">Pharmaceuticals</h3>
              <p className="text-xs text-neutral-500 mt-1">Antibiotics, Cardiovascular drugs, and Essential therapies.</p>
            </div>
          </Card>
          <Card className="flex flex-col justify-between h-48">
            <Activity className="w-8 h-8 text-accent" />
            <div>
              <h3 className="text-lg font-bold font-heading text-primary">Medical Devices</h3>
              <p className="text-xs text-neutral-500 mt-1">Imaging systems, patient vitals, and ICU monitors.</p>
            </div>
          </Card>
          <Card className="flex flex-col justify-between h-48">
            <FileText className="w-8 h-8 text-accent" />
            <div>
              <h3 className="text-lg font-bold font-heading text-primary">Diagnostics</h3>
              <p className="text-xs text-neutral-500 mt-1">Rapid diagnostic test kits, reagents, and laboratory consumables.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
