import React from 'react';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

const QuoteBasket = ({ basket = [], onUpdateQuantity, onRemove }) => {
  if (basket.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col items-center space-y-4">
        <div className="p-4 bg-neutral-light rounded-full text-neutral-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-bold text-primary text-lg">Your basket is empty</h3>
          <p className="text-neutral-500 text-sm mt-1">Explore our product catalog to request quotes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 bg-neutral-light">
        <h3 className="font-bold text-primary font-heading flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Selected Quote Items ({basket.length})
        </h3>
      </div>
      <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
        {basket.map(({ product, quantity }) => (
          <div key={product.id} className="p-6 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-primary truncate text-sm leading-none">{product.brandName}</h4>
              <p className="text-xs text-neutral-400 italic mt-1 truncate">{product.genericName}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                  className="p-1.5 text-neutral-500 hover:text-primary transition hover:bg-neutral-100 rounded-l-lg cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-semibold text-neutral-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                  className="p-1.5 text-neutral-500 hover:text-primary transition hover:bg-neutral-100 rounded-r-lg cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => onRemove(product.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteBasket;
