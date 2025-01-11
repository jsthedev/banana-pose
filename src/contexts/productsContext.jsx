import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

import productsMapping from '@/data/productsV2.json';

import { IS_DEV } from '@/constants/platform';

import { CurrencyContext } from '@/contexts/currencyContext';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(undefined); // Default to USD
  const [loading, setLoading] = useState(true);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchProducts = async () => {
      // If currency is not available, skip
      if (!currency || currencyLoading) {
        return;
      }

      // Start products loading
      setLoading(true);

      try {
        // Fetch products
        const productsResponse = await axios.get(
          `${import.meta.env.VITE_FIREBASE_FUNCTIONS_ENDPOINT}/list-products`
        );
        const fetchedProducts = productsResponse.data.products.data;

        // Fetch prices
        const pricesResponse = await axios.get(
          `${import.meta.env.VITE_FIREBASE_FUNCTIONS_ENDPOINT}/list-prices`,
          {
            params: {
              currency: currency,
            },
          }
        );
        const fetchedPrices = pricesResponse.data.prices.data;

        // Create a collection of products
        const productsCollection = { ...productsMapping };

        // Iterate over the fetched products and fill in missing information
        fetchedProducts.forEach((product) => {
          // If product is not active, skip it
          if (!product?.active) {
            return;
          }
          // If we are on prod, and the product is not for prod, skip it
          if (!IS_DEV && !product?.livemode) {
            return;
          }
          // If the product does not exist on our platform's mappings, skip it
          const productBpId = product?.metadata?.bp_product_id;
          if (!(productBpId in productsMapping)) {
            return;
          }
          // If the product variant does not exist on our platform's mappings, skip it
          const productVariantId = product?.metadata?.variant_id;
          if (!(productVariantId in productsMapping[productBpId].variants)) {
            return;
          }

          // Find the price of the product
          const productPrice = fetchedPrices.find(
            (price) => price.product === product.id
          );
          // If the price does not exist, something is wrong, skip it
          if (!productPrice) {
            return;
          }
          // Add the price of the product to the final collection
          productsCollection[productBpId].price = productPrice.unit_amount;

          // If the stripe price ID does not exist, something is wrong, skip it
          const productStripePriceId = productPrice.id;
          if (!productStripePriceId) {
            return;
          }
          // Find the size of the product
          const productSize = product?.metadata?.size;
          if (!productSize) {
            return;
          }
          const soldOut = product?.metadata.sold_out;
          /* 
            Add the size of the product to the final collection
            and check for its sold out status
          */
          if (
            'sizes' in
            productsCollection[productBpId].variants[productVariantId]
          ) {
            productsCollection[productBpId].variants[productVariantId].sizes[
              productSize
            ] = soldOut === 'true' ? 'sold_out' : productStripePriceId;
          } else {
            productsCollection[productBpId].variants[productVariantId].sizes = {
              [productSize]:
                soldOut === 'true' ? 'sold_out' : productStripePriceId,
            };
          }
        });

        // Filter productsCollection
        Object.keys(productsCollection).forEach((productId) => {
          const product = productsCollection[productId];
          if (product.variants) {
            // Filter variants without sizes
            Object.keys(product.variants).forEach((variantId) => {
              if (!('sizes' in product.variants[variantId])) {
                delete product.variants[variantId];
              }
            });
            // Filter products without variants
            if (Object.keys(product.variants).length === 0) {
              delete productsCollection[productId];
            }
          }
        });

        console.log(productsCollection);

        setProducts(productsCollection);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        // Finish products loading
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currency]);

  return (
    <ProductsContext.Provider value={{ products, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};
