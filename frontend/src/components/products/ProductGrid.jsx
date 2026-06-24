import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse bg-white border border-neutral-200 rounded-2xl h-64 p-6 space-y-4">
            <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
            <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
            </div>
            <div className="h-8 bg-neutral-200 rounded w-1/2 pt-4 border-t border-neutral-100"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-neutral-200 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-primary font-heading">No Products Found</h3>
        <p className="text-neutral-500 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
