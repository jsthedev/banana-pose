import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductGallery from '@/components/product_details/product_gallery/index.jsx';
import ProductGalleryLoading from '@/components/product_details/product_gallery/product_gallery_loading';

import { ProductVariantIdsProvider } from '@/contexts/productVariantIdsContext.jsx';
import { ProductsContext } from '@/contexts/productsContext';

import '@/pages/product_details/index.scss';

function ProductDetails() {
  // Navigation
  const { productVariant } = useParams();
  const lastUnderscoreIndex = productVariant.lastIndexOf('_');
  const productId = productVariant.substring(0, lastUnderscoreIndex);
  const variantId = productVariant.substring(lastUnderscoreIndex + 1);

  // Contexts
  const { products, loading: productsLoading } = useContext(ProductsContext);

  // Variables
  const product = products?.[productId] || null;
  const variant = product?.variants?.[variantId] || null;

  return (
    <ProductVariantIdsProvider productId={productId} variantId={variantId}>
      <div className="product-details">
        <div className="product-gallery-wrapper">
          {productsLoading ? (
            <ProductGalleryLoading />
          ) : !product ? (
            <div className="error">
              <div className="message">Selected product is not valid.</div>
            </div>
          ) : !variant ? (
            <div className="error">
              <div className="message">
                Selected color is not available for this product.
              </div>
            </div>
          ) : (
            <ProductGallery />
          )}
        </div>
      </div>
    </ProductVariantIdsProvider>
  );
}

export default ProductDetails;
