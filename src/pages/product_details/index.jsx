import ProductGallery from '@/components/product_gallery/index.jsx';

import '@/pages/product_details/index.scss';

import products from '@/data/products.json';

function ProductDetails() {
  // Navigation
  // const { productId } = useParams();
  const productId = 't-shirt-01';
  const product = products.find((prod) => prod.id === productId);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="product-details page">
      <div className="product-gallery-wrapper">
        <ProductGallery product={product} />
      </div>
    </div>
  );
}

export default ProductDetails;
