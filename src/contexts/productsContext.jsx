import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

import productsMapping from '@/data/productsV2.json';

import { IS_DEV } from '@/constants/platform';

import { CurrencyContext } from '@/contexts/currencyContext';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(undefined); // Default to USD
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        // Fetch products
        const productsResponse = await axios.get(
          'http://127.0.0.1:5001/banana-pose/us-central1/api/list-products'
        );
        const fetchedProducts = productsResponse.data.products.data;

        // Fetch prices
        const pricesResponse = await axios.get(
          'http://127.0.0.1:5001/banana-pose/us-central1/api/list-prices',
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
          // Add the size of the product to the final collection
          if (
            'sizes' in
            productsCollection[productBpId].variants[productVariantId]
          ) {
            // Should not happen
            productsCollection[productBpId].variants[productVariantId].sizes[
              productSize
            ] = productStripePriceId;
          } else {
            productsCollection[productBpId].variants[productVariantId].sizes = {
              [productSize]: productStripePriceId,
            };
          }
        });

        console.log(productsCollection);

        setProducts(productsCollection);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
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
