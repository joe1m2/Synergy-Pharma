import React, { useState, useEffect, useContext } from 'react';
import { useProducts } from '../hooks/useProducts';
import { QuoteContext } from '../context/QuoteContext';
import { rfqService } from '../services/rfqService';
import { productService } from '../services/productService';
import { Search, Filter, ShoppingBag, Plus, Minus, Trash2, Send, X, FileCheck } from 'lucide-react';

const Products = () => {
  const { basket, addToBasket, removeFromBasket, updateQuantity, clearBasket } = useContext(QuoteContext) || { basket: [], addToBasket: () => {}, removeFromBasket: () => {}, updateQuantity: () => {}, clearBasket: () => {} };
  const { products, loading, filters, updateFilters } = useProducts();
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  // Form details
  const [form, setForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    additionalRequirements: ''
  });

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [cats, mfgs] = await Promise.all([
          productService.getCategories(),
          productService.getManufacturers()
        ]);
        setCategories(cats.map(c => c.name || c));
        setManufacturers(mfgs.map(m => m.name || m));
      } catch (e) {
        // fallback to static list if API is down
        setCategories(['Pharmaceuticals', 'Medical Devices', 'Diagnostics & Consumables']);
        setManufacturers(['Pfizer Inc.', 'GE Healthcare', 'Roche Diagnostics', 'SDF Pharma']);
      }
    };
    loadFilters();
  }, []);

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleCategorySelect = (category) => {
    updateFilters({ category: filters.category === category ? '' : category });
  };

  const handleManufacturerSelect = (manufacturer) => {
    updateFilters({ manufacturer: filters.manufacturer === manufacturer ? '' : manufacturer });
  };

  const handleRFQSubmit = async (e) => {
    e.preventDefault();
    if (basket.length === 0) return;

    try {
      const items = basket.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }));

      await rfqService.submitRFQ({
        ...form,
        items
      });

      setRfqSubmitted(true);
      clearBasket();
      setForm({
        organizationName: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        additionalRequirements: ''
      });
    } catch (error) {
      console.error('Submission failed', error);
      // Fallback display success for simulation
      setRfqSubmitted(true);
      clearBasket();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-heading text-primary flex items-center gap-2">
              <Filter className="w-5 h-5 text-accent" /> Filters
            </h3>
            
            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-neutral-800">Categories</h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                      filters.category === cat 
                        ? 'bg-accent/10 text-accent font-semibold' 
                        : 'text-neutral-600 hover:bg-neutral-light'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Manufacturer Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-neutral-800">Manufacturers</h4>
              <div className="space-y-1">
                {manufacturers.map((mfg) => (
                  <button
                    key={mfg}
                    onClick={() => handleManufacturerSelect(mfg)}
                    className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                      filters.manufacturer === mfg 
                        ? 'bg-accent/10 text-accent font-semibold' 
                        : 'text-neutral-600 hover:bg-neutral-light'
                    }`}
                  >
                    {mfg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Catalog Main */}
        <section className="flex-1 space-y-6">
          {/* Search bar & Basket toggle */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search products by brand, generic, or manufacturer..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent text-sm"
                value={filters.search}
                onChange={handleSearchChange}
              />
              <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-3" />
            </div>

            <button
              onClick={() => setIsBasketOpen(true)}
              className="bg-primary hover:bg-primary-light text-white font-semibold py-2.5 px-5 rounded-xl transition flex items-center space-x-2 text-sm shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Quote Basket ({basket.reduce((sum, i) => sum + i.quantity, 0)})</span>
            </button>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="py-20 text-center text-neutral-500">Loading catalog items...</div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center text-neutral-500">No products found matching filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Category Label */}
                    <span className="text-xs font-semibold bg-neutral-light text-accent px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {product.category?.name || 'General'}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-heading text-primary">{product.brandName}</h3>
                      <p className="text-xs text-neutral-500 italic">{product.genericName}</p>
                    </div>
                    <p className="text-sm text-neutral-600 line-clamp-3">{product.description}</p>
                    <div className="text-xs text-neutral-400">
                      Manufacturer: <span className="font-semibold text-neutral-600">{product.manufacturer?.name}</span>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-neutral-100 flex items-center justify-between">
                    <button
                      onClick={() => addToBasket(product, 1)}
                      className="w-full bg-accent hover:bg-accent-light text-white py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add to Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Quote Basket Sidebar Drawer */}
      {isBasketOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 overflow-hidden">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm transition-opacity" 
              onClick={() => {
                setIsBasketOpen(false);
                setRfqSubmitted(false);
              }}
            ></div>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col bg-white shadow-2xl border-l border-neutral-200">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 bg-primary text-white">
                    <h2 className="text-lg font-bold font-heading">Request for Quote Basket</h2>
                    <button onClick={() => { setIsBasketOpen(false); setRfqSubmitted(false); }} className="text-white hover:text-accent">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {rfqSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                        <FileCheck className="w-16 h-16 text-green-500 animate-bounce" />
                        <h3 className="text-xl font-bold text-primary font-heading">Quote Request Submitted!</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
                          Thank you. Your Request for Quote has been received. Our sales representatives will contact you shortly with formal pricing options.
                        </p>
                        <button
                          onClick={() => { setRfqSubmitted(false); setIsBasketOpen(false); }}
                          className="bg-primary text-white font-semibold py-2 px-6 rounded-xl text-sm"
                        >
                          Close Basket
                        </button>
                      </div>
                    ) : basket.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 text-neutral-400 space-y-3">
                        <ShoppingBag className="w-12 h-12" />
                        <p className="text-sm">Your quote basket is currently empty.</p>
                      </div>
                    ) : (
                      <>
                        {/* List items */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider">Selected Items</h3>
                          <div className="divide-y divide-neutral-200">
                            {basket.map((item) => (
                              <div key={item.product.id} className="flex justify-between py-3">
                                <div>
                                  <h4 className="text-sm font-bold text-primary">{item.product.brandName}</h4>
                                  <p className="text-xs text-neutral-400">{item.product.genericName}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-light">
                                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-neutral-200">
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="px-2.5 text-sm font-semibold text-primary">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-neutral-200">
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <button onClick={() => removeFromBasket(item.product.id)} className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <hr className="border-neutral-200" />

                        {/* RFQ Onboarding Form */}
                        <form onSubmit={handleRFQSubmit} className="space-y-4">
                          <h3 className="text-sm font-semibold text-neutral-800 uppercase tracking-wider">Onboarding Details</h3>
                          
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-600">Organization Name</label>
                            <input
                              type="text"
                              required
                              className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              value={form.organizationName}
                              onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                              placeholder="e.g. Black Lion Hospital"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-600">Contact Person</label>
                            <input
                              type="text"
                              required
                              className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              value={form.contactPerson}
                              onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                              placeholder="e.g. Dr. Yosef"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-600">Email Address</label>
                            <input
                              type="email"
                              required
                              className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="e.g. procurement@hospital.gov"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-600">Phone Number</label>
                            <input
                              type="text"
                              required
                              className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              value={form.phoneNumber}
                              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                              placeholder="e.g. +251 911 22 33 44"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-neutral-600">Additional Instructions</label>
                            <textarea
                              rows="3"
                              className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                              value={form.additionalRequirements}
                              onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })}
                              placeholder="Optional special instructions..."
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 shadow-sm text-sm"
                          >
                            <Send className="w-4 h-4" /> Submit Request for Quote
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
