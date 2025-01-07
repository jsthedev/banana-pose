import React, { createContext } from 'react';

export const ProductVariantIdsContext = createContext();

export const ProductVariantIdsProvider = ({
  productId,
  variantId,
  children,
}) => {
  return (
    <ProductVariantIdsContext.Provider value={{ productId, variantId }}>
      {children}
    </ProductVariantIdsContext.Provider>
  );
};
