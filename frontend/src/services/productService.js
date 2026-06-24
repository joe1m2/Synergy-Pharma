import api from './api';

export const productService = {
  getAllProducts: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.manufacturer) params.append('manufacturer', filters.manufacturer);
      if (filters.search) params.append('search', filters.search);

      const response = await api.get(`/products?${params.toString()}`);
      const data = response.data;

      // Spring Boot may return a paginated Page object { content: [...] }
      // or a plain array — handle both
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.content)) return data.content;
      return [];
    } catch (error) {
      console.warn('API connection failed. Returning local fallback mock data.');
      // Fallback local mock data for Phase 1 compilation/testing
      return [
        {
          id: 1,
          brandName: 'Amoxil-S 500',
          genericName: 'Amoxicillin 500mg',
          description: 'Broad-spectrum antibiotic capsule.',
          category: { name: 'Antibiotics' },
          manufacturer: { name: 'SDF Pharma', country: 'India' },
          active: true
        },
        {
          id: 2,
          brandName: 'Optima Monitor X3',
          genericName: 'Multi-parameter Patient Monitor',
          description: 'Clinical ICU patient monitor.',
          category: { name: 'Patient Monitors' },
          manufacturer: { name: 'GE Healthcare', country: 'United Kingdom' },
          active: true
        }
      ];
    }
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      const data = response.data;
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.content)) return data.content;
      return [];
    } catch (e) {
      return [
        { id: 1, name: 'Pharmaceuticals' },
        { id: 2, name: 'Medical Devices' },
        { id: 3, name: 'Diagnostics & Consumables' }
      ];
    }
  },

  getManufacturers: async () => {
    try {
      const response = await api.get('/manufacturers');
      const data = response.data;
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.content)) return data.content;
      return [];
    } catch (e) {
      return [
        { id: 1, name: 'Pfizer Inc.', country: 'USA' },
        { id: 2, name: 'GE Healthcare', country: 'United Kingdom' },
        { id: 3, name: 'Roche Diagnostics', country: 'Switzerland' }
      ];
    }
  }
};
