import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductGallery from '@/components/product_gallery/index.jsx';

import { ProductVariantProvider } from '@/contexts/productVariantContext.jsx';
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
    return <div>Products are loading.</div>;
  }

  const product = products[productId];

  if (!product) {
    return <div>Product not found.</div>;
  }

  const variant = product.variants[variantId];

  if (!variant) {
    return <div>Selected color is not available for this product.</div>;
  }

  return (
    <ProductVariantProvider product={product} variant={variant}>
      <div className="product-details page">
        <div className="product-gallery-wrapper">
          <ProductGallery />
        </div>
      </div>
    </ProductVariantProvider>
  );
}

export default ProductDetails;
