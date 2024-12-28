import { createContext, useState, useEffect } from "react";
import axios from "axios";

import { IS_DEV } from "@/constants/platform";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(undefined); // Default to USD
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Fetch products
        const productsResponse = await axios.get(
          "http://127.0.0.1:5001/banana-pose/us-central1/api/list-products"
        );
        const products = productsResponse.data.products.data;

        console.log(productsWithPrices);
      } catch (error) {
        console.error("Error fetching price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};
