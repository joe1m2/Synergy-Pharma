import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ category: '', manufacturer: '', search: '' });

  const fetchProducts = async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts(currentFilters);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Use individual primitive values as deps to avoid infinite re-render from object reference
  useEffect(() => {
    fetchProducts(filters);
  }, [filters.category, filters.manufacturer, filters.search]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return { products, loading, error, filters, updateFilters, refresh: () => fetchProducts(filters) };
};
