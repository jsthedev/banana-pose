import React, { createContext, useContext } from 'react';

const ProductVariantContext = createContext();

export const useProductVariantContext = () => useContext(ProductVariantContext);

export const ProductVariantProvider = ({ product, variant, children }) => {
  return (
    <ProductVariantContext.Provider value={{ product, variant }}>
      {children}
    </ProductVariantContext.Provider>
  );
};
