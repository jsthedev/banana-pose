import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductGallery from '@/components/product_gallery/index.jsx';

import { ProductVariantIdsProvider } from '@/contexts/productVariantIdsContext.jsx';
import { ProductsContext } from '@/contexts/productsContext';

import '@/pages/product_details/index.scss';

function ProductDetails() {
  // Navigation
  const { productVariant } = useParams();
  const lastUnderscoreIndex = productVariant.lastIndexOf('_');
  const productId = productVariant.substring(0, lastUnderscoreIndex);
  const variantId = productVariant.substring(lastUnderscoreIndex + 1);

  // Find product

  const { products, loading: productsLoading } = useContext(ProductsContext);

  if (productsLoading) {
    return null;
  }

  const product = products[productId];

  if (!product) {
    return (
      <div className="error">
        <div className="message">Product not found.</div>
      </div>
    );
  }

  const variant = product.variants[variantId];

  if (!variant) {
    return (
      <div className="error">
        <div className="message">
          Selected color is not available for this product.
        </div>
      </div>
    );
  }

  return (
    <ProductVariantIdsProvider productId={productId} variantId={variantId}>
      <div className="product-details">
        <div className="product-gallery-wrapper">
          <ProductGallery />
        </div>
      </div>
    </ProductVariantIdsProvider>
  );
}

export default ProductDetails;
