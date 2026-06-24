import React, { createContext, useState, useEffect } from 'react';

export const QuoteContext = createContext(null);

export const QuoteProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  // Load basket from localStorage
  useEffect(() => {
    const savedBasket = localStorage.getItem('synergy_basket');
    if (savedBasket) {
      try {
        setBasket(JSON.parse(savedBasket));
      } catch (e) {
        localStorage.removeItem('synergy_basket');
      }
    }
  }, []);

  const saveBasket = (newBasket) => {
    setBasket(newBasket);
    localStorage.setItem('synergy_basket', JSON.stringify(newBasket));
  };

  const addToBasket = (product, quantity = 1) => {
    const existingIndex = basket.findIndex(item => item.product.id === product.id);
    let newBasket = [...basket];
    
    if (existingIndex > -1) {
      newBasket[existingIndex].quantity += quantity;
    } else {
      newBasket.push({ product, quantity });
    }
    saveBasket(newBasket);
  };

  const removeFromBasket = (productId) => {
    const newBasket = basket.filter(item => item.product.id !== productId);
    saveBasket(newBasket);
  };

  const updateQuantity = (productId, quantity) => {
    const newBasket = basket.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity: Math.max(1, quantity) };
      }
      return item;
    });
    saveBasket(newBasket);
  };

  const clearBasket = () => {
    saveBasket([]);
  };

  return (
    <QuoteContext.Provider value={{ basket, addToBasket, removeFromBasket, updateQuantity, clearBasket }}>
      {children}
    </QuoteContext.Provider>
  );
};
