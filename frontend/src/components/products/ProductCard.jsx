import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import Card from '../common/Card';

const ProductCard = ({ product }) => {
  const { id, brandName, genericName, description, manufacturer } = product;

  return (
    <Card className="flex flex-col justify-between h-full bg-white hover:border-accent/40 hover:shadow-md transition">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-primary/10 text-primary">
            {manufacturer?.name || 'Manufacturer'}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold font-heading text-primary leading-tight">{brandName}</h3>
          <p className="text-xs text-neutral-400 italic mt-0.5">{genericName}</p>
        </div>
        <p className="text-neutral-600 text-sm line-clamp-3 leading-relaxed mt-2">{description}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
        <Link
          to={`/products/${id}`}
          className="text-accent hover:text-accent-light font-bold text-sm inline-flex items-center gap-1 group cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
