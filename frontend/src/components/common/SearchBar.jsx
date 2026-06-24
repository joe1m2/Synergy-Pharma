import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  className = '',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex items-center w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-neutral-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm text-neutral-800 placeholder-neutral-400 shadow-sm transition"
      />
      {onSearch && (
        <button
          type="submit"
          className="absolute right-2 px-4 py-1.5 bg-primary text-white font-semibold rounded-xl text-xs hover:bg-primary-light transition cursor-pointer"
        >
          Search
        </button>
      )}
    </form>
  );
};

export default SearchBar;
