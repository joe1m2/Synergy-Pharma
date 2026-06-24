import React from 'react';
import SearchBar from '../common/SearchBar';

const ProductSearch = ({ value, onChange, onSearch }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200">
      <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Search Products</h3>
      <SearchBar
        placeholder="Search by brand, molecule generic, or manufacturer..."
        value={value}
        onChange={onChange}
        onSearch={onSearch}
      />
    </div>
  );
};

export default ProductSearch;
