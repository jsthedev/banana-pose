import { useParams } from 'react-router-dom';

import ProductGallery from '@/components/product_gallery/index.jsx';

import { ProductVariantProvider } from '@/contexts/productVariantContext.jsx';

import '@/pages/product_details/index.scss';

import products from '@/data/products.json';

function ProductDetails() {
  // Navigation
  const { idColor } = useParams();

  const lastHyphenIndex = idColor.lastIndexOf('-');
  const id = idColor.substring(0, lastHyphenIndex);
  const color = idColor.substring(lastHyphenIndex + 1);

  const product = products.find((prod) => prod.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const variant = product.variants.find((vari) => vari.color === color);

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
