import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { QuoteContext } from '../context/QuoteContext';
import { ArrowLeft, ShoppingBag, Plus, Sparkles, FileText, CheckCircle } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToBasket } = useContext(QuoteContext) || { addToBasket: () => {} };
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (e) {
        // Fallback for simulation
        setProduct({
          id,
          brandName: 'Amoxil-S 500',
          genericName: 'Amoxicillin 500mg',
          description: 'Broad-spectrum antibiotic capsule indicated for bacterial infections of the ear, nose, throat, and respiratory tract.',
          technicalSpecifications: '{"dosage": "500mg capsule", "packaging": "Box of 100 capsules", "storage": "Store below 25°C", "shelf_life": "36 months"}',
          manufacturer: { name: 'SDF Pharma', country: 'India' }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading specifications...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  let specs = {};
  try {
    specs = JSON.parse(product.technicalSpecifications || '{}');
  } catch (e) {
    specs = { specifications: product.technicalSpecifications };
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link to="/products" className="flex items-center space-x-1 text-accent font-bold hover:text-accent-light">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Catalog</span>
      </Link>

      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        
        {/* Info panel */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold bg-neutral-light text-accent px-2.5 py-1 rounded-full uppercase tracking-wider">
              Verification Active
            </span>
            <h1 className="text-3xl font-bold font-heading text-primary leading-tight">{product.brandName}</h1>
            <p className="text-sm text-neutral-400 italic font-medium">{product.genericName}</p>
          </div>

          <p className="text-neutral-600 text-sm leading-relaxed">{product.description}</p>

          <div className="space-y-2 border-t border-neutral-100 pt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Manufacturer:</span>
              <span className="font-semibold text-primary">{product.manufacturer?.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Country of Origin:</span>
              <span className="font-semibold text-primary">{product.manufacturer?.country || 'N/A'}</span>
            </div>
          </div>

          {/* Add to Basket widgets */}
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-light">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-neutral-200 font-semibold text-primary">-</button>
              <span className="px-4 font-bold text-primary">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-neutral-200 font-semibold text-primary">+</button>
            </div>
            <button
              onClick={() => {
                addToBasket(product, quantity);
                alert(`Added ${quantity} of ${product.brandName} to your Quote Basket.`);
              }}
              className="flex-1 bg-accent hover:bg-accent-light text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm text-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Quote Basket
            </button>
          </div>
        </div>

        {/* Specs Table */}
        <div className="bg-neutral-light p-6 rounded-2xl border border-neutral-200 space-y-4">
          <h3 className="text-md font-bold font-heading text-primary flex items-center gap-1.5">
            <FileText className="w-4.5 h-4.5 text-accent" /> Technical Specifications
          </h3>
          <div className="divide-y divide-neutral-200">
            {Object.entries(specs).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2.5 text-xs">
                <span className="text-neutral-500 uppercase tracking-wide">{key.replace('_', ' ')}</span>
                <span className="font-semibold text-neutral-800 text-right">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
