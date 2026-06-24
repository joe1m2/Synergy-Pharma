import React from 'react';

const ProductFilter = ({
  categories = [],
  manufacturers = [],
  selectedCategory,
  selectedManufacturer,
  onSelectCategory,
  onSelectManufacturer,
  onClearFilters,
}) => {
  return (
    <div className="space-y-8 bg-white p-6 rounded-2xl border border-neutral-200">
      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium cursor-pointer ${
              !selectedCategory
                ? 'bg-primary text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-light'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-light'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Manufacturers</h3>
        <div className="space-y-2">
          <button
            onClick={() => onSelectManufacturer(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium cursor-pointer ${
              !selectedManufacturer
                ? 'bg-primary text-white font-semibold'
                : 'text-neutral-600 hover:bg-neutral-light'
            }`}
          >
            All Manufacturers
          </button>
          {manufacturers.map((mfr) => (
            <button
              key={mfr.id}
              onClick={() => onSelectManufacturer(mfr.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition font-medium cursor-pointer ${
                selectedManufacturer === mfr.id
                  ? 'bg-primary text-white font-semibold'
                  : 'text-neutral-600 hover:bg-neutral-light'
              }`}
            >
              {mfr.name}
            </button>
          ))}
        </div>
      </div>

      {(selectedCategory || selectedManufacturer) && (
        <button
          onClick={onClearFilters}
          className="w-full text-center px-4 py-2 border.5 border-dashed border-red-500 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition cursor-pointer"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default ProductFilter;
