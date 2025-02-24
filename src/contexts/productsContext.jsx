import { createContext, useState, useEffect } from "react";

import {
  listProducts,
  listVariants,
  listSizes,
  getSize,
} from "@/firebase/productsDB";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchSizes = async (productId, variantId) => {
    // Fetch sizes for this variant
    const sizesArray = await listSizes(productId, variantId);

    const sizesMap = sizesArray.reduce((accumulator, sizeObj) => {
      // Use sizeObj.id as key, and sizeObj.inventory as value
      accumulator[sizeObj.id] = sizeObj.inventory;
      return accumulator;
    }, {});

    return sizesMap;
  };

  const fetchProducts = async () => {
    // Start products loading
    setLoading(true);

    try {
      // Fetch products
      const productsList = await listProducts();

      const productPromises = productsList.map(async (product) => {
        // Destructure to remove id from product data
        const { id: productId, ...productDataWithoutId } = product;

        // List all variants for the product
        const variantsArray = await listVariants(productId);

        // Filter for variant.active = true
        const filteredVariantsArray = variantsArray.filter(
          (variant) => variant?.active === true
        );

        // If variants is empty, skip product
        if (filteredVariantsArray.length === 0) {
          return null;
        }

        // Convert the variants array into an object keyed by variant ID
        // Initialize an object to hold variants with sizes
        const variantsObject = {};

        // For each active variant, fetch sizes and attach them
        for (const variant of filteredVariantsArray) {
          const { id: variantId, ...variantDataWithoutId } = variant;

          const sizesMap = await fetchSizes(productId, variantId);

          variantDataWithoutId.sizes = sizesMap;

          variantsObject[variantId] = variantDataWithoutId;
        }

        // Attach the variants object to the product data
        return {
          productId: productId,
          data: {
            ...productDataWithoutId,
            variants: variantsObject,
          },
        };
      });

      // Resolve all promises in parallel
      const productsWithVariantsArray = (
        await Promise.all(productPromises)
      ).filter(Boolean);

      const productsData = productsWithVariantsArray.reduce(
        (acc, { productId, data }) => {
          acc[productId] = data;
          return acc;
        },
        {}
      );

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      // Finish products loading
      setLoading(false);
    }
  };

  const updateSizeInventory = async (productId, variantId, sizeId) => {
    try {
      const sizeData = await getSize(productId, variantId, sizeId);
      const sizeInventory = sizeData?.inventory || 0;
      setProducts((oldProducts) => ({
        ...oldProducts,
        [productId]: {
          ...oldProducts[productId],
          variants: {
            ...oldProducts[productId].variants,
            [variantId]: {
              ...oldProducts[productId].variants[variantId],
              sizes: {
                ...(oldProducts[productId].variants[variantId].sizes || {}),
                [sizeId]: sizeInventory,
              },
            },
          },
        },
      }));

      return sizeInventory;
    } catch (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  };

  const isSoldOut = (productId, variantId) => {
    try {
      const sizeMap = products[productId].variants[variantId].sizes;
      const totalInventory = Object.values(sizeMap).reduce(
        (acc, cur) => acc + cur,
        0
      );
      return totalInventory === 0;
    } catch (e) {
      console.error("Error checking sold out status:", e);
      throw e;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        updateSizeInventory,
        isSoldOut,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
