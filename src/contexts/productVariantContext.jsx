import React, { createContext, useContext, useMemo } from 'react';

const ProductVariantContext = createContext();

export const useProductVariantContext = () => useContext(ProductVariantContext);

export const useProduct = () => {
  const { product } = useProductVariantContext();
  return product;
};

export const useVariant = () => {
  const { variant } = useProductVariantContext();
  return variant;
};

export const ProductVariantProvider = ({ product, variant, children }) => {
  const contextValue = useMemo(
    () => ({ product, variant }),
    [product, variant]
  );

  return (
    <ProductVariantContext.Provider value={contextValue}>
      {children}
    </ProductVariantContext.Provider>
  );
};
