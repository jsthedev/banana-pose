import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

import productsMapping from '@/data/products.json';

import { IS_DEV } from '@/constants/platform';

import { CurrencyContext } from '@/contexts/currencyContext';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(productsMapping); // Default to USD
  const [loading, setLoading] = useState(true);
  const { currency, loading: currencyLoading } = useContext(CurrencyContext);

  const fetchProducts = async () => {
    // Start products loading
    setLoading(true);

    try {
      // Fetch products
      const productsResponse = await axios.get(
        `${import.meta.env.VITE_FIREBASE_FUNCTIONS_LISTPRODUCTS}`
      );
      const fetchedProducts = productsResponse.data.products.data;

      // Fetch prices
      const pricesResponse = await axios.get(
        `${import.meta.env.VITE_FIREBASE_FUNCTIONS_LISTPRICES}`,
        {
          params: {
            currency: currency,
          },
        }
      );
      const fetchedPrices = pricesResponse.data.prices.data;

      // Create a collection of products
      const productsCollection = {};

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

        /* 
            After confirming the productId, variantId, and size are available,
            add the entry to the productsCollection
          */
        if (!(productBpId in productsCollection)) {
          productsCollection[productBpId] = {
            price: productPrice.unit_amount,
            description: productsMapping[productBpId].description,
            details: productsMapping[productBpId].details,
            care: productsMapping[productBpId].care,
            type: productsMapping[productBpId].type,
            variants: {},
          };
        }

        if (!(productVariantId in productsCollection[productBpId].variants)) {
          productsCollection[productBpId].variants[productVariantId] = {
            name: productsMapping[productBpId].variants[productVariantId].name,
            color:
              productsMapping[productBpId].variants[productVariantId].color,
            thumbnail:
              productsMapping[productBpId].variants[productVariantId].thumbnail,
            images:
              productsMapping[productBpId].variants[productVariantId].images,
          };
        }

        const soldOut = product?.metadata.sold_out;
        /* 
            Add the size of the product to the final collection
            and check for its sold out status
          */
        if (
          'sizes' in productsCollection[productBpId].variants[productVariantId]
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

      // TODO remove
      console.log(productsCollection);

      setProducts(productsCollection);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      // Finish products loading
      setLoading(false);
    }
  };

  useEffect(() => {
    // If currency is not available, skip
    if (!currency || currencyLoading) {
      return;
    }
    fetchProducts();
  }, [currency, currencyLoading]);

  return (
    <ProductsContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
